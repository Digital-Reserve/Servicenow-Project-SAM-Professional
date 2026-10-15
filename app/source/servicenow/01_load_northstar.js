/*
 * Northstar Manufacturing loader - synthetic data for the SAM Pro case study.
 *
 * Where:  All > System Definition > Scripts - Background
 * How:    paste this whole script, keep the scope "global", click "Run script".
 * Time:   about 1 to 2 minutes.
 * Safe:   run it again at any time. Existing Northstar records are updated,
 *         never duplicated. Nothing outside Northstar is changed.
 *
 * Creates 2 companies, 3 locations, 6 departments, 60 users, 45 computers,
 * 12 servers and 248 software installations. All of it is invented data.
 */
(function northstarLoader() {
  var DATA = /*__DATA__*/null;

  var startedAt = new Date().getTime();
  var counts = [];
  var countIndex = {};
  var warnings = [];
  var warned = {};

  function out(line) { gs.print(line); }
  function warn(message) {
    if (!warned[message]) { warned[message] = true; warnings.push(message); }
  }
  function tally(label, created) {
    if (countIndex[label] === undefined) {
      countIndex[label] = counts.length;
      counts.push({ label: label, created: 0, updated: 0 });
    }
    counts[countIndex[label]][created ? 'created' : 'updated']++;
  }
  function fieldType(gr, field) {
    try { return String(gr.getElement(field).getED().getInternalType()); } catch (e) { return ''; }
  }
  function apply(gr, table, values) {
    for (var field in values) {
      if (!values.hasOwnProperty(field)) continue;
      var value = values[field];
      if (value === null || value === undefined || value === '') continue;
      if (!gr.isValidField(field)) { warn('Field ' + table + '.' + field + ' does not exist here, value skipped'); continue; }
      if (/^\d{4}-\d{2}-\d{2}$/.test(String(value)) && fieldType(gr, field).indexOf('date_time') !== -1) {
        value = value + ' 12:00:00';
      }
      gr.setValue(field, String(value));
    }
  }
  function upsert(label, table, key, values) {
    var gr = new GlideRecord(table);
    for (var k in key) {
      if (key.hasOwnProperty(k)) gr.addQuery(k, key[k]);
    }
    gr.setLimit(1);
    gr.query();
    var exists = gr.next();
    if (!exists) {
      gr.initialize();
      apply(gr, table, key);
    }
    apply(gr, table, values);
    var id = '';
    if (exists) {
      gr.update();
      id = String(gr.getUniqueValue());
    } else {
      id = String(gr.insert() || '');
    }
    if (!id) {
      warn('Could not save a ' + label + ' record in ' + table);
      return '';
    }
    tally(label, !exists);
    return id;
  }
  function find(table, field, value) {
    if (!value) return '';
    var gr = new GlideRecord(table);
    gr.addQuery(field, value);
    gr.setLimit(1);
    gr.query();
    return gr.next() ? String(gr.getUniqueValue()) : '';
  }
  function tableOr(preferred, fallback) {
    return new GlideRecord(preferred).isValid() ? preferred : fallback;
  }

  try {
    if (!DATA) { out('No data found in this script. Copy it again from the guide.'); return; }
    if (!new GlideRecord('cmdb_sam_sw_install').isValid()) {
      out('STOP: the table cmdb_sam_sw_install does not exist. Finish Stage 1 (SAM Professional) first.');
      return;
    }

    // Companies (Northstar and the reseller)
    var companyId = {};
    DATA.companies.forEach(function (c) {
      companyId[c.name] = upsert('Companies', 'core_company', { name: c.name }, {
        street: c.street, city: c.city, country: c.country, website: c.website, notes: c.notes,
        vendor: c.vendor ? 'true' : ''
      });
    });
    var northstar = companyId[DATA.company];

    // Hardware manufacturers: reuse existing records, create only if missing
    var makerId = {};
    DATA.manufacturers.forEach(function (name) {
      makerId[name] = find('core_company', 'name', name) ||
        upsert('Manufacturers', 'core_company', { name: name }, { manufacturer: 'true' });
    });

    // Locations and departments
    var locationId = {};
    DATA.locations.forEach(function (l) {
      locationId[l.name] = upsert('Locations', 'cmn_location', { name: l.name }, {
        city: l.city, country: l.country, company: companyId[l.company]
      });
    });
    var departmentId = {};
    DATA.departments.forEach(function (d) {
      departmentId[d.name] = upsert('Departments', 'cmn_department', { name: d.name, company: northstar }, {});
    });

    // Users
    var userId = {};
    DATA.users.forEach(function (u) {
      userId[u.user_name] = upsert('Users', 'sys_user', { user_name: u.user_name }, {
        first_name: u.first_name, last_name: u.last_name, email: u.email, title: u.title,
        department: departmentId[u.department], location: locationId[u.location],
        company: companyId[u.company], active: u.active, employee_number: u.employee_number
      });
    });

    // Computers (laptops) and servers
    var ciId = {};
    DATA.workstations.forEach(function (w) {
      ciId[w.name] = upsert('Computers', 'cmdb_ci_computer', { name: w.name }, {
        os: w.os, os_version: w.os_version, manufacturer: makerId[w.manufacturer],
        serial_number: w.serial_number, cpu_count: w.cpu_count, cpu_core_count: w.cpu_core_count,
        assigned_to: userId[w.assigned_to], location: locationId[w.location], company: companyId[w.company]
      });
    });
    DATA.servers.forEach(function (s) {
      var table = s.server_class === 'Windows Server'
        ? tableOr('cmdb_ci_win_server', 'cmdb_ci_server')
        : tableOr('cmdb_ci_linux_server', 'cmdb_ci_server');
      ciId[s.name] = upsert('Servers', table, { name: s.name }, {
        os: s.os, os_version: s.os_version, manufacturer: makerId[s.manufacturer],
        serial_number: s.serial_number, cpu_count: s.cpu_count, cpu_core_count: s.cpu_core_count,
        virtual: s.virtual, location: locationId[s.location], company: companyId[s.company],
        short_description: s.short_description
      });
    });

    // Software installations (the "discovered" software)
    // DATA.products: [display name, publisher, version]; DATA.installs: [computer, product number, install date]
    DATA.installs.forEach(function (row) {
      var ci = ciId[row[0]];
      var product = DATA.products[row[1]];
      if (!ci) { warn('Computer ' + row[0] + ' not found, installation skipped'); return; }
      upsert('Software installations', 'cmdb_sam_sw_install',
        { installed_on: ci, display_name: product[0], version: product[2] },
        { publisher: product[1], install_date: row[2] });
    });

    // Check that every installation got a discovery model
    var total = new GlideRecord('cmdb_sam_sw_install');
    total.addQuery('installed_on.name', 'STARTSWITH', 'NSM-');
    total.query();
    var installCount = total.getRowCount();
    var missing = new GlideRecord('cmdb_sam_sw_install');
    missing.addQuery('installed_on.name', 'STARTSWITH', 'NSM-');
    missing.addNullQuery('discovery_model');
    missing.query();
    var missingCount = missing.getRowCount();
    var models = new GlideAggregate('cmdb_sam_sw_install');
    models.addQuery('installed_on.name', 'STARTSWITH', 'NSM-');
    models.addNotNullQuery('discovery_model');
    models.addAggregate('COUNT');
    models.groupBy('discovery_model');
    models.query();
    var modelCount = 0;
    while (models.next()) modelCount++;

    var seconds = Math.round((new Date().getTime() - startedAt) / 1000);
    out('==================== NORTHSTAR LOADER FINISHED (' + seconds + ' s) ====================');
    counts.forEach(function (c) {
      out(c.label + ': ' + c.created + ' created, ' + c.updated + ' updated');
    });
    out('Installations for Northstar computers: ' + installCount + ' (expected 248)');
    out('Installations with a discovery model: ' + (installCount - missingCount) + ' of ' + installCount);
    out('Distinct Northstar discovery models: ' + modelCount + ' (expected 8)');
    if (warnings.length) {
      out('Notes (' + warnings.length + '):');
      warnings.forEach(function (w) { out(' - ' + w); });
    } else {
      out('Notes: none');
    }
    out('RESULT: ' + (installCount === 248 && missingCount === 0 ? 'OK - go back to the guide.' : 'CHECK - copy these lines into the guide and read "If not" under this step.'));
  } catch (e) {
    out('ERROR: ' + e + '. Copy this line into the guide and read "If not" under this step.');
  }
})();
