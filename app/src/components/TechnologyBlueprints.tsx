import React, { useState } from 'react';
import { Language, Theme } from '../types';
import {
  Layers,
  Code2,
  Workflow,
  FileCheck2,
  Server,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Activity,
  Copy,
  Check,
  Shield,
  Zap,
} from 'lucide-react';

interface TechnologyBlueprintsProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
}

export const TechnologyBlueprints: React.FC<TechnologyBlueprintsProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
}) => {
  const isSepia = theme === 'sepia';
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'odata' | 'rest' | 'rfc'>('odata');
  const [radarThreshold, setRadarThreshold] = useState<number>(0.05);

  const codeSnippets = {
    odata: `// Kiventis Autonomous SAP S/4HANA OData v4 Bridge
import { KiventisConnector, SAPCredentials } from '@kiventis/erp-core';

export async function syncPurchaseOrder(poId: string) {
  const client = new KiventisConnector({
    endpoint: process.env.SAP_ODATA_GATEWAY,
    auth: SAPCredentials.mTLS(),
    airGapped: true,
  });

  const po = await client.purchasing.get({ id: poId });
  const result = await client.reasoningEngine.verifyTolerance(po, {
    maxPriceDeviationPct: 0.05,
    autoClearOnZeroVariance: true,
  });

  return result.status === 'MATCHED'
    ? await client.purchasing.postGoodsReceipt({ id: poId, state: 'CLEARED' })
    : await client.alerting.notifyProcurementLead(result.divergenceReport);
}`,
    rest: `// RESTful Ingest Gateway with Automated Type Invariance
POST /api/v1/inbound-invoice/reconcile
Headers:
  Authorization: Bearer kiventis_sec_live_94812
  X-AirGap-Enclave: de-fra-01

Payload:
{
  "invoiceNumber": "RE-2026-88120",
  "supplierVat": "DE123456789",
  "lines": [
    { "sku": "BG-GA400-01", "qty": 10, "unitPrice": 185.50 }
  ],
  "verificationMode": "AUTONOMOUS_THREE_WAY_MATCH"
}`,
    rfc: `* SAP ABAP RFC Interface Function Module
FUNCTION Z_KIVENTIS_INVOICE_CLEARANCE.
*"----------------------------------------------------------------------
*"  IMPORTING: I_BELNR TYPE BELNR_D, I_GJAHR TYPE GJAHR
*"  EXPORTING: E_STATUS TYPE CHAR10, E_VARIANCE TYPE NETPR
*"----------------------------------------------------------------------
  CALL METHOD /KIVENTIS/CORE_AI=>VALIDATE_WITH_PO
    EXPORTING iv_belnr = i_belnr
    RECEIVING es_audit = e_status.
ENDFUNCTION.`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="blueprints" className={`py-20 md:py-28 border-b transition-colors duration-200 ${
      isSepia
        ? 'bg-[#FAF8F5] border-[#E8E2D6] text-[#18130E]'
        : 'bg-[#0A0E18] border-white/[0.08] text-slate-200'
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-emerald-400 mb-3">
            <Layers className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>TECHNOLOGIE-BLUEPRINTS</span>
          </div>
          <h2 className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isSepia ? 'text-[#18130E]' : 'text-white'
          }`}>
            {lang === 'de'
              ? 'Architektur für produktionsreife KI im Mittelstand'
              : 'Architecture for Enterprise AI in Mid-Sized Business'}
          </h2>
          <p className={`mt-4 text-base sm:text-lg leading-relaxed font-normal ${
            isSepia ? 'text-[#382F26]' : 'text-slate-300'
          }`}>
            {lang === 'de'
              ? 'Keine isolierten Chatbots oder theoretische PoCs. Unsere Technologie-Blueprints verbinden bestehende ERP-Systeme direkt mit intelligenten, autonomen Ausführungsmodulen – wartbar, auditiert und stabil.'
              : 'No isolated toy chatbots or academic PoCs. Our technology blueprints integrate your ERP directly with intelligent, autonomous pipelines – maintainable, audited, and resilient.'}
          </p>
        </div>

        {/* =========================================================================
            ASYMMETRIC BENTO GRID (12 Columns)
            ========================================================================= */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* -------------------------------------------------------------------------
              KACHEL 1 (lg:col-span-7): Autonome ERP-Schnittstellen mit Live-Code-Inspector
              ------------------------------------------------------------------------- */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group transition-all duration-300 ${
            isSepia
              ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-[#0D9488]/40 text-[#18130E]'
              : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-emerald-500/40 text-white'
          }`}>
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-2xl font-black ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>01</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSepia
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  }`}>
                    ERP-INTEGRATION
                  </span>
                </div>
                <Code2 className={`h-5 w-5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              </div>

              <h3 className={`mt-5 text-2xl font-bold transition-colors ${
                isSepia ? 'text-[#18130E] group-hover:text-[#0D9488]' : 'text-white group-hover:text-emerald-300'
              }`}>
                {lang === 'de'
                  ? 'Autonome ERP-Schnittstellen & Daten-Gateways'
                  : 'Autonomous ERP Interfaces & Data Gateways'}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                {lang === 'de'
                  ? 'Verbinden Sie SAP S/4HANA, Microsoft Dynamics 365 oder proALPHA über zertifizierte OData/REST-Adapter. Revisionssichere Datenextraktion ohne Systembrüche oder manuelle Schnittstellenwartung.'
                  : 'Connect SAP S/4HANA, Microsoft Dynamics 365 or proALPHA via certified OData/REST adapters with zero manual schema maintenance.'}
              </p>

              {/* Interactive Code Switcher & Inspector */}
              <div className={`mt-5 rounded-xl border overflow-hidden ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#F4ECE1] text-[#18130E]'
                  : 'border-white/[0.08] bg-[#070A12] text-slate-300'
              }`}>
                <div className={`flex items-center justify-between px-3 py-2 border-b text-xs font-mono ${
                  isSepia ? 'bg-[#EAE0D0] border-[#E0D5C3] text-[#18130E]' : 'bg-black/50 border-white/[0.08]'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveTab('odata')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'odata'
                          ? isSepia ? 'bg-white text-[#0D9488] font-bold shadow-2xs' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      SAP_OData_v4.ts
                    </button>
                    <button
                      onClick={() => setActiveTab('rest')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'rest'
                          ? isSepia ? 'bg-white text-[#0D9488] font-bold shadow-2xs' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      REST_Gateway.json
                    </button>
                    <button
                      onClick={() => setActiveTab('rfc')}
                      className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        activeTab === 'rfc'
                          ? isSepia ? 'bg-white text-[#0D9488] font-bold shadow-2xs' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                          : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ABAP_RFC.abap
                    </button>
                  </div>

                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1 text-[11px] transition-colors cursor-pointer ${
                      isSepia ? 'text-[#7A6B5B] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Code kopieren"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCode ? 'Kopiert' : 'Copy'}</span>
                  </button>
                </div>

                <div className={`p-4 font-mono text-xs overflow-x-auto max-h-56 leading-relaxed ${
                  isSepia ? 'text-[#18130E]' : 'text-slate-300'
                }`}>
                  <pre>
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Micro-Metrics Bar */}
            <div className={`mt-6 pt-4 border-t grid grid-cols-3 gap-2 text-center text-xs font-mono ${
              isSepia ? 'border-[#E8E2D6] text-[#382F26]' : 'border-white/[0.08] text-slate-300'
            }`}>
              <div>
                <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Durchsatz</span>
                <span className={`font-bold text-sm ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>3.8k Req/s</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Latenz</span>
                <span className={`font-bold text-sm ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>18 ms</span>
              </div>
              <div>
                <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Revisionssicherheit</span>
                <span className={`font-bold text-sm ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>100% GoBD</span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------------
              KACHEL 2 (lg:col-span-5): Autonome KI-Workflows & Task-Agenten
              ------------------------------------------------------------------------- */}
          <div className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between shadow-xl group transition-all duration-300 ${
            isSepia
              ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-blue-400/40 text-[#18130E]'
              : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-blue-500/40 text-white'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-2xl font-black ${isSepia ? 'text-blue-700' : 'text-blue-400'}`}>02</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSepia
                      ? 'bg-blue-50 border border-blue-200 text-blue-800'
                      : 'bg-blue-500/10 border border-blue-500/30 text-blue-300'
                  }`}>
                    AUTONOME WORKFLOWS
                  </span>
                </div>
                <Workflow className={`h-5 w-5 ${isSepia ? 'text-blue-700' : 'text-blue-400'}`} />
              </div>

              <h3 className={`mt-5 text-2xl font-bold transition-colors ${
                isSepia ? 'text-[#18130E] group-hover:text-blue-700' : 'text-white group-hover:text-blue-300'
              }`}>
                {lang === 'de'
                  ? 'Intelligente Task-Agenten ohne Coding-Backlog'
                  : 'Intelligent Task Agents without Dev Backlog'}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                {lang === 'de'
                  ? 'Fachabteilungen definieren Geschäftsausnahmen in natürlicher Sprache. Die KI vergleicht Bestelldaten, validiert Stücklisten und führt Buchungen autonom aus.'
                  : 'Domain experts define business exceptions in natural language. The AI reconciles POs, validates BOMs, and executes ERP actions autonomously.'}
              </p>

              {/* Visual Task Pipeline Card */}
              <div className="mt-5 space-y-2.5">
                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                  isSepia ? 'border-[#E8E2D6] bg-[#FAF8F5] text-[#18130E]' : 'border-white/[0.06] bg-black/30 text-white'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-6 w-6 rounded-md font-bold flex items-center justify-center text-[10px] ${
                      isSepia ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      1
                    </span>
                    <span>Belegeingang &amp; Schema-Extraktion</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>14ms</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono shadow-xs ${
                  isSepia ? 'border-blue-200 bg-blue-50/60 text-blue-950' : 'border-blue-500/30 bg-blue-500/[0.07] text-blue-200'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-6 w-6 rounded-md font-bold flex items-center justify-center text-[10px] ${
                      isSepia ? 'bg-blue-200 text-blue-900' : 'bg-blue-500/30 text-blue-300'
                    }`}>
                      2
                    </span>
                    <span className="font-semibold">Lokaler RAG-Abgleich gegen Stammdaten</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${isSepia ? 'text-blue-800' : 'text-blue-400'}`}>42ms</span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-mono ${
                  isSepia ? 'border-[#E8E2D6] bg-[#FAF8F5] text-[#18130E]' : 'border-white/[0.06] bg-black/30 text-white'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <span className={`h-6 w-6 rounded-md font-bold flex items-center justify-center text-[10px] ${
                      isSepia ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      3
                    </span>
                    <span>Autonome Verbuchung &amp; Audit-Log</span>
                  </div>
                  <span className={`text-[11px] font-semibold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>OK (201)</span>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
            }`}>
              <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>Zykluszeit pro Vorgang</span>
              <span className={`font-bold text-sm ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>Ø 1,4 Sekunden</span>
            </div>
          </div>

          {/* -------------------------------------------------------------------------
              KACHEL 3 (lg:col-span-5): E-Invoicing & 3-Wege-Abgleich (Diskrepanz-Radar)
              ------------------------------------------------------------------------- */}
          <div className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between shadow-xl group transition-all duration-300 ${
            isSepia
              ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-[#0D9488]/40 text-[#18130E]'
              : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-teal-500/40 text-white'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-2xl font-black ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`}>03</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSepia
                      ? 'bg-teal-50 border border-teal-200 text-teal-800'
                      : 'bg-teal-500/10 border border-teal-500/30 text-teal-300'
                  }`}>
                    E-INVOICING &amp; COMPLIANCE
                  </span>
                </div>
                <FileCheck2 className={`h-5 w-5 ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`} />
              </div>

              <h3 className={`mt-5 text-2xl font-bold transition-colors ${
                isSepia ? 'text-[#18130E] group-hover:text-[#0D9488]' : 'text-white group-hover:text-teal-300'
              }`}>
                {lang === 'de'
                  ? 'Intelligenter 3-Wege-Rechnungsabgleich'
                  : 'Intelligent 3-Way Invoice Reconciliation'}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                {lang === 'de'
                  ? 'Automatisierter Soll/Ist-Vergleich von Bestellung (PO), Wareneingang (Lieferschein) und Rechnung. Zentimetergenaue Toleranzprüfung bei Teillieferungen.'
                  : 'Automated 3-way match between PO, delivery note, and invoice with granular tolerance thresholds.'}
              </p>

              {/* Interactive Discrepancy Radar Preview */}
              <div className={`mt-5 p-4 rounded-xl border font-mono text-xs ${
                isSepia ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#18130E]' : 'border-white/[0.08] bg-black/40 text-slate-300'
              }`}>
                <div className={`flex items-center justify-between pb-2 border-b text-[11px] ${
                  isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
                }`}>
                  <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>PO-981240 vs. RE-2026-44</span>
                  <span className={`font-bold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>100% MATCH</span>
                </div>

                <div className="mt-3 space-y-2 text-[11px]">
                  <div className={`flex justify-between items-center ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                    <span>1. Bestellmenge (PO):</span>
                    <span className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>25 Stk · 380,00 €</span>
                  </div>
                  <div className={`flex justify-between items-center ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                    <span>2. Wareneingang (WE):</span>
                    <span className={`font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>25 Stk gebucht</span>
                  </div>
                  <div className={`flex justify-between items-center ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                    <span>3. Rechnungssumme:</span>
                    <span className={`font-bold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>9.500,00 € (0,00 € Diff)</span>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] ${
                  isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.06]'
                }`}>
                  <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>ZUGFeRD 2.2 / XRechnung</span>
                  <span className={`font-bold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>Auto-Freigabe erteilt</span>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-mono ${
              isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
            }`}>
              <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>Dunkelbuchungsquote</span>
              <span className={`font-bold text-sm ${isSepia ? 'text-[#0D9488]' : 'text-teal-300'}`}>Bis zu 84 %</span>
            </div>
          </div>

          {/* -------------------------------------------------------------------------
              KACHEL 4 (lg:col-span-7): Sovereign AI & On-Premise LLM
              ------------------------------------------------------------------------- */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 flex flex-col justify-between shadow-xl group transition-all duration-300 ${
            isSepia
              ? 'border-[#E0D5C3] bg-[#FFFFFF] hover:border-[#0D9488]/40 text-[#18130E]'
              : 'border-white/[0.12] bg-[#0E1524]/90 hover:border-emerald-500/40 text-white'
          }`}>
            <div>
              <div className={`flex items-center justify-between pb-4 border-b ${isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'}`}>
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-2xl font-black ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>04</span>
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSepia
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  }`}>
                    DATENSOUVERÄNITÄT &amp; AIR-GAP
                  </span>
                </div>
                <Server className={`h-5 w-5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              </div>

              <h3 className={`mt-5 text-2xl font-bold transition-colors ${
                isSepia ? 'text-[#18130E] group-hover:text-[#0D9488]' : 'text-white group-hover:text-emerald-300'
              }`}>
                {lang === 'de'
                  ? 'Lokale RAG & On-Premise LLM Architekturen'
                  : 'Local RAG & On-Premise LLM Architectures'}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                {lang === 'de'
                  ? 'Vollständige Datensouveränität: Keine sensiblen Konstruktions-, Preis- oder Kundendaten verlassen jemals Ihre eigene Infrastruktur. Lauffähig auf lokalen GPU-Appliances oder in Ihrer ISO-27001 zertifizierten Private Cloud.'
                  : 'Total data sovereignty: No sensitive CAD, pricing, or customer data ever leaves your perimeter. Operates on local GPU servers or private clouds.'}
              </p>

              {/* Air-Gap Architecture Map */}
              <div className={`mt-5 p-4 rounded-xl border font-mono text-xs ${
                isSepia
                  ? 'border-[#A7F3D0] bg-[#EBF7F4] text-[#18130E]'
                  : 'border-emerald-500/20 bg-emerald-950/20 text-white'
              }`}>
                <div className={`flex items-center justify-between pb-2 border-b text-[11px] ${
                  isSepia ? 'border-[#A7F3D0]' : 'border-emerald-500/20'
                }`}>
                  <span className={`font-bold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>100% PRIVATE DATA ENCLAVE</span>
                  <span className={`text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>0 BYTE US-CLOUD</span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className={`p-2.5 rounded border ${
                    isSepia ? 'bg-[#FFFFFF] border-[#E0D5C3] text-[#18130E]' : 'bg-black/40 border-white/[0.06] text-white'
                  }`}>
                    <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Infrastruktur</span>
                    <span className="font-bold">On-Premise / Bare Metal</span>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    isSepia ? 'bg-[#FFFFFF] border-[#E0D5C3] text-[#18130E]' : 'bg-black/40 border-white/[0.06] text-white'
                  }`}>
                    <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Open-Weights LLMs</span>
                    <span className={`font-bold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-300'}`}>Qwen 2.5 / DeepSeek R1</span>
                  </div>
                  <div className={`p-2.5 rounded border ${
                    isSepia ? 'bg-[#FFFFFF] border-[#E0D5C3] text-[#18130E]' : 'bg-black/40 border-white/[0.06] text-white'
                  }`}>
                    <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}`}>Rechtssicherheit</span>
                    <span className={`font-bold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-300'}`}>EU AI Act Art. 4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
              isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
            }`}>
              <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>DSGVO &amp; Geschäftsgeheimnisgesetz: 100% erfüllt</span>
              <button
                onClick={onOpenBooking}
                className={`inline-flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                  isSepia ? 'text-[#0D9488] hover:text-[#0F766E]' : 'text-emerald-400 hover:text-emerald-300'
                }`}
              >
                <span>Architektur-Audit anfragen</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
