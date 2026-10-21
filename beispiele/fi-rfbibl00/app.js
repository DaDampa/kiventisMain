/* =========================================================================
   SAP RFBIBL00 Buchungsexport – Demo-Engine
   Erzeugt Batch-Input-Dateien mit den Satzarten BGR00, BBK00 und BBS00/BBSEG.
   Alle Layouts stehen in LAYOUT und werden auf der Seite angezeigt.
   ========================================================================= */
"use strict";

/* ---------- 1. Satzlayout (1-basiert, wie in der SAP-Doku) --------------- */
const LAYOUT = {
  BGR00: [
    { name: "SATZART", start: 1, len: 5, align: "L" },
    { name: "MAPPENNAME", start: 6, len: 12, align: "L" },
    { name: "MANDANT", start: 18, len: 3, align: "R", fill: "0" },
    { name: "BENUTZER", start: 21, len: 12, align: "L" },
    { name: "STARTDATUM", start: 33, len: 8, align: "L" },
    { name: "XKEEP", start: 41, len: 1, align: "L" }
  ],
  BBK00: [
    { name: "SATZART", start: 1, len: 5, align: "L" },
    { name: "BUKRS", start: 6, len: 4, align: "L" },
    { name: "BLART", start: 10, len: 2, align: "L" },
    { name: "BLDAT", start: 12, len: 8, align: "L" },
    { name: "BUDAT", start: 20, len: 8, align: "L" },
    { name: "WAERS", start: 28, len: 5, align: "L" },
    { name: "XBLNR", start: 33, len: 15, align: "L" },
    { name: "BKTXT", start: 48, len: 25, align: "L" }
  ],
  BBS00: [
    { name: "SATZART", start: 1, len: 5, align: "L" },
    { name: "NEWBS", start: 6, len: 2, align: "L" },
    { name: "NEWKO", start: 8, len: 10, align: "R", fill: "0" },
    { name: "WRBTR", start: 18, len: 13, align: "R", fill: "0" },
    { name: "MWSKZ", start: 31, len: 2, align: "L" },
    { name: "KOSTL", start: 33, len: 10, align: "L" },
    { name: "SGTXT", start: 43, len: 25, align: "L" },
    { name: "VALUT", start: 68, len: 8, align: "L" }
  ]
};

const DEBIT_KEYS = new Set(["40", "01"]);
const CREDIT_KEYS = new Set(["50", "31"]);

/* ---------- 2. Demo-Belege (MOK-Daten) ---------------------------------- */
const DOCS = [
  {
    id: "kr-1",
    label: "Lieferantenrechnung Lohnfertigung",
    bukrs: "1000",
    blart: "KR",
    bldat: "20261015",
    budat: "20261015",
    waers: "EUR",
    xblnr: "RE-2026-0815",
    bktxt: "Eingangsrechnung RE-0815",
    positions: [
      { bs: "40", konto: "415000", amount: "4200.00", mwskz: "V1", kostl: "4711", sgtxt: "Lohnfertigung KW42", valut: "20261015" },
      { bs: "40", konto: "157600", amount: "798.00", mwskz: "V1", kostl: "", sgtxt: "Vorsteuer 19 %", valut: "20261015" },
      { bs: "31", konto: "100234", amount: "4998.00", mwskz: "", kostl: "", sgtxt: "Kreditor Müller CNC GmbH", valut: "20261031" }
    ]
  },
  {
    id: "dr-1",
    label: "Kundenrechnung Anlagenbau",
    bukrs: "1000",
    blart: "DR",
    bldat: "20261016",
    budat: "20261016",
    waers: "EUR",
    xblnr: "AR-2026-4471",
    bktxt: "Ausgangsrechnung Nordwind Anlagenbau AG",
    positions: [
      { bs: "01", konto: "100455", amount: "11900.00", mwskz: "", kostl: "", sgtxt: "Debitor Nordwind GmbH", valut: "20261016" },
      { bs: "50", konto: "840000", amount: "10000.00", mwskz: "A1", kostl: "", sgtxt: "Erlöse 19 % Steuer", valut: "20261016" },
      { bs: "50", konto: "177600", amount: "1900.00", mwskz: "A1", kostl: "", sgtxt: "Umsatzsteuer 19 %", valut: "20261016" }
    ]
  },
  {
    id: "sa-1",
    label: "Interne Umbuchung Gemeinkosten",
    bukrs: "1000",
    blart: "SA",
    bldat: "20261017",
    budat: "20261031",
    waers: "EUR",
    xblnr: "UMB-2026-102",
    bktxt: "Umbuchung Gemeinkosten KW43",
    positions: [
      { bs: "40", konto: "476000", amount: "3500.00", mwskz: "", kostl: "4711", sgtxt: "Verrechnung Instandhaltung", valut: "20261031" },
      { bs: "50", konto: "476100", amount: "3500.00", mwskz: "", kostl: "9200", sgtxt: "Verrechnung Fertigung", valut: "20261031" }
    ]
  }
];

