/*
 * Northstar license allocations - synthetic data for the SAM Pro case study.
 *
 * Where:  All > System Definition > Scripts - Background
 * When:   Stage 4, after the Acrobat and Project entitlements exist and are published.
 * How:    paste this whole script, keep the scope "global", click "Run script".
 * Safe:   run it again at any time. Existing allocations are kept, never duplicated.
 *
 * Gives one Acrobat license to each of the 40 Acrobat users and one Project license
 * to each of the 28 computers that have Project installed.
 */
(function northstarAllocations() {
  var DATA = /*__DATA__*/null;
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
      var ref = '';
      try { ref = String(el.getReferenceTable() || ''); } catch (e) { ref = ''; }
      fields.push({ name: String(el.getName()), ref: ref });
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
    return gr.next() ? String(gr.getUniqueValue()) : '';
  }
  function findEntitlement(po, keyword) {
    var gr = new GlideRecord('alm_license');
    if (gr.isValidField('po_number')) {
      gr.addQuery('po_number', po);
      gr.orderByDesc('sys_created_on');
      gr.setLimit(1);
      gr.query();
      if (gr.next()) return { id: String(gr.getUniqueValue()), name: String(gr.getDisplayValue()), how: 'PO number ' + po };
    }
    var byName = new GlideRecord('alm_license');
    if (byName.isValidField('software_model')) {
      byName.addQuery('software_model.display_name', 'CONTAINS', keyword);
    } else {
      byName.addQuery('display_name', 'CONTAINS', keyword);
    }
    byName.orderByDesc('sys_created_on');
    byName.setLimit(1);
    byName.query();
    if (byName.next()) {
      warn('No entitlement with PO number ' + po + '. Used the newest entitlement whose product contains "' + keyword + '": ' + byName.getDisplayValue() + '. If that is wrong, add the PO number to the right entitlement and run again.');
      return { id: String(byName.getUniqueValue()), name: String(byName.getDisplayValue()), how: 'newest ' + keyword + ' entitlement' };
    }
    return null;
  }
  function isEntitlementRef(ref) { return ref === 'alm_license' || ref === 'alm_entitlement'; }
  function isUserRef(ref) { return ref === 'sys_user'; }
  function isDeviceRef(ref) { return ref.indexOf('cmdb_ci') === 0 || ref === 'alm_asset' || ref === 'alm_hardware'; }

  try {
    if (!DATA) { out('No data found in this script. Copy it again from the guide.'); return; }
    var plan = [
      { type: 'user', table: 'alm_entitlement_user', targetNames: ['assigned_to', 'allocated_to', 'user'], targetTest: isUserRef, keyword: 'Acrobat' },
      { type: 'device', table: 'alm_entitlement_asset', targetNames: ['allocated_to', 'cmdb_ci', 'ci', 'asset'], targetTest: isDeviceRef, keyword: 'Project' }
    ];
    var results = [];
    plan.forEach(function (p) {
      var rows = DATA.filter(function (r) { return r.allocated_to_type === p.type; });
      if (!rows.length) return;
      if (!new GlideRecord(p.table).isValid()) { warn('Table ' + p.table + ' not found. Allocate ' + p.keyword + ' by hand.'); return; }
      var fields = describe(p.table);
      var entField = pick(fields, ['licensed_by', 'entitlement', 'license'], isEntitlementRef);
      var targetField = pick(fields, p.targetNames, p.targetTest);
      var qtyField = pick(fields, ['quantity'], null);
      if (!entField || !targetField) { warn('Could not find the entitlement or target field on ' + p.table + '. Allocate ' + p.keyword + ' by hand.'); return; }
      var ent = findEntitlement(rows[0].entitlement_po, p.keyword);
      if (!ent) { warn('No ' + p.keyword + ' entitlement found. Create and publish it first (Stage 4), then run again.'); return; }
      var created = 0, kept = 0, missing = 0;
      rows.forEach(function (r) {
        var target = '';
        if (p.type === 'user') {
          target = find('sys_user', 'user_name', r.allocated_to);
        } else if (targetField.ref.indexOf('alm_') === 0) {
          var ci = find('cmdb_ci', 'name', r.allocated_to);
          target = ci ? find(targetField.ref, 'ci', ci) : '';
        } else {
          target = find('cmdb_ci', 'name', r.allocated_to);
        }
        if (!target) { missing++; warn(r.allocated_to + ' not found. Run the Northstar loader (Stage 2) first.'); return; }
        var gr = new GlideRecord(p.table);
        gr.addQuery(entField.name, ent.id);
        gr.addQuery(targetField.name, target);
        gr.setLimit(1);
        gr.query();
        if (gr.next()) { kept++; return; }
        gr.initialize();
        gr.setValue(entField.name, ent.id);
        gr.setValue(targetField.name, target);
        if (qtyField) gr.setValue(qtyField.name, String(r.quantity || '1'));
        if (gr.insert()) { created++; } else { warn('Could not save an allocation for ' + r.allocated_to + ' (check that the entitlement has enough rights).'); }
      });
      results.push(p.keyword + ' (' + p.type + ' allocations, entitlement found by ' + ent.how + '): ' + created + ' created, ' + kept + ' already there, ' + missing + ' not found. Fields used: ' + p.table + '.' + entField.name + ' and ' + p.table + '.' + targetField.name);
    });

    out('==================== NORTHSTAR ALLOCATIONS FINISHED ====================');
    results.forEach(function (r) { out(r); });
    if (warnings.length) {
      out('Notes (' + warnings.length + '):');
      warnings.forEach(function (w) { out(' - ' + w); });
    } else {
      out('Notes: none');
    }
    out('Expected: Acrobat 40 user allocations, Project 28 device allocations.');
  } catch (e) {
    out('ERROR: ' + e + '. Copy this line into the guide and read "If not" under this step.');
  }
})();
