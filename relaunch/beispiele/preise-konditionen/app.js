/* =========================================================================
   SAP SD Preislisten- & Konditionsexport – Demo-Engine
   Formate: Flatfile (BVD00/01/02), IDoc COND_A04 (flat + XML), CSV.
   ========================================================================= */
"use strict";

/* ---------- 1. Demo-Konditionssätze (MOK-Daten) -------------------------- */
const RECORDS = [
  { id: "c01", kscl: "PR00", vkorg: "1000", vtweg: "10", spart: "01", kunnr: "", kdgrp: "02", matnr: "MAT-100001", datab: "20260101", datbi: "99991231", kbetr: "129.00", konwa: "EUR", kpein: "1", kmein: "ST", listType: "Endkunden-Standard",
    scales: [{ qty: "10", price: "124.55" }, { qty: "50", price: "119.00" }, { qty: "100", price: "112.00" }] },
  { id: "c02", kscl: "PR00", vkorg: "1000", vtweg: "20", spart: "01", kunnr: "", kdgrp: "01", matnr: "MAT-100002", datab: "20260101", datbi: "20261231", kbetr: "95.00", konwa: "EUR", kpein: "10", kmein: "ST", listType: "Händler-Preisliste",
    scales: [{ qty: "10", price: "95.00" }, { qty: "50", price: "89.00" }, { qty: "100", price: "79.00" }] },
  { id: "c03", kscl: "K004", vkorg: "1000", vtweg: "20", spart: "01", kunnr: "", kdgrp: "01", matnr: "MAT-100002", datab: "20260101", datbi: "99991231", kbetr: "89.00", konwa: "EUR", kpein: "10", kmein: "ST", listType: "Händler-Preisliste", scales: [] },
  { id: "c04", kscl: "K005", vkorg: "1000", vtweg: "10", spart: "01", kunnr: "0000100455", kdgrp: "", matnr: "MAT-100003", datab: "20260101", datbi: "20261231", kbetr: "5.00", konwa: "%", kpein: "1", kmein: "ST", listType: "Rahmenvereinbarung", locked: true, scales: [] },
  { id: "c05", kscl: "K005", vkorg: "1000", vtweg: "20", spart: "01", kunnr: "0000100777", kdgrp: "", matnr: "MAT-100004", datab: "20260101", datbi: "99991231", kbetr: "3.50", konwa: "%", kpein: "1", kmein: "ST", listType: "Rahmenvereinbarung", scales: [] },
  { id: "c06", kscl: "RA00", vkorg: "1000", vtweg: "10", spart: "01", kunnr: "", kdgrp: "02", matnr: "", datab: "20260101", datbi: "20261231", kbetr: "2.00", konwa: "%", kpein: "1", kmein: "ST", listType: "Endkunden-Standard", scales: [] },
  { id: "c07", kscl: "RB00", vkorg: "1000", vtweg: "10", spart: "01", kunnr: "0000100455", kdgrp: "", matnr: "MAT-100006", datab: "20260101", datbi: "20261031", kbetr: "1.50", konwa: "%", kpein: "1", kmein: "ST", listType: "Rahmenvereinbarung", scales: [] },
  { id: "c08", kscl: "PR00", vkorg: "2000", vtweg: "10", spart: "02", kunnr: "", kdgrp: "02", matnr: "MAT-200001", datab: "20260101", datbi: "20261231", kbetr: "249.00", konwa: "EUR", kpein: "100", kmein: "KG", listType: "Endkunden-Standard",
    scales: [{ qty: "100", price: "249.00" }, { qty: "500", price: "235.00" }, { qty: "1000", price: "219.00" }] },
  { id: "c09", kscl: "PR00", vkorg: "2000", vtweg: "10", spart: "02", kunnr: "", kdgrp: "02", matnr: "MAT-200002", datab: "20261231", datbi: "20260101", kbetr: "310.00", konwa: "EUR", kpein: "100", kmein: "KG", listType: "Endkunden-Standard", scales: [] },
  { id: "c10", kscl: "K004", vkorg: "1000", vtweg: "20", spart: "01", kunnr: "", kdgrp: "01", matnr: "", datab: "20260101", datbi: "99991231", kbetr: "12.00", konwa: "EUR", kpein: "1", kmein: "ST", listType: "Händler-Preisliste", scales: [] },
  { id: "c11", kscl: "PR00", vkorg: "1000", vtweg: "10", spart: "01", kunnr: "", kdgrp: "02", matnr: "MAT-100010", datab: "20260101", datbi: "99991231", kbetr: "100.00", konwa: "EUR", kpein: "1", kmein: "ST", listType: "Endkunden-Standard",
    scales: [{ qty: "10", price: "100.00" }, { qty: "50", price: "105.00" }, { qty: "100", price: "95.00" }] }
];

