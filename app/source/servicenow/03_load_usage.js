/*
 * Northstar software usage - synthetic data for the SAM Pro case study.
 *
 * Where:  All > System Definition > Scripts - Background
 * When:   Stage 5, before creating the reclamation rule.
 * How:    paste this whole script, keep the scope "global", click "Run script".
 * Safe:   run it again at any time. Existing usage rows are updated, never duplicated.
 *
 * A real company gets this data from an agent or SCCM. Here it is invented:
 * 103 usage rows for Acrobat, Visio and Project on the Northstar laptops.
 * 12 Project installations were last used more than 90 days ago.
 */
(function northstarUsage() {
  var DATA = /*__DATA__*/null;
  var TABLE = 'samp_sw_usage';
  var warnings = [];
  var warned = {};

  function out(line) { gs.print(line); }
  function warn(message) {
    if (!warned[message]) { warned[message] = true; warnings.push(message); }
  }
  function describe(table) {
    var fields = [];
    var gr = new GlideRecord(table);
    gr.initialize();
    var list = gr.getFields();
    for (var i = 0; i < list.size(); i++) {
      var el = list.get(i);
      var ref = '', type = '';
      try { ref = String(el.getReferenceTable() || ''); } catch (e) { ref = ''; }
      try { type = String(el.getED().getInternalType()); } catch (e2) { type = ''; }
      fields.push({ name: String(el.getName()), ref: ref, type: type });
    }
    return fields;
  }
  function pick(fields, names, refTest) {
    var i, j;
    for (i = 0; i < names.length; i++) {
      for (j = 0; j < fields.length; j++) {
        if (fields[j].name === names[i] && (!refTest || refTest(fields[j].ref))) return fields[j];
      }
    }
    if (refTest) {
      for (j = 0; j < fields.length; j++) {
        if (fields[j].ref && refTest(fields[j].ref)) return fields[j];
      }
    }
    return null;
  }
  function find(table, field, value) {
    var gr = new GlideRecord(table);
    gr.addQuery(field, value);
    gr.setLimit(1);
    gr.query();
    return gr.next() ? gr : null;
  }
  function refValueFrom(record, refTable) {
    // Returns the value of the first field on record that references refTable.
    if (!record) return '';
    var fields = describe(record.getTableName());
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].ref === refTable && record.getValue(fields[i].name)) return String(record.getValue(fields[i].name));
    }
    return '';
  }
  function choiceFor(field, pattern) {
    var ch = new GlideRecord('sys_choice');
    ch.addQuery('name', TABLE);
    ch.addQuery('element', field);
    ch.addQuery('inactive', false);
    ch.query();
    var labels = [];
    var match = '';
    while (ch.next()) {
      var label = String(ch.getValue('label'));
      var value = String(ch.getValue('value'));
      labels.push(label + ' (' + value + ')');
      if (!match && (pattern.test(label) || pattern.test(value))) match = value;
    }
    return { value: match, all: labels.join(', ') };
  }
  function dateFor(field, ymd) {
    return field.type.indexOf('date_time') !== -1 ? ymd + ' 12:00:00' : ymd;
  }

  try {
    if (!DATA) { out('No data found in this script. Copy it again from the guide.'); return; }
    if (!new GlideRecord(TABLE).isValid()) { out('STOP: table ' + TABLE + ' not found. Is SAM Professional active (Stage 1)?'); return; }
    var fields = describe(TABLE);
    var f = {
      install: pick(fields, ['install', 'software_install', 'sw_install'], function (r) { return r === 'cmdb_sam_sw_install'; }),
      ci: pick(fields, ['ci', 'cmdb_ci', 'configuration_item', 'installed_on'], function (r) { return r.indexOf('cmdb_ci') === 0; }),
      user: pick(fields, ['user', 'assigned_to', 'used_by'], function (r) { return r === 'sys_user'; }),
      publisher: pick(fields, ['publisher', 'norm_publisher'], null),
      product: pick(fields, ['product', 'norm_product'], null),
      model: pick(fields, ['software_model'], function (r) { return r === 'cmdb_software_product_model'; }),
      lastUsed: pick(fields, ['last_used', 'last_used_date', 'last_used_time', 'last_access_time'], null),
      minutes: pick(fields, ['minutes_used', 'usage_minutes', 'total_usage_time', 'usage_time'], null),
      reclamationType: pick(fields, ['reclamation_type'], null)
    };
    var mapping = [];
    for (var key in f) {
      if (f.hasOwnProperty(key)) mapping.push(key + ' -> ' + (f[key] ? f[key].name + (f[key].ref ? ' (' + f[key].ref + ')' : '') : 'not found'));
    }
    if (!f.lastUsed) warn('No "last used" field found. The rule option "Include no activity" (Stage 5) still finds unused software.');
    var reclType = { value: '', all: '' };
    if (f.reclamationType) {
      reclType = choiceFor(f.reclamationType.name, /install/i);
      if (!reclType.value) warn('Reclamation type choices: ' + reclType.all + '. None mentions installs, left empty.');
    }

    var created = 0, updated = 0, skipped = 0;
    DATA.forEach(function (r) {
      var ci = find('cmdb_ci', 'name', r.ci);
      if (!ci) { skipped++; warn(r.ci + ' not found. Run the Northstar loader (Stage 2) first.'); return; }
      var install = null;
      var inst = new GlideRecord('cmdb_sam_sw_install');
      inst.addQuery('installed_on', ci.getUniqueValue());
      inst.addQuery('display_name', r.display_name);
      inst.setLimit(1);
      inst.query();
      if (inst.next()) install = inst;
      if (!install) { skipped++; warn('No ' + r.display_name + ' installation on ' + r.ci + '. Run the Northstar loader first.'); return; }
      var dm = null;
      if (install.isValidField('discovery_model') && install.getValue('discovery_model')) {
        dm = find('cmdb_sam_sw_discovery_model', 'sys_id', install.getValue('discovery_model'));
      }

      var gr = new GlideRecord(TABLE);
      if (f.install) { gr.addQuery(f.install.name, install.getUniqueValue()); }
      else if (f.ci) { gr.addQuery(f.ci.name, ci.getUniqueValue()); if (f.product && !f.product.ref) gr.addQuery(f.product.name, r.product); }
      gr.setLimit(1);
      gr.query();
      var exists = gr.next();
      if (!exists) gr.initialize();

      if (f.install) gr.setValue(f.install.name, install.getUniqueValue());
      if (f.ci) gr.setValue(f.ci.name, ci.getUniqueValue());
      if (f.user) {
        var u = find('sys_user', 'user_name', r.user);
        if (u) gr.setValue(f.user.name, u.getUniqueValue());
      }
      [['publisher', r.publisher], ['product', r.product]].forEach(function (pair) {
        var field = f[pair[0]];
        if (!field) return;
        if (!field.ref) { gr.setValue(field.name, pair[1]); return; }
        var value = refValueFrom(dm, field.ref) || refValueFrom(install, field.ref);
        if (!value) {
          var byName = find(field.ref, 'name', pair[1]);
          value = byName ? String(byName.getUniqueValue()) : '';
        }
        if (value) gr.setValue(field.name, value); else warn('Could not resolve ' + pair[0] + ' "' + pair[1] + '" for usage rows.');
      });
      if (f.model) {
        var model = refValueFrom(install, 'cmdb_software_product_model') || refValueFrom(dm, 'cmdb_software_product_model');
        if (model) gr.setValue(f.model.name, model);
      }
      if (f.lastUsed) gr.setValue(f.lastUsed.name, dateFor(f.lastUsed, r.last_used));
      if (f.minutes) gr.setValue(f.minutes.name, String(r.minutes_used));
      if (f.reclamationType && reclType.value) gr.setValue(f.reclamationType.name, reclType.value);

      if (exists) { gr.update(); updated++; }
      else if (gr.insert()) { created++; }
      else { skipped++; warn('Could not save usage for ' + r.ci + ' ' + r.product); }
    });

    out('==================== NORTHSTAR USAGE FINISHED ====================');
    out('Usage rows: ' + created + ' created, ' + updated + ' updated, ' + skipped + ' skipped (expected 103 in total)');
    out('Fields used on ' + TABLE + ':');
    mapping.forEach(function (m) { out(' - ' + m); });
    if (warnings.length) {
      out('Notes (' + warnings.length + '):');
      warnings.forEach(function (w) { out(' - ' + w); });
    } else {
      out('Notes: none');
    }
  } catch (e) {
    out('ERROR: ' + e + '. Copy this line into the guide and read "If not" under this step.');
  }
})();
