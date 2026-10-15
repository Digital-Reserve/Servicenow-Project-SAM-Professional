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
  var DATA = [{"ci":"NSM-WS-001","user":"anna.bakker","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-22","minutes_used":"522"},{"ci":"NSM-WS-002","user":"bram.bos","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-17","minutes_used":"366"},{"ci":"NSM-WS-003","user":"carla.dewit","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-24","minutes_used":"2095"},{"ci":"NSM-WS-004","user":"daan.jacobs","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-15","minutes_used":"2150"},{"ci":"NSM-WS-005","user":"eva.prins","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-16","minutes_used":"3305"},{"ci":"NSM-WS-006","user":"finn.deboer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-13","minutes_used":"1212"},{"ci":"NSM-WS-007","user":"greta.dekker","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-29","minutes_used":"1084"},{"ci":"NSM-WS-008","user":"hugo.vanderlinden","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-25","minutes_used":"510"},{"ci":"NSM-WS-009","user":"iris.willems","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-21","minutes_used":"3409"},{"ci":"NSM-WS-010","user":"jonas.smit","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-17","minutes_used":"770"},{"ci":"NSM-WS-011","user":"kira.hendriks","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-21","minutes_used":"2623"},{"ci":"NSM-WS-012","user":"lars.degraaf","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-29","minutes_used":"906"},{"ci":"NSM-WS-013","user":"mila.vandenberg","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-11","minutes_used":"2210"},{"ci":"NSM-WS-014","user":"noah.jansen","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-15","minutes_used":"1824"},{"ci":"NSM-WS-015","user":"olga.vos","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-23","minutes_used":"2499"},{"ci":"NSM-WS-016","user":"pieter.dijkstra","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-14","minutes_used":"897"},{"ci":"NSM-WS-017","user":"quinn.dehaan","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-20","minutes_used":"2121"},{"ci":"NSM-WS-018","user":"rosa.blom","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-17","minutes_used":"3434"},{"ci":"NSM-WS-019","user":"sven.mulder","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-24","minutes_used":"2527"},{"ci":"NSM-WS-020","user":"tess.brouwer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-15","minutes_used":"3409"},{"ci":"NSM-WS-021","user":"umar.kok","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-17","minutes_used":"840"},{"ci":"NSM-WS-022","user":"vera.koster","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-24","minutes_used":"3693"},{"ci":"NSM-WS-023","user":"wout.meijer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-16","minutes_used":"3576"},{"ci":"NSM-WS-024","user":"xena.vandijk","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-22","minutes_used":"1198"},{"ci":"NSM-WS-025","user":"yara.vandermeer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-25","minutes_used":"2412"},{"ci":"NSM-WS-026","user":"zoe.vanleeuwen","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-20","minutes_used":"2746"},{"ci":"NSM-WS-027","user":"aiden.visser","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-14","minutes_used":"3624"},{"ci":"NSM-WS-028","user":"bente.peters","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-25","minutes_used":"2508"},{"ci":"NSM-WS-029","user":"cas.smits","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-23","minutes_used":"962"},{"ci":"NSM-WS-030","user":"dilan.vermeulen","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-17","minutes_used":"2243"},{"ci":"NSM-WS-031","user":"anna.jansen","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-26","minutes_used":"3014"},{"ci":"NSM-WS-032","user":"bram.vos","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-12","minutes_used":"874"},{"ci":"NSM-WS-033","user":"carla.dijkstra","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-21","minutes_used":"3630"},{"ci":"NSM-WS-034","user":"daan.dehaan","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-23","minutes_used":"3533"},{"ci":"NSM-WS-035","user":"eva.blom","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-11","minutes_used":"2757"},{"ci":"NSM-WS-036","user":"finn.mulder","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-24","minutes_used":"367"},{"ci":"NSM-WS-037","user":"greta.brouwer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-19","minutes_used":"483"},{"ci":"NSM-WS-038","user":"hugo.kok","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-25","minutes_used":"3178"},{"ci":"NSM-WS-039","user":"iris.koster","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-14","minutes_used":"912"},{"ci":"NSM-WS-040","user":"jonas.meijer","display_name":"Adobe Acrobat (64-bit)","publisher":"Adobe","product":"Acrobat","last_used":"2026-09-27","minutes_used":"3696"},{"ci":"NSM-WS-001","user":"anna.bakker","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-04","minutes_used":"1997"},{"ci":"NSM-WS-002","user":"bram.bos","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-15","minutes_used":"2182"},{"ci":"NSM-WS-003","user":"carla.dewit","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-21","minutes_used":"1982"},{"ci":"NSM-WS-004","user":"daan.jacobs","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-22","minutes_used":"2329"},{"ci":"NSM-WS-005","user":"eva.prins","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-19","minutes_used":"925"},{"ci":"NSM-WS-006","user":"finn.deboer","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-11","minutes_used":"1095"},{"ci":"NSM-WS-007","user":"greta.dekker","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-10-01","minutes_used":"1434"},{"ci":"NSM-WS-008","user":"hugo.vanderlinden","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-06","minutes_used":"1946"},{"ci":"NSM-WS-009","user":"iris.willems","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-28","minutes_used":"1801"},{"ci":"NSM-WS-010","user":"jonas.smit","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-16","minutes_used":"682"},{"ci":"NSM-WS-011","user":"kira.hendriks","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-06","minutes_used":"1459"},{"ci":"NSM-WS-012","user":"lars.degraaf","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-13","minutes_used":"627"},{"ci":"NSM-WS-013","user":"mila.vandenberg","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-20","minutes_used":"1188"},{"ci":"NSM-WS-014","user":"noah.jansen","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-26","minutes_used":"200"},{"ci":"NSM-WS-015","user":"olga.vos","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-12","minutes_used":"724"},{"ci":"NSM-WS-016","user":"pieter.dijkstra","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-13","minutes_used":"752"},{"ci":"NSM-WS-017","user":"quinn.dehaan","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-23","minutes_used":"1903"},{"ci":"NSM-WS-018","user":"rosa.blom","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-26","minutes_used":"454"},{"ci":"NSM-WS-019","user":"sven.mulder","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-08","minutes_used":"2054"},{"ci":"NSM-WS-020","user":"tess.brouwer","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-28","minutes_used":"645"},{"ci":"NSM-WS-021","user":"umar.kok","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-10","minutes_used":"1501"},{"ci":"NSM-WS-022","user":"vera.koster","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-23","minutes_used":"1837"},{"ci":"NSM-WS-023","user":"wout.meijer","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-02","minutes_used":"2179"},{"ci":"NSM-WS-024","user":"xena.vandijk","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-27","minutes_used":"1241"},{"ci":"NSM-WS-025","user":"yara.vandermeer","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-03","minutes_used":"175"},{"ci":"NSM-WS-026","user":"zoe.vanleeuwen","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-27","minutes_used":"708"},{"ci":"NSM-WS-027","user":"aiden.visser","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-01","minutes_used":"1320"},{"ci":"NSM-WS-028","user":"bente.peters","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-26","minutes_used":"132"},{"ci":"NSM-WS-029","user":"cas.smits","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-12","minutes_used":"842"},{"ci":"NSM-WS-030","user":"dilan.vermeulen","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-13","minutes_used":"717"},{"ci":"NSM-WS-031","user":"anna.jansen","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-12","minutes_used":"177"},{"ci":"NSM-WS-032","user":"bram.vos","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-30","minutes_used":"1904"},{"ci":"NSM-WS-033","user":"carla.dijkstra","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-12","minutes_used":"1116"},{"ci":"NSM-WS-034","user":"daan.dehaan","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-13","minutes_used":"1388"},{"ci":"NSM-WS-035","user":"eva.blom","display_name":"Microsoft Visio Professional 2021","publisher":"Microsoft","product":"Visio","last_used":"2026-09-15","minutes_used":"1007"},{"ci":"NSM-WS-010","user":"jonas.smit","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-30","minutes_used":"1716"},{"ci":"NSM-WS-011","user":"kira.hendriks","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-16","minutes_used":"400"},{"ci":"NSM-WS-012","user":"lars.degraaf","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-14","minutes_used":"297"},{"ci":"NSM-WS-013","user":"mila.vandenberg","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-26","minutes_used":"1888"},{"ci":"NSM-WS-014","user":"noah.jansen","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-19","minutes_used":"2859"},{"ci":"NSM-WS-015","user":"olga.vos","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-22","minutes_used":"1633"},{"ci":"NSM-WS-016","user":"pieter.dijkstra","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-17","minutes_used":"1428"},{"ci":"NSM-WS-017","user":"quinn.dehaan","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-28","minutes_used":"2493"},{"ci":"NSM-WS-018","user":"rosa.blom","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-08","minutes_used":"1844"},{"ci":"NSM-WS-019","user":"sven.mulder","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-21","minutes_used":"1771"},{"ci":"NSM-WS-020","user":"tess.brouwer","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-09","minutes_used":"527"},{"ci":"NSM-WS-021","user":"umar.kok","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-10","minutes_used":"1424"},{"ci":"NSM-WS-022","user":"vera.koster","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-16","minutes_used":"613"},{"ci":"NSM-WS-023","user":"wout.meijer","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-12","minutes_used":"1070"},{"ci":"NSM-WS-024","user":"xena.vandijk","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-13","minutes_used":"2591"},{"ci":"NSM-WS-025","user":"yara.vandermeer","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-09-27","minutes_used":"2485"},{"ci":"NSM-WS-026","user":"zoe.vanleeuwen","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-01-30","minutes_used":"10"},{"ci":"NSM-WS-027","user":"aiden.visser","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-05-23","minutes_used":"14"},{"ci":"NSM-WS-028","user":"bente.peters","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-06-10","minutes_used":"9"},{"ci":"NSM-WS-029","user":"cas.smits","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-04-09","minutes_used":"5"},{"ci":"NSM-WS-030","user":"dilan.vermeulen","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-04-01","minutes_used":"12"},{"ci":"NSM-WS-031","user":"anna.jansen","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-04-04","minutes_used":"9"},{"ci":"NSM-WS-032","user":"bram.vos","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-02-20","minutes_used":"4"},{"ci":"NSM-WS-033","user":"carla.dijkstra","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-05-27","minutes_used":"1"},{"ci":"NSM-WS-034","user":"daan.dehaan","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-03-28","minutes_used":"7"},{"ci":"NSM-WS-035","user":"eva.blom","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-05-18","minutes_used":"6"},{"ci":"NSM-WS-036","user":"finn.mulder","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-03-27","minutes_used":"6"},{"ci":"NSM-WS-037","user":"greta.brouwer","display_name":"Microsoft Project Professional 2021","publisher":"Microsoft","product":"Project","last_used":"2026-02-09","minutes_used":"11"}];
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