/* ---------- 2. Satzlayout Flatfile -------------------------------------- */
const BVD = {
  BVD00: [
    ["SATZART", 5], ["VKORG", 4], ["VTWEG", 2], ["SPART", 2],
    ["DATAB", 8], ["DATBI", 8], ["ANZAHL", 8]
  ],
  BVD01: [
    ["SATZART", 5], ["KSCHL", 4], ["VKORG", 4], ["VTWEG", 2], ["SPART", 2],
    ["KUNNR", 10], ["KDGRP", 2], ["MATNR", 18], ["DATAB", 8], ["DATBI", 8],
    ["KBETR", 13], ["KONWA", 5], ["KPEIN", 5], ["KMEIN", 3]
  ],
  BVD02: [["SATZART", 5], ["KSCHL", 4], ["KSTBM", 8], ["KBETR", 13]]
};

const NUMERIC = new Set(["KBETR", "KPEIN", "KSTBM", "ANZAHL"]);

/* ---------- 3. Hilfsfunktionen ------------------------------------------ */
const el = (id) => document.getElementById(id);

function isValidDate(v) {
  if (!/^\d{8}$/.test(v)) return false;
  const y = +v.slice(0, 4), m = +v.slice(4, 6), d = +v.slice(6, 8);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function num(value, decimal) {
  const s = String(value ?? "");
  return decimal === "," ? s.replace(".", ",") : s.replace(",", ".");
}

function fixedLine(type, values, decimal) {
  return BVD[type]
    .map(([name, len]) => {
      const raw = name === "SATZART" ? type : String(values[name] ?? "");
      const v = NUMERIC.has(name) ? num(raw, decimal) : raw;
      return NUMERIC.has(name) ? v.slice(-len).padStart(len, "0") : v.slice(0, len).padEnd(len, " ");
    })
    .join("");
}

function csvCell(v) {
  const s = String(v ?? "");
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function kunnr(r) {
  return r.kunnr ? r.kunnr.padStart(10, "0") : "";
}

function keyLabel(r) {
  return r.kunnr ? `KUNNR ${kunnr(r)}` : r.kdgrp ? `KDGRP ${r.kdgrp}` : "–";
}

/* ---------- 4. Validierung ---------------------------------------------- */
function validateRecord(r, stichtag) {
  const issues = [];
  const add = (level, msg) => issues.push({ level, msg, id: r.id });

  if (!r.vkorg) add("error", `${r.kscl}: Verkaufsorganisation (VKORG) fehlt.`);
  if (!r.matnr && !["RA00", "RB00"].includes(r.kscl)) {
    add("error", `${r.kscl}: Materialnummer (MATNR) fehlt bei einer positionsgenauen Kondition.`);
  }
  if (!isValidDate(r.datab)) add("error", `${r.kscl}: Gültig-ab ${r.datab} ist kein gültiges Datum.`);
  if (!isValidDate(r.datbi)) add("error", `${r.kscl}: Gültig-bis ${r.datbi} ist kein gültiges Datum.`);
  if (isValidDate(r.datab) && isValidDate(r.datbi) && r.datab > r.datbi) {
    add("error", `${r.kscl} ${r.matnr || r.kdgrp}: Gültig-ab ${r.datab} liegt nach Gültig-bis ${r.datbi}.`);
  }
  if (!(Number(r.kbetr) > 0)) add("error", `${r.kscl}: Konditionsbetrag KBETR muss größer als 0 sein.`);
  if (!(Number(r.kpein) > 0)) add("error", `${r.kscl}: Preiseinheit KPEIN muss größer als 0 sein.`);
  if (r.konwa !== "%" && !/^[A-Z]{3}$/.test(r.konwa)) add("error", `${r.kscl}: Währung KONWA „${r.konwa}“ ist ungültig.`);
  if (!/^ST$|^KG$|^PCE$|^M$|^L$/.test(r.kmein)) add("warn", `${r.kscl}: Mengeneinheit KMEIN „${r.kmein}“ ist nicht in der Auswahlliste.`);

  const scaleIssues = [];
  r.scales.forEach((s, i) => {
    if (!(Number(s.qty) > 0)) scaleIssues.push(`Staffel ${i + 1}: Menge muss größer als 0 sein.`);
    if (i > 0) {
      if (Number(s.qty) <= Number(r.scales[i - 1].qty)) scaleIssues.push(`Staffel ${i + 1}: Menge ${s.qty} steigt nicht gegenüber ${r.scales[i - 1].qty}.`);
      if (Number(s.price) > Number(r.scales[i - 1].price)) scaleIssues.push(`Staffel ${i + 1}: Preis ${s.price} liegt über der Vorstufe ${r.scales[i - 1].price}.`);
    }
  });
  scaleIssues.forEach((m) => add("warn", `${r.kscl} ${r.matnr || r.kdgrp || ""}: ${m}`));

  if (stichtag && isValidDate(r.datab) && isValidDate(r.datbi) && !(r.datab <= stichtag && stichtag <= r.datbi)) {
    add("warn", `${r.kscl} ${r.matnr || r.kdgrp || ""}: am Stichtag ${stichtag} nicht gültig (${r.datab}–${r.datbi}).`);
  }
  return issues;
}

function statusOf(r, issues) {
  if (r.locked) return "locked";
  if (issues.some((i) => i.level === "error" || i.level === "warn")) return "check";
  return "ok";
}

/* ---------- 5. Export-Generatoren --------------------------------------- */
function groupBy(list, fn) {
  const map = new Map();
  list.forEach((item) => {
    const k = fn(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  });
  return map;
}

function buildFlatfile(rows, decimal, stichtag) {
  const lines = [];
  const groups = groupBy(rows, (r) => `${r.vkorg}/${r.vtweg}/${r.spart}`);
  [...groups.entries()].sort().forEach(([key, recs]) => {
    const [vkorg, vtweg, spart] = key.split("/");
    const datab = recs.reduce((m, r) => (r.datab < m ? r.datab : m), recs[0].datab);
    const datbi = recs.reduce((m, r) => (r.datbi > m ? r.datbi : m), recs[0].datbi);
    lines.push({ type: "BVD00", text: fixedLine("BVD00", { VKORG: vkorg, VTWEG: vtweg, SPART: spart, DATAB: datab, DATBI: datbi, ANZAHL: String(recs.length) }, decimal) });
    recs.forEach((r) => {
      lines.push({ type: "BVD01", text: fixedLine("BVD01", { KSCHL: r.kscl, VKORG: r.vkorg, VTWEG: r.vtweg, SPART: r.spart, KUNNR: kunnr(r), KDGRP: r.kdgrp, MATNR: r.matnr, DATAB: r.datab, DATBI: r.datbi, KBETR: r.kbetr, KONWA: r.konwa, KPEIN: r.kpein, KMEIN: r.kmein }, decimal) });
      r.scales.forEach((s) => {
        lines.push({ type: "BVD02", text: fixedLine("BVD02", { KSCHL: r.kscl, KSTBM: s.qty, KBETR: s.price }, decimal) });
      });
    });
  });
  return lines;
}

function buildIdocFlat(rows, decimal) {
  const lines = [];
  lines.push({ type: "EDI", text: ["EDI_DC40", "TABNAM=EDI_DC40", "MANDT=100", "DOCNUM=0000000000000001", "IDOCTYP=COND_A04", "MESTYP=COND_A", "SNDPOR=SAPLS", "SNDPRT=LS", "SNDPRN=KIVENTIS", "RCVPOR=SAPLS", "RCVPRT=LS", "RCVPRN=SAPKIV", "CREDAT=" + new Date().toISOString().slice(0, 10).replace(/-/g, ""), "TEST=0"].join("|") });
  rows.forEach((r) => {
    lines.push({ type: "SEG", text: ["E1KOMG", `VKORG=${r.vkorg}`, `VTWEG=${r.vtweg}`, `SPART=${r.spart}`].join("|") });
    lines.push({ type: "SEG", text: ["E1KONH", `KSCHL=${r.kscl}`, `DATAB=${r.datab}`, `DATBI=${r.datbi}`, `KNUMH=${r.id.toUpperCase()}`, "KOTABNR=A304"].join("|") });
    const konp = ["E1KONP", `KSCHL=${r.kscl}`, `KBETR=${num(r.kbetr, decimal)}`, `KONWA=${r.konwa}`, `KPEIN=${r.kpein}`, `KMEIN=${r.kmein}`];
    if (r.kunnr) konp.push(`KUNNR=${kunnr(r)}`);
    if (r.kdgrp) konp.push(`KDGRP=${r.kdgrp}`);
    if (r.matnr) konp.push(`MATNR=${r.matnr}`);
    lines.push({ type: "SEG", text: konp.join("|") });
    r.scales.forEach((s) => {
      lines.push({ type: "SEG", text: ["E1KONM", `KSTBM=${num(s.qty, decimal)}`, `KBETR=${num(s.price, decimal)}`, `KONWA=${r.konwa}`].join("|") });
    });
  });
  return lines;
}

function esc(v) {
  return String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildIdocXml(rows, decimal) {
  const now = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const out = [];
  out.push('<?xml version="1.0" encoding="UTF-8"?>');
  out.push('<COND_A04 xmlns="urn:sap-com:document:sap:idoc:messages">');
  out.push("  <EDI_DC40>");
  out.push("    <TABNAM>EDI_DC40</TABNAM><MANDT>100</MANDT><IDOCTYP>COND_A04</IDOCTYP><MESTYP>COND_A</MESTYP>");
  out.push(`    <SNDPRN>KIVENTIS</SNDPRN><RCVPRN>SAPKIV</RCVPRN><CREDAT>${now}</CREDAT>`);
  out.push("  </EDI_DC40>");
  rows.forEach((r) => {
    out.push("  <E1KOMG>");
    out.push(`    <VKORG>${esc(r.vkorg)}</VKORG><VTWEG>${esc(r.vtweg)}</VTWEG><SPART>${esc(r.spart)}</SPART>`);
    out.push("    <E1KONH>");
    out.push(`      <KSCHL>${esc(r.kscl)}</KSCHL><DATAB>${esc(r.datab)}</DATAB><DATBI>${esc(r.datbi)}</DATBI><KOTABNR>A304</KOTABNR>`);
    out.push("      <E1KONP>");
    out.push(`        <KBETR>${esc(num(r.kbetr, decimal))}</KBETR><KONWA>${esc(r.konwa)}</KONWA><KPEIN>${esc(r.kpein)}</KPEIN><KMEIN>${esc(r.kmein)}</KMEIN>`);
    if (r.kunnr) out.push(`        <KUNNR>${esc(kunnr(r))}</KUNNR>`);
    if (r.kdgrp) out.push(`        <KDGRP>${esc(r.kdgrp)}</KDGRP>`);
    if (r.matnr) out.push(`        <MATNR>${esc(r.matnr)}</MATNR>`);
    r.scales.forEach((s) => {
      out.push("        <E1KONM>");
      out.push(`          <KSTBM>${esc(num(s.qty, decimal))}</KSTBM><KBETR>${esc(num(s.price, decimal))}</KBETR><KONWA>${esc(r.konwa)}</KONWA>`);
      out.push("        </E1KONM>");
    });
    out.push("      </E1KONP>");
    out.push("    </E1KONH>");
    out.push("  </E1KOMG>");
  });
  out.push("</COND_A04>");
  return out.map((text) => ({ type: text.trim().startsWith("<E1") || text.includes("<E1") ? "SEG" : "EDI", text }));
}

function buildCsv(rows, decimal) {
  const head = ["KSCHL", "VKORG", "VTWEG", "SPART", "KUNNR", "KDGRP", "MATNR", "DATAB", "DATBI", "KBETR", "KONWA", "KPEIN", "KMEIN", "STF1_MENGE", "STF1_PREIS", "STF2_MENGE", "STF2_PREIS", "STF3_MENGE", "STF3_PREIS"];
  const lines = [{ type: "CSV", text: head.join(";") }];
  rows.forEach((r) => {
    const cells = [r.kscl, r.vkorg, r.vtweg, r.spart, kunnr(r), r.kdgrp, r.matnr, r.datab, r.datbi, num(r.kbetr, decimal), r.konwa, r.kpein, r.kmein];
    for (let i = 0; i < 3; i++) {
      const s = r.scales[i];
      cells.push(s ? num(s.qty, decimal) : "", s ? num(s.price, decimal) : "");
    }
    lines.push({ type: "CSV", text: cells.map(csvCell).join(";") });
  });
  return lines;
}

/* ---------- 6. Zustand & Rendering -------------------------------------- */
const state = { selected: 0, editing: false, issues: [], rows: [], lines: [], stichtag: "20261021" };

function settings() {
  const d = el("fDate").value; // yyyy-mm-dd
  return {
    line: el("fLine").value,
    type: el("fType").value,
    format: el("format").value,
    decimal: el("decimal").value,
    stichtag: d ? d.replace(/-/g, "") : ""
  };
}

function visibleRows() {
  const s = settings();
  return RECORDS.filter((r) => {
    if (s.line && `${r.vkorg}/${r.vtweg}/${r.spart}` !== s.line) return false;
    if (s.type && r.listType !== s.type) return false;
    return true;
  });
}

function renderTable() {
  const body = el("condBody");
  body.innerHTML = "";
  state.rows = visibleRows();
  state.rows.forEach((r, i) => {
    const issues = state.issues.filter((x) => x.id === r.id);
    const status = statusOf(r, issues);
    const badge = status === "ok"
      ? '<span class="badge badge--ok">VALIDE</span>'
      : status === "locked"
        ? '<span class="badge badge--err">GESPERRT</span>'
        : '<span class="badge badge--warn">PRÜFUNG</span>';
    const tr = document.createElement("tr");
    tr.dataset.id = r.id;
    tr.className = i === state.selected ? "is-selected" : "";
    tr.innerHTML = `
      <td class="mono">${r.kscl}</td>
      <td class="mono">${r.vkorg}/${r.vtweg}/${r.spart}</td>
      <td class="mono">${keyLabel(r)}</td>
      <td class="mono">${r.matnr || "<span class='text-missing'>fehlt</span>"}</td>
      <td class="mono">${r.datab}</td>
      <td class="mono">${r.datbi}</td>
      <td class="num editable" data-field="kbetr">${num(r.kbetr, settings().decimal)}</td>
      <td class="mono">${r.konwa}</td>
      <td class="num">${r.kpein}</td>
      <td class="mono">${r.kmein}</td>
      <td class="num">${r.scales.length ? r.scales.length : "–"}</td>
      <td>${badge}</td>`;
    tr.addEventListener("click", (e) => {
      if (e.target.dataset.field === "kbetr") {
        startEdit(i);
        return;
      }
      state.selected = i;
      renderTable();
      renderDetail();
    });
    body.appendChild(tr);
  });
  el("rowCount").textContent = `${state.rows.length} von ${RECORDS.length}`;
}

function startEdit(index) {
  const r = state.rows[index];
  const tr = el("condBody").querySelector(`tr[data-id="${r.id}"]`);
  const td = tr.querySelector('[data-field="kbetr"]');
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "decimal";
  input.value = num(r.kbetr, settings().decimal);
  td.textContent = "";
  td.appendChild(input);
  input.focus();
  input.select();
  const commit = (keep) => {
    if (keep) {
      const v = input.value.replace(",", ".").trim();
      if (/^\d+(\.\d{1,3})?$/.test(v)) r.kbetr = v;
    }
    state.editing = false;
    run();
  };
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation(); // sonst öffnet derselbe Tastendruck direkt den nächsten Editor
    commit(e.key === "Enter");
  });
  input.addEventListener("blur", () => commit(true));
  state.editing = true;
}

function renderDetail() {
  const r = state.rows[state.selected];
  const box = el("detail");
  if (!r) { box.innerHTML = ""; return; }
  const issues = state.issues.filter((x) => x.id === r.id);
  const scales = r.scales.length
    ? `<table class="grid grid--tight"><thead><tr><th>Staffel</th><th class="num">KSTBM (Menge ab)</th><th class="num">KBETR</th><th>KONWA</th></tr></thead><tbody>${
        r.scales.map((s, i) => `<tr><td class="mono">${i + 1}</td><td class="num">${num(s.qty, settings().decimal)}</td><td class="num">${num(s.price, settings().decimal)}</td><td class="mono">${r.konwa}</td></tr>`).join("")
      }</tbody></table>`
    : '<p class="hint hint--tight">Keine Staffeln hinterlegt – es gilt der Einzelpreis KBETR.</p>';
  box.innerHTML = `
    <div class="detail">
      <div class="section-title section-title--first">Konditionssatz ${r.kscl} · ${r.listType}</div>
      <dl>
        <dt>Zugriffsfolge</dt><dd>A304 (VKORG/VTWEG/MATNR/${r.kdgrp ? "KDGRP" : "KUNNR"})</dd>
        <dt>Schlüssel</dt><dd>${r.vkorg} / ${r.vtweg} / ${r.spart} · ${keyLabel(r)} · ${r.matnr || "ohne MATNR"}</dd>
        <dt>Gültigkeit</dt><dd>${r.datab} – ${r.datbi}</dd>
        <dt>Preis</dt><dd>${num(r.kbetr, settings().decimal)} ${r.konwa} je ${r.kpein} ${r.kmein}</dd>
      </dl>
      ${scales}
      ${issues.length ? `<div class="messages">${issues.map((x) => `<div class="msg msg--${x.level === "error" ? "err" : "warn"}"><span class="msg__icon">${x.level === "error" ? "!" : "…"}</span><span>${x.msg.replace(/</g, "&lt;")}</span></div>`).join("")}</div>` : ""}
    </div>`;
}

function renderInspector() {
  const box = el("inspector");
  if (!state.lines.length) {
    box.innerHTML = '<p class="inspector__empty">Keine Zeilen erzeugt.</p>';
    el("lineCount").textContent = "0 Zeilen";
    return;
  }
  box.innerHTML = state.lines.map((l, i) => {
    const safe = l.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="line"><span class="line__no">${i + 1}</span><span class="line__txt t-${l.type.toLowerCase()}">${safe}</span></div>`;
  }).join("");
  el("lineCount").textContent = `${state.lines.length} Zeilen`;
}

function renderMessages() {
  const box = el("messages");
  const errors = state.issues.filter((i) => i.level === "error");
  const warns = state.issues.filter((i) => i.level === "warn");
  if (!errors.length && !warns.length) {
    box.innerHTML = '<div class="msg msg--ok"><span class="msg__icon">✓</span><span>Alle Konditionssätze plausibel: Gültigkeiten, Pflichtschlüssel und Staffelreihenfolgen geprüft.</span></div>';
    return;
  }
  const rows = [...errors, ...warns].slice(0, 12)
    .map((m) => `<div class="msg msg--${m.level === "error" ? "err" : "warn"}"><span class="msg__icon">${m.level === "error" ? "!" : "…"}</span><span>${m.msg.replace(/</g, "&lt;")}</span></div>`);
  if (errors.length + warns.length > 12) rows.push(`<div class="msg"><span class="msg__icon">…</span><span>${errors.length + warns.length - 12} weitere Meldungen</span></div>`);
  box.innerHTML = rows.join("");
}

function renderStatus(exported) {
  const s = settings();
  const rowsForExport = state.rows.filter((r) => {
    const issues = state.issues.filter((i) => i.id === r.id);
    if (r.locked) return false;
    if (issues.some((i) => i.level === "error")) return false;
    if (s.stichtag && isValidDate(r.datab) && isValidDate(r.datbi) && !(r.datab <= s.stichtag && s.stichtag <= r.datbi)) return false;
    return true;
  });
  const checks = state.rows.filter((r) => statusOf(r, state.issues.filter((i) => i.id === r.id)) === "check").length;
  const locked = state.rows.filter((r) => r.locked).length;
  el("kpiRows").textContent = String(state.rows.length);
  el("kpiOk").textContent = String(state.rows.filter((r) => statusOf(r, state.issues.filter((i) => i.id === r.id)) === "ok").length);
  el("kpiWarn").textContent = String(checks);
  el("kpiLocked").textContent = String(locked);
  const badge = el("statusBadge");
  if (exported) {
    badge.className = "badge badge--ok";
    badge.textContent = `EXPORTIERT · ${rowsForExport.length} SÄTZE`;
  } else if (checks || locked) {
    badge.className = "badge badge--warn";
    badge.textContent = "PRÜFUNG ERFORDERLICH";
  } else {
    badge.className = "badge badge--ok";
    badge.textContent = "VALIDIERT · BEREIT FÜR SAP";
  }
  return rowsForExport;
}

function generate(rows, s) {
  if (s.format === "BVD") return buildFlatfile(rows, s.decimal, s.stichtag);
  if (s.format === "IDOC") return buildIdocFlat(rows, s.decimal);
  if (s.format === "XML") return buildIdocXml(rows, s.decimal);
  return buildCsv(rows, s.decimal);
}

function run({ downloadFile = false } = {}) {
  const s = settings();
  state.issues = [];
  RECORDS.forEach((r) => state.issues.push(...validateRecord(r, s.stichtag)));
  state.rows = visibleRows();
  state.selected = Math.min(state.selected, Math.max(0, state.rows.length - 1));
  renderTable();
  renderDetail();
  renderMessages();
  const rowsForExport = renderStatus(false);
  state.lines = generate(rowsForExport, s);
  renderInspector();
  el("fileInfo").textContent = `${s.format === "XML" ? "COND_A04.xml" : s.format === "CSV" ? "CSV" : s.format === "IDOC" ? "IDoc flat" : "Flatfile"} · ${rowsForExport.length} Konditionen`;
  el("legendText").textContent = s.format === "XML" ? "IDoc XML" : s.format === "IDOC" ? "E1KOMG / E1KONH / E1KONP / E1KONM" : s.format === "CSV" ? "Semikolon, Kopfzeile" : "BVD00 Kopf · BVD01 Kondition · BVD02 Staffel";

  if (downloadFile) {
    const ext = s.format === "XML" ? "xml" : s.format === "CSV" ? "csv" : "txt";
    const name = s.format === "BVD" ? "CONDITIONEN_BVD" : s.format === "CSV" ? "CONDITIONEN_CSV" : "COND_A04";
    const text = state.lines.map((l) => l.text).join("\r\n") + "\r\n";
    const blob = new Blob([text], { type: ext === "xml" ? "application/xml" : "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${s.stichtag}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    renderStatus(true);
  }
}

/* ---------- 7. Ereignisse ----------------------------------------------- */
el("btnValidate").addEventListener("click", () => run());
el("btnExport").addEventListener("click", () => run({ downloadFile: true }));
["fLine", "fType", "fDate", "format", "decimal"].forEach((id) => el(id).addEventListener("change", () => run()));

document.addEventListener("keydown", (e) => {
  const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName);
  if (e.key === "F2") { e.preventDefault(); run(); return; }
  if (e.key === "F4") { e.preventDefault(); renderDetail(); el("detail").scrollIntoView({ block: "nearest" }); return; }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") { e.preventDefault(); run({ downloadFile: true }); return; }
  if (typing) return;
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    state.selected = Math.max(0, Math.min(state.rows.length - 1, state.selected + (e.key === "ArrowDown" ? 1 : -1)));
    renderTable();
    renderDetail();
  }
  if (e.key === "Enter" && state.rows.length) { e.preventDefault(); startEdit(state.selected); }
});

run();
