/*
 * Northstar license allocations - synthetic data for the SAM Pro case study.
 *
 * Where:  All > System Definition > Scripts - Background
 * When:   Stage 4, after the Acrobat (NSM-ENT-A) and Project (NSM-ENT-D)
 *         entitlements exist and are published (State "In use").
 * How:    paste this whole script, keep the scope "global", click "Run script".
 * Safe:   run it again at any time. Existing allocations are kept, never duplicated.
 *
 * Gives one Acrobat license to each of the 40 Acrobat users and one Project license
 * to each of the 28 computers that have Project installed.
 */
(function northstarAllocations() {
  var DATA = {"entitlements":[{"tag":"NSM-ENT-A","invoice":"NSM-INV-2026-0101","keyword":"Acrobat","type":"user"},{"tag":"NSM-ENT-D","invoice":"NSM-INV-2025-0413","keyword":"Project","type":"device"}],"allocations":[{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"anna.bakker","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"bram.bos","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"carla.dewit","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"daan.jacobs","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"eva.prins","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"finn.deboer","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"greta.dekker","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"hugo.vanderlinden","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"iris.willems","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"jonas.smit","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"kira.hendriks","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"lars.degraaf","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"mila.vandenberg","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"noah.jansen","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"olga.vos","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"pieter.dijkstra","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"quinn.dehaan","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"rosa.blom","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"sven.mulder","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"tess.brouwer","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"umar.kok","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"vera.koster","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"wout.meijer","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"xena.vandijk","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"yara.vandermeer","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"zoe.vanleeuwen","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"aiden.visser","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"bente.peters","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"cas.smits","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"dilan.vermeulen","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"anna.jansen","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"bram.vos","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"carla.dijkstra","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"daan.dehaan","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"eva.blom","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"finn.mulder","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"greta.brouwer","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"hugo.kok","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"iris.koster","quantity":"1"},{"entitlement_tag":"NSM-ENT-A","allocated_to_type":"user","allocated_to":"jonas.meijer","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-010","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-011","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-012","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-013","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-014","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-015","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-016","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-017","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-018","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-019","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-020","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-021","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-022","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-023","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-024","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-025","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-026","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-027","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-028","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-029","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-030","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-031","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-032","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-033","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-034","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-035","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-036","quantity":"1"},{"entitlement_tag":"NSM-ENT-D","allocated_to_type":"device","allocated_to":"NSM-WS-037","quantity":"1"}]};
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
  function newest(field, operator, value) {
    var gr = new GlideRecord('alm_license');
    if (field.indexOf('.') === -1 && !gr.isValidField(field)) return null;
    gr.addQuery(field, operator, value);
    gr.orderByDesc('sys_created_on');
    gr.setLimit(1);
    gr.query();
    return gr.next() ? gr : null;
  }
  // Finds the entitlement by asset tag, then by invoice number, then by product name.
  function findEntitlement(tag, info) {
    var gr = newest('asset_tag', '=', tag);
    var how = 'asset tag ' + tag;
    if (!gr && info.invoice) {
      gr = newest('invoice_number', '=', info.invoice);
      how = 'invoice number ' + info.invoice;
      if (gr) warn('No entitlement with asset tag ' + tag + '. Used the one with invoice number ' + info.invoice + '. Put ' + tag + ' in its Asset tag field.');
    }
    if (!gr) {
      var probe = new GlideRecord('alm_license');
      gr = newest(probe.isValidField('software_model') ? 'software_model.display_name' : 'display_name', 'CONTAINS', info.keyword);
      how = 'newest ' + info.keyword + ' entitlement';
      if (gr) warn('No entitlement with asset tag ' + tag + '. Used the newest entitlement whose product contains "' + info.keyword + '": ' + gr.getDisplayValue() + '. If that is wrong, put ' + tag + ' in the Asset tag field of the right entitlement and run again.');
    }
    if (!gr) return null;
    var stateText = '';
    if (gr.isValidField('install_status')) stateText = String(gr.getDisplayValue('install_status') || '');
    if (stateText && !/in use/i.test(stateText)) {
      warn('Entitlement ' + tag + ' has State "' + stateText + '". Publish it (State "In use"), otherwise the license check ignores it.');
    }
    return { id: String(gr.getUniqueValue()), name: String(gr.getDisplayValue()), how: how, state: stateText };
  }
  function isEntitlementRef(ref) { return ref === 'alm_license' || ref === 'alm_entitlement'; }
  function isUserRef(ref) { return ref === 'sys_user'; }
  function isDeviceRef(ref) { return ref.indexOf('cmdb_ci') === 0 || ref === 'alm_asset' || ref === 'alm_hardware'; }

  try {
    if (!DATA) { out('No data found in this script. Copy it again from the guide.'); return; }
    var plans = {
      user: { table: 'alm_entitlement_user', targetNames: ['assigned_to', 'allocated_to', 'user'], targetTest: isUserRef },
      device: { table: 'alm_entitlement_asset', targetNames: ['allocated_to', 'cmdb_ci', 'ci', 'asset'], targetTest: isDeviceRef }
    };
    var results = [];
    DATA.entitlements.forEach(function (info) {
      var rows = DATA.allocations.filter(function (r) { return r.entitlement_tag === info.tag; });
      if (!rows.length) return;
      var p = plans[info.type];
      if (!new GlideRecord(p.table).isValid()) { warn('Table ' + p.table + ' not found. Allocate ' + info.keyword + ' by hand.'); return; }
      var fields = describe(p.table);
      var entField = pick(fields, ['licensed_by', 'entitlement', 'license'], isEntitlementRef);
      var targetField = pick(fields, p.targetNames, p.targetTest);
      var qtyField = pick(fields, ['quantity'], null);
      if (!entField || !targetField) { warn('Could not find the entitlement or target field on ' + p.table + '. Allocate ' + info.keyword + ' by hand.'); return; }
      var ent = findEntitlement(info.tag, info);
      if (!ent) { warn('No ' + info.keyword + ' entitlement found (asset tag ' + info.tag + '). Create and publish it first (Stage 4), then run again.'); return; }
      var created = 0, kept = 0, missing = 0;
      rows.forEach(function (r) {
        var target = '';
        if (info.type === 'user') {
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
      results.push(info.keyword + ' (' + info.type + ' allocations, entitlement found by ' + ent.how + (ent.state ? ', State ' + ent.state : '') + '): ' + created + ' created, ' + kept + ' already there, ' + missing + ' not found. Fields used: ' + p.table + '.' + entField.name + ' and ' + p.table + '.' + targetField.name);
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
