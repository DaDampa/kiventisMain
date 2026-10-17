import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import {
  ArrowRight,
  Database,
  Cpu,
  Workflow,
  Shield,
  Layers,
  Sparkles,
  FileCheck2,
  RefreshCw,
  Server,
  Zap,
  CheckCircle2,
  Lock,
  ChevronRight,
  Code2,
  Sliders,
  Play,
  Pause,
  Terminal,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface HeroProps {
  lang: Language;
  theme?: Theme;
  onOpenBooking: () => void;
  onOpenResource: () => void;
}

type PipelineStepId = '01-input' | '02-rag' | '03-vibe-app' | '04-erp-sync';
type ModelOption = 'qwen' | 'deepseek' | 'mistral' | 'gemma';

export const Hero: React.FC<HeroProps> = ({
  lang,
  theme = 'dark',
  onOpenBooking,
  onOpenResource,
}) => {
  const isSepia = theme === 'sepia';
  const [activeStep, setActiveStep] = useState<PipelineStepId>('02-rag');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [processedCount, setProcessedCount] = useState<number>(14280);
  const [activeModel, setActiveModel] = useState<ModelOption>('qwen');
  const [activeTab, setActiveTab] = useState<'payload' | 'execution' | 'telemetry'>('payload');

  // Increment simulated counter
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setProcessedCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, [isSimulating]);

  const modelLabels: Record<ModelOption, string> = {
    qwen: 'Qwen 2.5-Coder (32B)',
    deepseek: 'DeepSeek R1 / V3',
    mistral: 'Mistral-Large (Sovereign)',
    gemma: 'Gemma-2 (27B Local)',
  };

  const stepsData: Record<PipelineStepId, {
    number: string;
    title: string;
    subtitle: string;
    category: string;
    latency: string;
    security: string;
    kpi: string;
    payloadSnippet: string;
    executionLog: string;
    telemetry: {
      memoryUsed: string;
      throughput: string;
      airGapStatus: string;
      complianceHash: string;
    };
  }> = {
    '01-input': {
      number: '01',
      title: lang === 'de' ? 'Unstructured ERP & CAD Input' : 'Unstructured ERP & CAD Ingestion',
      subtitle: lang === 'de' ? 'ZUGFeRD 2.2, XRechnung, CAD-Spezifikationen, SAP/proALPHA Tabellen' : 'ZUGFeRD 2.2, XRechnung, CAD PDF specs & SAP/proALPHA tables',
      category: 'DATA INGESTION & PARSING',
      latency: '24ms',
      security: 'TLS 1.3 / mTLS / Zero-Retention Memory Buffer',
      kpi: '99.9% Schema-Validierung ohne Datenverlust',
      payloadSnippet: `// 01 INGESTION ENGINE: MULTI-FORMAT SCHEMA VALIDATOR
{
  "source_channel": "SAP_S4_IDOC_AND_ZUGFERD_INBOX",
  "document_id": "DOC-2026-X8849",
  "detected_format": "ZUGFeRD_2.2_EXTENDED_PROFILE",
  "cad_attachments": ["baugruppe_antriebswelle_rev4.dwg.pdf"],
  "validation_rules_checked": 24,
  "schema_conformance": "VALIDATED_100_PERCENT",
  "pii_scrubbed": true
}`,
      executionLog: `[00:00.004] INGEST: Inbound webhook received from ERP gateway
[00:00.009] PARSER: Extracted XML stream & verified ISO-19884 syntax
[00:00.016] OCR_CAD: Deep vectorized OCR indexed 14 drawing dimensions
[00:00.024] SECURITY: PII scrubbed in RAM enclave (0 byte written to disk)`,
      telemetry: {
        memoryUsed: '64 MB RAM',
        throughput: '1,420 docs/min',
        airGapStatus: '100% In-Memory Protected',
        complianceHash: 'SHA256:7f92a188...gobd',
      },
    },
    '02-rag': {
      number: '02',
      title: lang === 'de' ? 'Sovereign Local RAG' : 'Sovereign Local RAG Enclave',
      subtitle: lang === 'de' ? 'Qdrant Vektor-Indexierung hinter Firmen-Firewall · 0 Byte US-Cloud-Abfluss' : 'Qdrant vector indexation behind corporate firewall · 0 byte external transfer',
      category: 'AIR-GAPPED VECTOR RETRIEVAL',
      latency: '38ms',
      security: 'Isoliertes LAN / Air-Gapped / AES-256 Enklave',
      kpi: '100% DSGVO & Geschäftsgeheimnisgesetz erfüllt',
      payloadSnippet: `// 02 SOVEREIGN RAG: VECTOR SEARCH VIA LOCAL QDRANT
{
  "inference_model": "${modelLabels[activeModel]}",
  "vector_db": "Qdrant_Local_Enclave_v1.12",
  "collection": "corporate_bom_and_pricing_rules",
  "query_embedding_dimension": 1536,
  "cosine_similarity_top_k": 5,
  "highest_score": 0.984,
  "outbound_internet_traffic_bytes": 0,
  "encryption": "AES_256_GCM_HARDWARE_BACKED"
}`,
      executionLog: `[00:00.026] RAG_INIT: Local vector search dispatched to Qdrant enclave
[00:00.031] EMBED: Computed 1536-dim tensor via local sentence-transformer
[00:00.035] RETRIEVAL: Top 5 procurement agreements extracted (Score: 0.984)
[00:00.038] AUDIT: 0 bytes external telemetry transmitted across firewall`,
      telemetry: {
        memoryUsed: '2.4 GB VRAM',
        throughput: '18ms latency',
        airGapStatus: 'Air-Gapped (0 Byte Cloud)',
        complianceHash: 'SHA256:4b22c809...rag',
      },
    },
    '03-vibe-app': {
      number: '03',
      title: lang === 'de' ? 'Vibe Coding Micro-App mit Staging-Schutz' : 'Vibe Coding Micro-App with ERP Staging',
      subtitle: lang === 'de' ? 'Autonome 3-Wege-Toleranzprüfung & Stücklistenkalkulation in sicherer Sandbox' : 'Autonomous 3-way matching & BOM calculation in isolated staging sandbox',
      category: 'CITIZEN DEV & BUSINESS REASONING',
      latency: '112ms',
      security: 'Sandbox-Container mit Read-Only ERP-Replikation',
      kpi: 'Fehlerrate sinkt von 8.4% auf unter 0.3%',
      payloadSnippet: `// 03 VIBE CODING MICRO-APP: AUTONOMOUS VERIFICATION
{
  "app_context": "BOM_AND_INVOICE_VARIANCE_RADAR",
  "built_by": "Fachkraft Disposition / Citizen Developer",
  "applied_tolerance_pct": 0.05,
  "discrepancy_detected": false,
  "calculated_variance_eur": 0.00,
  "rules_checked": [
    "TEUERUNGSZUSCHLAG_VALIDIERT",
    "MENGEN_ABGLEICH_BESTELLUNG_WARENEINGANG",
    "SKONTO_FRIST_30_TAGE_NETTO"
  ],
  "staging_status": "APPROVED_FOR_ERP_COMMIT"
}`,
      executionLog: `[00:00.042] SANDBOX: Triggered Docker micro-app runtime (Node.js/React)
[00:00.068] REASONING: Executed 3-way line item match against PO #981240
[00:00.095] RULE_CHECK: Zero unit price divergence; discount terms verified
[00:00.112] STAGING: Prepared atomic commit token for ERP writeback`,
      telemetry: {
        memoryUsed: '128 MB Sandbox',
        throughput: 'Sub-second match',
        airGapStatus: 'Read-Only Staging Protected',
        complianceHash: 'SHA256:a901fd77...sandbox',
      },
    },
    '04-erp-sync': {
      number: '04',
      title: lang === 'de' ? 'Validated ERP Sync & -87% Durchlaufzeit' : 'Validated ERP Sync & -87% Cycle Time',
      subtitle: lang === 'de' ? 'Revisionssichere OData-Rückübertragung an SAP S/4HANA oder Dynamics 365' : 'Audit-proof synchronous OData writeback to SAP S/4HANA or Dynamics 365',
      category: 'SYSTEM SYNCHRONIZATION & GOBD AUDIT',
      latency: '46ms',
      security: 'SAP NetWeaver OAuth2 / Signed Commit with Rollback',
      kpi: 'Ø 87% schnellere Durchlaufzeit (von 45 auf 6 Min.)',
      payloadSnippet: `// 04 TRANSACTION COMMIT: SYNCHRONOUS ERP SYNC
{
  "target_system": "SAP_S4HANA_ODATA_V4",
  "endpoint": "POST /sap/opu/odata/sap/API_PURCHASING",
  "sap_document_number": "5100098412",
  "http_status": 201,
  "commit_state": "PERSISTENT_COMMITTED",
  "audit_trail": {
    "gobd_compliant": true,
    "eu_ai_act_art_4_certified": true,
    "certified_operator": "CitizenDev_DeptLead_AV"
  },
  "measured_time_saved_minutes": 39
}`,
      executionLog: `[00:00.115] ODATA_CONNECT: Mutual TLS handshake with SAP Gateway established
[00:00.134] WRITEBACK: Posted goods receipt & approved invoice for batch run
[00:00.150] ERP_RESPONSE: 201 Created (Doc ID 5100098412 recorded)
[00:00.161] COMPLETE: Cycle time reduced by 87% vs manual ERP entry`,
      telemetry: {
        memoryUsed: '32 MB Network IO',
        throughput: '46ms roundtrip',
        airGapStatus: 'Signed TLS 1.3 Pipe',
        complianceHash: 'SHA256:c023bf89...sap-sync',
      },
    },
  };

  const currentStepInfo = stepsData[activeStep];

  return (
    <section className={`relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28 border-b transition-colors duration-200 ${
      isSepia
        ? 'bg-[#FAF8F5] border-[#E8E2D6] text-[#18130E]'
        : 'bg-[#0B0F17] border-white/[0.08] text-slate-200'
    }`}>
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex justify-center">
        <div className={`w-[1200px] h-[650px] bg-gradient-to-b blur-3xl opacity-80 ${
          isSepia
            ? 'from-teal-600/[0.06] via-emerald-600/[0.04] to-transparent'
            : 'from-blue-600/[0.08] via-emerald-500/[0.06] to-transparent'
        }`} />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Heritage Badge: Clear Enterprise Positioning */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium mb-5">
          <span className={`font-bold flex items-center gap-1.5 px-3 py-1 rounded-full border ${
            isSepia
              ? 'bg-[#0D9488]/10 border-[#0D9488]/30 text-[#0D9488]'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          }`}>
            <span className={`h-2 w-2 rounded-full inline-block animate-ping ${isSepia ? 'bg-[#0D9488]' : 'bg-emerald-400'}`} />
            {lang === 'de'
              ? '25+ JAHRE ERP-PROZESSBERATUNG · 250+ INDUSTRIE-PROJEKTE'
              : '25+ YEARS ERP PROCESS EXPERTISE · 250+ INDUSTRIAL DEPLOYMENTS'}
          </span>
          <span className={isSepia ? 'text-[#D0C4B2]' : 'text-slate-600'}>/</span>
          <span className={isSepia ? 'text-[#382F26]' : 'text-slate-300'}>
            DACH &amp; APAC
          </span>
        </div>

        {/* Hero Headline & Subheadline */}
        <div className="max-w-4xl">
          <h1 className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-balance ${
            isSepia ? 'text-[#18130E]' : 'text-white'
          }`}>
            {lang === 'de' ? (
              <>
                Nahtlose ERP-Integration &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500">
                  autonome KI-Workflows
                </span>{' '}
                für den Mittelstand.
              </>
            ) : (
              <>
                Seamless ERP Integration &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500">
                  Autonomous AI Workflows
                </span>{' '}
                for Mid-Sized Enterprise.
              </>
            )}
          </h1>

          <p className={`mt-6 text-lg sm:text-xl leading-relaxed max-w-3xl font-normal text-balance ${
            isSepia ? 'text-[#382F26]' : 'text-slate-300'
          }`}>
            {lang === 'de'
              ? 'Die Schnittstelle aus 25+ Jahren praxiserprobter ERP-Prozessberatung (250+ Projekte in DACH & APAC) und moderner KI- & Vibe-Coding-Umsetzung: Wir verbinden SAP, Microsoft Dynamics, proALPHA & Legacy-Systeme mit produktionsreifen, audit-sicheren KI-Pipelines. 100% On-Premise/Private-Cloud, messbarer ROI und Live-Einsatz in unter 14 Tagen.'
              : 'The intersection of 25+ years of hardened ERP consulting (250+ deployments in DACH & APAC) and cutting-edge AI & Vibe Coding: Connect SAP, Microsoft Dynamics, proALPHA & legacy systems with audited, autonomous pipelines. 100% on-premise/private cloud, verified ROI, and turnkey go-live in under 14 days.'}
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenBooking}
              className={`inline-flex items-center justify-center gap-2.5 rounded-lg font-bold text-sm sm:text-base px-6 py-3.5 transition-all whitespace-nowrap cursor-pointer shadow-lg ${
                isSepia
                  ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-[#0D9488]/20'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-[#090D14] shadow-emerald-500/20 hover:shadow-emerald-500/35'
              }`}
            >
              <span>{lang === 'de' ? 'Potenzial analysieren' : 'Analyze Automation Potential'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href="#blueprints"
              className={`inline-flex items-center justify-center gap-2 rounded-lg border font-semibold text-sm sm:text-base px-5 py-3.5 transition-colors whitespace-nowrap cursor-pointer ${
                isSepia
                  ? 'border-[#D5C9B7] bg-white text-[#18130E] hover:bg-[#F3ECE1] shadow-2xs'
                  : 'border-white/[0.14] bg-white/[0.04] text-white hover:bg-white/[0.08]'
              }`}
            >
              <Workflow className={`h-4 w-4 ${isSepia ? 'text-[#0D9488]' : 'text-teal-400'}`} />
              <span>{lang === 'de' ? 'Unsere Technologie-Blueprints' : 'Our Technology Blueprints'}</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono">
            <div className={`flex items-center gap-1.5 ${isSepia ? 'text-[#2D241C]' : 'text-slate-300'}`}>
              <CheckCircle2 className={`h-3.5 w-3.5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              <span>0% Vendor Lock-in</span>
            </div>
            <span className={isSepia ? 'text-[#D0C4B2]' : 'text-slate-700'}>·</span>
            <div className={`flex items-center gap-1.5 ${isSepia ? 'text-[#2D241C]' : 'text-slate-300'}`}>
              <CheckCircle2 className={`h-3.5 w-3.5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              <span>EU AI Act Art. 4 konform</span>
            </div>
            <span className={isSepia ? 'text-[#D0C4B2]' : 'text-slate-700'}>·</span>
            <div className={`flex items-center gap-1.5 ${isSepia ? 'text-[#2D241C]' : 'text-slate-300'}`}>
              <CheckCircle2 className={`h-3.5 w-3.5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
              <span>Qwen 2.5 / DeepSeek R1 / Mistral / Gemma</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE 4-STEP EXECUTION PIPELINE (HERO AHA-MOMENT)
            ========================================================================= */}
        <div className={`mt-14 rounded-2xl border p-5 sm:p-7 lg:p-8 shadow-2xl relative transition-colors duration-200 ${
          isSepia
            ? 'border-[#E0D5C3] bg-[#FFFFFF] text-[#18130E]'
            : 'border-white/[0.08] bg-[#0E1524]/90 backdrop-blur-xl text-slate-200'
        }`}>
          {/* Component Top Status Bar & Model Switcher */}
          <div className={`flex flex-col md:flex-row md:items-center justify-between pb-5 border-b gap-4 ${
            isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                isSepia
                  ? 'bg-emerald-50 border border-emerald-300 text-[#0D9488]'
                  : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              }`}>
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-xs font-bold tracking-wider ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}>
                    KIVENTIS 4-STEP EXECUTION PIPELINE
                  </span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isSepia
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                  }`}>
                    LIVE ORCHESTRATION
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {lang === 'de'
                    ? 'Klicken Sie auf einen der 4 Pipeline-Schritte, um den technischen Ablauf im Terminal einzusehen.'
                    : 'Click any of the 4 execution pipeline steps below to inspect live telemetry and code.'}
                </p>
              </div>
            </div>

            {/* Simulation Controls & Model Selector */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5] text-[#18130E]'
                  : 'border-white/[0.08] bg-black/40 text-slate-300'
              }`}>
                <span className={isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}>
                  {lang === 'de' ? 'Durchsatz:' : 'Processed:'}
                </span>
                <span className={`font-bold tabular-nums ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>
                  {processedCount.toLocaleString()} {lang === 'de' ? 'Vorgänge (Ø/Monat)' : 'records (avg./month)'}
                </span>
              </div>

              {/* Modern 2026 Open-Weights Model Switcher */}
              <div className={`flex items-center gap-1 p-1 rounded-lg border text-[11px] font-mono ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#FAF8F5]'
                  : 'border-white/[0.08] bg-black/40'
              }`}>
                <button
                  onClick={() => setActiveModel('qwen')}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    activeModel === 'qwen'
                      ? isSepia ? 'bg-[#0D9488]/15 text-[#0D9488] font-bold' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Qwen 2.5-Coder 32B"
                >
                  Qwen 2.5
                </button>
                <button
                  onClick={() => setActiveModel('deepseek')}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    activeModel === 'deepseek'
                      ? isSepia ? 'bg-[#0D9488]/15 text-[#0D9488] font-bold' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="DeepSeek R1 / V3 Reasoning"
                >
                  DeepSeek R1
                </button>
                <button
                  onClick={() => setActiveModel('mistral')}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    activeModel === 'mistral'
                      ? isSepia ? 'bg-[#0D9488]/15 text-[#0D9488] font-bold' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Mistral-Large Sovereign"
                >
                  Mistral
                </button>
                <button
                  onClick={() => setActiveModel('gemma')}
                  className={`px-2 py-1 rounded transition-colors cursor-pointer ${
                    activeModel === 'gemma'
                      ? isSepia ? 'bg-[#0D9488]/15 text-[#0D9488] font-bold' : 'bg-emerald-500/20 text-emerald-300 font-bold'
                      : isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Gemma-2 27B Local"
                >
                  Gemma 2
                </button>

                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`p-1 transition-colors cursor-pointer ml-1 ${
                    isSepia ? 'text-[#6B5D4E] hover:text-[#18130E]' : 'text-slate-400 hover:text-white'
                  }`}
                  title={isSimulating ? 'Pause stream' : 'Resume stream'}
                >
                  {isSimulating ? (
                    <Pause className={`h-3.5 w-3.5 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                  ) : (
                    <Play className="h-3.5 w-3.5 text-amber-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 4-Step Execution Pipeline Grid (01 -> 02 -> 03 -> 04) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 01: Unstructured ERP/CAD Input */}
            <button
              onClick={() => setActiveStep('01-input')}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                activeStep === '01-input'
                  ? isSepia
                    ? 'border-blue-500 bg-blue-50/90 shadow-lg shadow-blue-500/10 -translate-y-1'
                    : 'border-blue-500 bg-blue-500/15 shadow-lg shadow-blue-500/15 -translate-y-1'
                  : isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5] hover:border-blue-400 hover:bg-[#F2ECE0]'
                    : 'border-white/[0.08] bg-black/30 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xl font-black text-blue-400">01</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isSepia ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  INGEST
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-400 shrink-0" />
                  <h4 className={`text-sm font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                    {lang === 'de' ? 'Unstructured ERP/CAD Input' : 'Unstructured ERP/CAD Input'}
                  </h4>
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {lang === 'de'
                    ? 'ZUGFeRD 2.2, XRechnung, CAD-Spezifikationen & Legacy-DBs'
                    : 'ZUGFeRD 2.2, XRechnung, CAD drawings & legacy tables'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}>Latenz: 24ms</span>
                <span className={`font-semibold ${isSepia ? 'text-blue-700' : 'text-blue-400'}`}>
                  Type-Safe
                </span>
              </div>
            </button>

            {/* Step 02: Sovereign Local RAG */}
            <button
              onClick={() => setActiveStep('02-rag')}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                activeStep === '02-rag'
                  ? isSepia
                    ? 'border-[#0D9488] bg-teal-50/90 shadow-lg shadow-teal-500/10 -translate-y-1'
                    : 'border-teal-400 bg-teal-500/15 shadow-lg shadow-teal-500/15 -translate-y-1'
                  : isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5] hover:border-[#0D9488]/40 hover:bg-[#F2ECE0]'
                    : 'border-white/[0.08] bg-black/30 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xl font-black text-teal-400">02</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isSepia ? 'bg-teal-100 text-teal-800' : 'bg-teal-500/20 text-teal-300'
                }`}>
                  AIR-GAP
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-teal-400 shrink-0" />
                  <h4 className={`text-sm font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                    {lang === 'de' ? 'Sovereign Local RAG' : 'Sovereign Local RAG'}
                  </h4>
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {lang === 'de'
                    ? 'Isolierte Qdrant-Vektordatenbank & 0 Byte US-Cloud-Abfluss'
                    : 'Isolated local Qdrant vectors & 0 bytes external telemetry'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}>Latenz: 38ms</span>
                <span className={`font-semibold ${isSepia ? 'text-teal-700' : 'text-teal-400'}`}>
                  0% Cloud Leak
                </span>
              </div>
            </button>

            {/* Step 03: Vibe Coding Micro-App mit Staging-Schutz */}
            <button
              onClick={() => setActiveStep('03-vibe-app')}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                activeStep === '03-vibe-app'
                  ? isSepia
                    ? 'border-amber-500 bg-amber-50/90 shadow-lg shadow-amber-500/10 -translate-y-1'
                    : 'border-amber-400 bg-amber-500/15 shadow-lg shadow-amber-500/15 -translate-y-1'
                  : isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5] hover:border-amber-400 hover:bg-[#F2ECE0]'
                    : 'border-white/[0.08] bg-black/30 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xl font-black text-amber-400">03</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isSepia ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  SANDBOX
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <h4 className={`text-sm font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                    {lang === 'de' ? 'Vibe Coding Micro-App' : 'Vibe Coding Micro-App'}
                  </h4>
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {lang === 'de'
                    ? 'Fachbereichs-Logik mit ERP-Staging-Schutz & Sandbox-Validierung'
                    : 'Domain-specific logic with ERP staging & sandbox validation'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}>Latenz: 112ms</span>
                <span className={`font-semibold ${isSepia ? 'text-amber-700' : 'text-amber-400'}`}>
                  Staging Shield
                </span>
              </div>
            </button>

            {/* Step 04: Validated ERP Sync & -87% Durchlaufzeit */}
            <button
              onClick={() => setActiveStep('04-erp-sync')}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                activeStep === '04-erp-sync'
                  ? isSepia
                    ? 'border-emerald-600 bg-emerald-50/90 shadow-lg shadow-emerald-600/10 -translate-y-1'
                    : 'border-emerald-400 bg-emerald-500/15 shadow-lg shadow-emerald-500/15 -translate-y-1'
                  : isSepia
                    ? 'border-[#E0D5C3] bg-[#FAF8F5] hover:border-emerald-500/40 hover:bg-[#F2ECE0]'
                    : 'border-white/[0.08] bg-black/30 hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="font-mono text-xl font-black text-emerald-400">04</span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                  isSepia ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  ERP SYNC
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-emerald-400 shrink-0" />
                  <h4 className={`text-sm font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                    {lang === 'de' ? 'Validated ERP Sync (-87%)' : 'Validated ERP Sync (-87%)'}
                  </h4>
                </div>
                <p className={`text-xs mt-1.5 line-clamp-2 ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {lang === 'de'
                    ? 'Synchroner OData/RFC-Schreiblauf mit GoBD-Audit-Dokumentation'
                    : 'Synchronous OData/RFC writeback with GoBD audit logs'}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}>Latenz: 46ms</span>
                <span className={`font-semibold ${isSepia ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  -87% Zeit
                </span>
              </div>
            </button>
          </div>

          {/* Interactive Inspector Terminal Panel */}
          <div className={`mt-8 pt-6 border-t grid grid-cols-1 lg:grid-cols-12 gap-6 items-start ${
            isSepia ? 'border-[#E8E2D6]' : 'border-white/[0.08]'
          }`}>
            {/* Left: Step Context & Technical Metadata */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold ${
                  isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                }`}>
                  STEP {currentStepInfo.number} · {currentStepInfo.category}
                </span>
                <span className={isSepia ? 'text-[#A89A8A]' : 'text-slate-600'}>·</span>
                <span className={`text-xs font-mono ${isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}`}>
                  {currentStepInfo.latency}
                </span>
              </div>

              <h4 className={`text-xl font-bold ${isSepia ? 'text-[#18130E]' : 'text-white'}`}>
                {currentStepInfo.title}
              </h4>
              <p className={`text-xs leading-relaxed ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                {currentStepInfo.subtitle}
              </p>

              {/* Security & KPI highlights */}
              <div className="pt-2 space-y-2 text-xs font-mono">
                <div className={`flex items-center gap-2 ${isSepia ? 'text-[#382F26]' : 'text-slate-300'}`}>
                  <Lock className={`h-3.5 w-3.5 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                  <span>Sicherheit: {currentStepInfo.security}</span>
                </div>
                <div className={`flex items-center gap-2 font-semibold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-300'}`}>
                  <Sparkles className={`h-3.5 w-3.5 shrink-0 ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`} />
                  <span>Messbarer Benchmark: {currentStepInfo.kpi}</span>
                </div>
              </div>

              {/* Telemetry Quick Badges */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className={`p-2 rounded border ${
                  isSepia ? 'bg-[#FAF8F5] border-[#E0D5C3]' : 'bg-black/40 border-white/[0.06]'
                }`}>
                  <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}`}>Enklave-Speicher</span>
                  <span className="font-bold">{currentStepInfo.telemetry.memoryUsed}</span>
                </div>
                <div className={`p-2 rounded border ${
                  isSepia ? 'bg-[#FAF8F5] border-[#E0D5C3]' : 'bg-black/40 border-white/[0.06]'
                }`}>
                  <span className={`block text-[10px] ${isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}`}>Air-Gap Status</span>
                  <span className={`font-bold ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>
                    {currentStepInfo.telemetry.airGapStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Code & Execution Terminal */}
            <div className={`lg:col-span-7 rounded-xl border p-4 font-mono text-[11px] shadow-sm ${
              isSepia
                ? 'border-[#E0D5C3] bg-[#F4ECE1] text-[#18130E]'
                : 'border-white/[0.08] bg-[#070A12] text-slate-300 shadow-inner'
            }`}>
              {/* Terminal Tab Bar */}
              <div className={`flex items-center justify-between pb-2.5 mb-2.5 border-b text-[10px] ${
                isSepia ? 'border-[#E0D5C3] text-[#5A4D3F]' : 'border-white/[0.08] text-slate-400'
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  <div className="ml-2 flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab('payload')}
                      className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                        activeTab === 'payload'
                          ? isSepia ? 'bg-[#FFFFFF] text-[#18130E]' : 'bg-white/10 text-white'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      payload.json
                    </button>
                    <button
                      onClick={() => setActiveTab('execution')}
                      className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                        activeTab === 'execution'
                          ? isSepia ? 'bg-[#FFFFFF] text-[#18130E]' : 'bg-white/10 text-white'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      execution.log
                    </button>
                    <button
                      onClick={() => setActiveTab('telemetry')}
                      className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                        activeTab === 'telemetry'
                          ? isSepia ? 'bg-[#FFFFFF] text-[#18130E]' : 'bg-white/10 text-white'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      telemetry.conf
                    </button>
                  </div>
                </div>

                <span className={`font-mono font-bold text-[10px] ${isSepia ? 'text-[#0D9488]' : 'text-emerald-400'}`}>
                  ● AIR-GAP ENCLAVE ACTIVE
                </span>
              </div>

              {/* Terminal Content */}
              <div className="min-h-[170px] max-h-[220px] overflow-y-auto">
                {activeTab === 'payload' && (
                  <pre className={`leading-relaxed text-[11px] ${isSepia ? 'text-[#18130E]' : 'text-slate-300'}`}>
                    <code>{currentStepInfo.payloadSnippet}</code>
                  </pre>
                )}

                {activeTab === 'execution' && (
                  <pre className={`leading-relaxed text-[11px] font-mono ${isSepia ? 'text-[#2D241C]' : 'text-emerald-300'}`}>
                    <code>{currentStepInfo.executionLog}</code>
                  </pre>
                )}

                {activeTab === 'telemetry' && (
                  <div className="space-y-2 text-[11px] font-mono pt-1">
                    <div className="flex items-center justify-between pb-1 border-b border-white/[0.05]">
                      <span className={isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}>Active Local Inference Model:</span>
                      <span className="font-bold text-teal-400">{modelLabels[activeModel]}</span>
                    </div>
                    <div className="flex items-center justify-between pb-1 border-b border-white/[0.05]">
                      <span className={isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}>RAM / VRAM Allocation:</span>
                      <span className="font-bold">{currentStepInfo.telemetry.memoryUsed}</span>
                    </div>
                    <div className="flex items-center justify-between pb-1 border-b border-white/[0.05]">
                      <span className={isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}>Throughput / Latency:</span>
                      <span className="font-bold">{currentStepInfo.telemetry.throughput}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={isSepia ? 'text-[#5A4D3F]' : 'text-slate-400'}>GoBD &amp; Audit Hash:</span>
                      <span className="font-bold text-amber-400">{currentStepInfo.telemetry.complianceHash}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
