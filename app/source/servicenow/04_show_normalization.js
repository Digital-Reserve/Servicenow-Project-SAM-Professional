/*
 * Northstar normalization status - reads only, changes nothing.
 *
 * Where:  All > System Definition > Scripts - Background
 * When:   Stage 3, before and after cleaning the software names.
 * How:    paste this whole script, keep the scope "global", click "Run script".
 * Safe:   run it as often as you like. It only reads.
 *
 * Lists the 8 discovery models used by Northstar computers, with their
 * normalization status and their clean publisher, product, version, edition
 * and product type, so nobody has to open 8 records one by one.
 */
(function northstarNormalizationStatus() {
  function out(line) { gs.print(line); }
  function firstField(gr, names) {
    for (var i = 0; i < names.length; i++) {
      if (gr.isValidField(names[i])) return names[i];
    }
    return '';
  }
  function show(gr, names) {
    var field = firstField(gr, names);
    if (!field) return '-';
    var value = String(gr.getDisplayValue(field) || '');
    return value || '(empty)';
  }

  try {
    var groups = new GlideAggregate('cmdb_sam_sw_install');
    groups.addQuery('installed_on.name', 'STARTSWITH', 'NSM-');
    groups.addNotNullQuery('discovery_model');
    groups.addAggregate('COUNT');
    groups.groupBy('discovery_model');
    groups.query();
    var rows = [];
    while (groups.next()) {
      var dm = new GlideRecord('cmdb_sam_sw_discovery_model');
      if (!dm.get(String(groups.getValue('discovery_model')))) continue;
      var status = show(dm, ['status', 'normalization_status', 'norm_status']);
      rows.push({
        name: String(dm.getDisplayValue() || ''),
        installs: parseInt(groups.getAggregate('COUNT'), 10) || 0,
        status: status,
        clean: /^(normalized|manually normalized)$/i.test(status),
        publisher: show(dm, ['norm_publisher']),
        product: show(dm, ['norm_product']),
        version: show(dm, ['norm_version']),
        edition: show(dm, ['norm_edition']),
        type: show(dm, ['norm_type', 'product_type'])
      });
    }
    if (!rows.length) { out('No Northstar installations found. Run the Northstar loader (Stage 2) first.'); return; }
    rows.sort(function (a, b) { return a.name < b.name ? -1 : a.name > b.name ? 1 : 0; });

    var cleanCount = 0;
    out('==================== NORTHSTAR NORMALIZATION STATUS ====================');
    rows.forEach(function (r, i) {
      if (r.clean) cleanCount++;
      out((i + 1) + '. ' + r.name + ' (' + r.installs + ' installations)');
      out('   Status: ' + r.status);
      out('   Clean values: Publisher ' + r.publisher + ' | Product ' + r.product + ' | Version ' + r.version + ' | Edition ' + r.edition + ' | Product type ' + r.type);
    });
    out('Clean (Normalized or Manually normalized): ' + cleanCount + ' of ' + rows.length + '. Goal: 8 of 8.');
  } catch (e) {
    out('ERROR: ' + e + '. Copy this line into the guide and read "If not" under this step.');
  }
})();