/* ---------- 3. Hilfsfunktionen ------------------------------------------ */
const el = (id) => document.getElementById(id);

function cents(value) {
  return Math.round(Number(String(value).replace(",", ".")) * 100);
}

function eur(c) {
  return (c / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtAmount(c, decimal) {
  const s = (Math.abs(c) / 100).toFixed(2);
  return (c < 0 ? "-" : "") + (decimal === "," ? s.replace(".", ",") : s);
}

function isValidDate(yyyymmdd) {
  if (!/^\d{8}$/.test(yyyymmdd)) return false;
  const y = +yyyymmdd.slice(0, 4), m = +yyyymmdd.slice(4, 6), d = +yyyymmdd.slice(6, 8);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function pad(value, len, align, fill) {
  let s = String(value ?? "");
  if (s.length > len) s = s.slice(0, len);
  if (align === "R") return s.padStart(len, fill || " ");
  return s.padEnd(len, " ");
}

function buildFixed(type, values) {
  const fields = LAYOUT[type];
  const width = fields.reduce((max, f) => Math.max(max, f.start + f.len - 1), 0);
  let out = " ".repeat(width).split("");
  for (const f of fields) {
    const padded = pad(values[f.name] ?? "", f.len, f.align, f.fill);
    for (let i = 0; i < f.len; i++) out[f.start - 1 + i] = padded[i];
  }
  return out.join("");
}

function buildTab(type, values) {
  return [type, ...LAYOUT[type].slice(1).map((f) => values[f.name] ?? "")].join("\t");
}

/* ---------- 4. Validierung ---------------------------------------------- */
function validate(docs, settings) {
  const issues = [];
  const add = (level, msg, docId) => issues.push({ level, msg, docId });

  docs.forEach((doc) => {
    let debit = 0, credit = 0;
    const where = `${doc.blart} ${doc.xblnr}`;

    if (!/^\d{4}$/.test(doc.bukrs)) add("error", `${where}: Buchungskreis „${doc.bukrs}“ ist nicht vierstellig numerisch.`, doc.id);
    if (!/^[A-Z0-9]{2}$/.test(doc.blart)) add("error", `${where}: Belegart „${doc.blart}“ ist ungültig.`, doc.id);
    if (!isValidDate(doc.bldat)) add("error", `${where}: Belegdatum ${doc.bldat} ist kein gültiges Datum.`, doc.id);
    if (!isValidDate(doc.budat)) add("error", `${where}: Buchungsdatum ${doc.budat} ist kein gültiges Datum.`, doc.id);
    if (doc.budat < doc.bldat) add("warn", `${where}: Buchungsdatum liegt vor dem Belegdatum.`, doc.id);
    if (!/^[A-Z]{3}$/.test(doc.waers)) add("error", `${where}: Währung „${doc.waers}“ ist nicht dreistellig.`, doc.id);
    if (!doc.positions.length) add("error", `${where}: Beleg hat keine Positionen.`, doc.id);

    doc.positions.forEach((p, idx) => {
      const n = `${where}, Position ${idx + 1}`;
      if (!/^\d{2}$/.test(p.bs)) add("error", `${n}: Buchungsschlüssel „${p.bs}“ ist nicht zweistellig.`, doc.id);
      if (!DEBIT_KEYS.has(p.bs) && !CREDIT_KEYS.has(p.bs)) {
        add("warn", `${n}: Buchungsschlüssel ${p.bs} ist nicht als Soll/Haben bekannt – Saldo wird nicht gezählt.`, doc.id);
      }
      if (!/^\d{1,10}$/.test(String(p.konto))) add("error", `${n}: Konto „${p.konto}“ ist nicht numerisch oder länger als 10 Stellen.`, doc.id);
      const c = cents(p.amount);
      if (!Number.isFinite(c) || c <= 0) add("error", `${n}: Betrag „${p.amount}“ ist keine positive Zahl.`, doc.id);
      if (DEBIT_KEYS.has(p.bs)) debit += c;
      if (CREDIT_KEYS.has(p.bs)) credit += c;
      if (p.valut && !isValidDate(p.valut)) add("error", `${n}: Valutadatum ${p.valut} ist ungültig.`, doc.id);
      if (String(p.sgtxt || "").length > 25) add("warn", `${n}: Positionstext wird auf 25 Zeichen gekürzt.`, doc.id);
      if (String(p.kostl || "").length > 10) add("error", `${n}: Kostenstelle ist länger als 10 Zeichen.`, doc.id);
      if (settings.encoding === "ISO-8859-1") {
        const bad = [...`${p.sgtxt}${doc.bktxt}${doc.xblnr}`].filter((ch) => ch.charCodeAt(0) > 255);
        if (bad.length) add("warn", `${n}: Zeichen außerhalb ISO-8859-1 (${[...new Set(bad)].join(" ")}), werden als „?“ ausgegeben.`, doc.id);
      }
    });

    if (debit !== credit) {
      add("error", `${where}: Soll/Haben nicht ausgeglichen (Saldo ${eur(debit - credit)} EUR).`, doc.id);
    }
  });

  return issues;
}

/* ---------- 5. Datei erzeugen ------------------------------------------- */
function generate(docs, settings) {
  const lines = [];
  const segment = settings.mode === "BI" ? "BBS00" : "BBSEG";
  const recordPrefix = (type) => (type === "BBS00" ? segment : type);

  lines.push({
    type: "BGR00",
    docId: null,
    text: settings.format === "FIXED"
      ? buildFixed("BGR00", {
          SATZART: "BGR00",
          MAPPENNAME: settings.mapname,
          MANDANT: settings.mandant,
          BENUTZER: settings.user,
          STARTDATUM: settings.startDate,
          XKEEP: "X"
        })
      : buildTab("BGR00", {
          SATZART: "BGR00",
          MAPPENNAME: settings.mapname,
          MANDANT: settings.mandant,
          BENUTZER: settings.user,
          STARTDATUM: settings.startDate,
          XKEEP: "X"
        })
  });

  docs.forEach((doc) => {
    const head = {
      SATZART: recordPrefix("BBK00"),
      BUKRS: doc.bukrs,
      BLART: doc.blart,
      BLDAT: doc.bldat,
      BUDAT: doc.budat,
      WAERS: doc.waers,
      XBLNR: doc.xblnr,
      BKTXT: doc.bktxt
    };
    lines.push({
      type: "BBK00",
      docId: doc.id,
      text: settings.format === "FIXED" ? buildFixed("BBK00", head) : buildTab("BBK00", head)
    });

    doc.positions.forEach((p) => {
      const vals = {
        SATZART: recordPrefix("BBS00"),
        NEWBS: p.bs,
        NEWKO: p.konto,
        WRBTR: fmtAmount(cents(p.amount), settings.decimal),
        MWSKZ: p.mwskz || "",
        KOSTL: p.kostl || "",
        SGTXT: p.sgtxt || "",
        VALUT: p.valut || ""
      };
      lines.push({
        type: "BBS00",
        docId: doc.id,
        text: settings.format === "FIXED" ? buildFixed("BBS00", vals) : buildTab("BBS00", vals)
      });
    });
  });

  return lines;
}

/* ---------- 6. Kodierung & Download ------------------------------------- */
function encode(text, encoding) {
  if (encoding === "ISO-8859-1") {
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      bytes[i] = c > 255 ? 63 : c;
    }
    return bytes;
  }
  return new TextEncoder().encode(text);
}

function download(text, filename, encoding) {
  const blob = new Blob([encode(text, encoding)], { type: "text/plain;charset=" + encoding.toLowerCase() });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

/* ---------- 7. Oberfläche ----------------------------------------------- */
let selected = 0;
let lastLines = [];
let lastIssues = [];

function settings() {
  const today = new Date();
  const startDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;
  return {
    mode: el("mode").value,
    format: el("format").value,
    encoding: el("encoding").value,
    decimal: el("decimal").value,
    mapname: el("mapname").value.trim() || "FI_EXP",
    mandant: el("mandant").value.trim() || "100",
    user: el("user").value.trim() || "SAP_BATCH",
    startDate
  };
}

function renderDocs() {
  const list = el("docList");
  list.innerHTML = "";
  DOCS.forEach((doc, i) => {
    const debit = doc.positions.filter((p) => DEBIT_KEYS.has(p.bs)).reduce((s, p) => s + cents(p.amount), 0);
    const credit = doc.positions.filter((p) => CREDIT_KEYS.has(p.bs)).reduce((s, p) => s + cents(p.amount), 0);
    const balanced = debit === credit;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "doc";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", String(i === selected));
    btn.innerHTML = `
      <span class="doc__bar" aria-hidden="true"></span>
      <span>
        <span class="doc__title">${doc.blart} · ${doc.bktxt}</span>
        <span class="doc__meta">${doc.bukrs} · ${doc.bldat} · ${doc.xblnr} · ${doc.positions.length} Positionen</span>
      </span>
      <span class="doc__sum">${eur(debit)}<small>${balanced ? "ausgeglichen" : "Differenz " + eur(debit - credit)}</small></span>`;
    btn.addEventListener("click", () => {
      selected = i;
      renderDocs();
      renderPositions();
    });
    list.appendChild(btn);
  });
  el("docCount").textContent = `${DOCS.length} Belege`;
}

function renderPositions() {
  const doc = DOCS[selected];
  const body = el("posBody");
  body.innerHTML = "";
  doc.positions.forEach((p, i) => {
    const c = cents(p.amount);
    const isDebit = DEBIT_KEYS.has(p.bs);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="mono">${i + 1}</td>
      <td class="mono">${p.bs}</td>
      <td class="mono">${String(p.konto).padStart(10, "0")}</td>
      <td class="num editable" data-idx="${i}">${isDebit ? eur(c) : ""}</td>
      <td class="num editable" data-idx="${i}">${isDebit ? "" : eur(c)}</td>
      <td class="mono">${p.mwskz || "–"}</td>
      <td class="mono">${p.kostl || "–"}</td>
      <td>${p.sgtxt}</td>`;
    tr.querySelectorAll("td.editable").forEach((td) => {
      td.addEventListener("click", () => startAmountEdit(tr, td, doc.positions[+td.dataset.idx]));
    });
    body.appendChild(tr);
  });
}

/* Betrag direkt in der Tabelle ändern – die Saldo-Prüfung greift sofort */
function startAmountEdit(tr, td, position) {
  if (tr.querySelector("input")) return;
  const input = document.createElement("input");
  input.type = "text";
  input.inputMode = "decimal";
  input.value = String(cents(position.amount) / 100).replace(".", ",");
  td.textContent = "";
  td.appendChild(input);
  input.focus();
  input.select();
  const commit = (keep) => {
    if (keep) {
      const v = input.value.trim().replace(/\./g, "").replace(",", ".");
      if (/^\d+(\.\d{1,2})?$/.test(v)) position.amount = v;
    }
    renderPositions();
    run();
  };
  input.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();
    commit(e.key === "Enter");
  });
  input.addEventListener("blur", () => commit(true));
}

function renderInspector() {
  const box = el("inspector");
  if (!lastLines.length) {
    box.innerHTML = `<p class="inspector__empty">Keine Zeilen erzeugt.</p>`;
    el("lineCount").textContent = "0 Zeilen";
    return;
  }
  box.innerHTML = lastLines
    .map((line, i) => {
      const cls = line.type === "BGR00" || line.type === "BBK00" ? "t-bgr" : "t-bbs";
      const safe = line.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<div class="line"><span class="line__no">${i + 1}</span><span class="line__txt ${cls}">${safe}</span></div>`;
    })
    .join("");
  el("lineCount").textContent = `${lastLines.length} Zeilen`;
  const widths = [...new Set(lastLines.map((l) => l.text.length))].sort((a, b) => a - b).join(" / ");
  el("fileInfo").textContent = `${lastLines.length} Sätze · ${widths} Zeichen`;
}

function renderMessages() {
  const box = el("messages");
  if (!lastIssues.length) {
    box.innerHTML = `<div class="msg msg--ok"><span class="msg__icon">✓</span><span>Alle Belege geprüft: Soll und Haben stimmen je Beleg überein, Pflichtfelder sind belegt.</span></div>`;
    return;
  }
  box.innerHTML = lastIssues
    .map((m) => {
      const icon = m.level === "error" ? "!" : "…";
      return `<div class="msg msg--${m.level === "error" ? "err" : "warn"}"><span class="msg__icon">${icon}</span><span>${m.msg.replace(/</g, "&lt;")}</span></div>`;
    })
    .join("");
}

function renderTotals() {
  let debit = 0, credit = 0, positions = 0;
  DOCS.forEach((d) => {
    positions += d.positions.length;
    d.positions.forEach((p) => {
      const c = cents(p.amount);
      if (DEBIT_KEYS.has(p.bs)) debit += c;
      if (CREDIT_KEYS.has(p.bs)) credit += c;
    });
  });
  el("kpiDocs").textContent = String(DOCS.length);
  el("kpiLines").textContent = String(positions);
  el("kpiDebit").textContent = eur(debit);
  el("kpiCredit").textContent = eur(credit);
  el("kpiSaldo").textContent = eur(debit - credit);
}

function renderLayoutHelp() {
  const rows = Object.entries(LAYOUT)
    .map(([type, fields]) => {
      const list = fields.map((f) => `${f.start}–${f.start + f.len - 1} ${f.name}`).join(" · ");
      return `<p><strong>${type}</strong> (${fields.reduce((m, f) => Math.max(m, f.start + f.len - 1), 0)} Zeichen): ${list}</p>`;
    })
    .join("");
  el("layoutTable").innerHTML = rows;
}

function setStatus(kind, text) {
  const badge = el("statusBadge");
  badge.className = "badge badge--" + kind;
  badge.textContent = text;
}

function run({ downloadFile = false } = {}) {
  const s = settings();
  lastIssues = validate(DOCS, s);
  lastLines = generate(DOCS, s);
  renderInspector();
  renderMessages();
  renderTotals();

  const errors = lastIssues.filter((i) => i.level === "error");
  if (errors.length) {
    setStatus("err", "PRÜFUNG ERFORDERLICH");
    if (downloadFile) return false;
    return false;
  }
  setStatus("ok", "VALIDIERT · BEREIT FÜR SAP");

  if (downloadFile) {
    const ext = s.format === "TAB" ? "dat" : "txt";
    const filename = `RFBIBL00_${s.mapname}_${s.mode}_${s.startDate}.${ext}`;
    download(lastLines.map((l) => l.text).join("\r\n") + "\r\n", filename, s.encoding);
    el("fileInfo").textContent = `${filename} · ${lastLines.length} Sätze · ${s.encoding}`;
  }
  return true;
}

/* ---------- 8. Start ----------------------------------------------------- */
el("btnValidate").addEventListener("click", () => run());
el("btnExport").addEventListener("click", () => run({ downloadFile: true }));
["mode", "format", "encoding", "decimal", "mapname", "mandant", "user"].forEach((id) =>
  el(id).addEventListener("change", () => run())
);

document.addEventListener("keydown", (e) => {
  const typing = /^(INPUT|SELECT|TEXTAREA)$/.test(document.activeElement.tagName);
  if (e.key === "F2") {
    e.preventDefault();
    run();
    return;
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "e") {
    e.preventDefault();
    run({ downloadFile: true });
    return;
  }
  if (!typing && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
    e.preventDefault();
    selected = Math.max(0, Math.min(DOCS.length - 1, selected + (e.key === "ArrowDown" ? 1 : -1)));
    renderDocs();
    renderPositions();
  }
});

renderLayoutHelp();
renderDocs();
renderPositions();
run();
