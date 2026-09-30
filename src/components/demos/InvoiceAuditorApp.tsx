import React, { useState } from 'react';
import { Theme } from '../../types';
import {
  FileCheck2,
  ArrowLeft,
  RotateCcw,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
} from 'lucide-react';

interface InvoiceDoc {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  supplierName: string;
  invoiceDate: string;
  poTotal: number;
  invoiceTotal: number;
  varianceAmount: number;
  variancePercent: number;
  varianceReason: string;
  status: 'matched' | 'discrepancy' | 'blocked';
  lineItems: {
    pos: number;
    partNumber: string;
    description: string;
    orderedQty: number;
    deliveredQty: number;
    invoicedQty: number;
    orderedUnitPrice: number;
    invoicedUnitPrice: number;
    lineMatch: boolean;
  }[];
}

const MOCK_INVOICES: InvoiceDoc[] = [
  {
    id: 'inv-8821',
    invoiceNumber: 'RE-2026-44120',
    orderNumber: 'PO-SAP-981240',
    supplierName: 'ThyssenKrupp Materials Services GmbH',
    invoiceDate: '26.09.2026',
    poTotal: 14250.0,
    invoiceTotal: 14250.0,
    varianceAmount: 0.0,
    variancePercent: 0.0,
    varianceReason:
      '100% Konform: Mengen, Einzelpreise und Zahlungsziel (30 Tage netto) stimmen überein.',
    status: 'matched',
    lineItems: [
      {
        pos: 10,
        partNumber: 'ST-42CRMO4-35',
        description: 'Vergütungsstahl 42CrMo4+QT geschliffen d=35mm (Länge 3000mm)',
        orderedQty: 25,
        deliveredQty: 25,
        invoicedQty: 25,
        orderedUnitPrice: 380.0,
        invoicedUnitPrice: 380.0,
        lineMatch: true,
      },
      {
        pos: 20,
        partNumber: 'AL-SI9CU3-BLOCK',
        description: 'Aluminium-Gussbarren AlSi9Cu3 (Palette à 500kg)',
        orderedQty: 10,
        deliveredQty: 10,
        invoicedQty: 10,
        orderedUnitPrice: 475.0,
        invoicedUnitPrice: 475.0,
        lineMatch: true,
      },
    ],
  },
  {
    id: 'inv-8845',
    invoiceNumber: 'INV-2026-90412',
    orderNumber: 'PO-SAP-981310',
    supplierName: 'SKF Motion Technologies GmbH & Co. KG',
    invoiceDate: '28.09.2026',
    poTotal: 4800.0,
    invoiceTotal: 5011.2,
    varianceAmount: 211.2,
    variancePercent: 4.4,
    varianceReason:
      'Toleranzüberschreitung: Einzelpreisabweichung (+4,4 %) durch nicht vereinbarten Legierungs-Teuerungszuschlag.',
    status: 'discrepancy',
    lineItems: [
      {
        pos: 10,
        partNumber: 'LAG-6208-2RS',
        description: 'Rillenkugellager 6208-2RS1 C3 Hochpräzision',
        orderedQty: 200,
        deliveredQty: 200,
        invoicedQty: 200,
        orderedUnitPrice: 24.0,
        invoicedUnitPrice: 25.056,
        lineMatch: false,
      },
    ],
  },
  {
    id: 'inv-8899',
    invoiceNumber: 'RE-889104-DE',
    orderNumber: 'PO-SAP-981450',
    supplierName: 'Böllhoff Verbindungstechnik GmbH',
    invoiceDate: '29.09.2026',
    poTotal: 1200.0,
    invoiceTotal: 1920.0,
    varianceAmount: 720.0,
    variancePercent: 60.0,
    varianceReason:
      'Kritische Abweichung: 80 Einheiten abgerechnet, Wareneingang buchte jedoch nur 50 Einheiten.',
    status: 'blocked',
    lineItems: [
      {
        pos: 10,
        partNumber: 'SCH-M8-35-INOX',
        description: 'Edelstahl-Zylinderschrauben A2-70 M8x35',
        orderedQty: 50,
        deliveredQty: 50,
        invoicedQty: 80,
        orderedUnitPrice: 24.0,
        invoicedUnitPrice: 24.0,
        lineMatch: false,
      },
    ],
  },
];

export const InvoiceAuditorApp: React.FC<{
  theme?: Theme;
  onBack: () => void;
}> = ({ theme = 'dark', onBack }) => {
  const [invoices, setInvoices] = useState<InvoiceDoc[]>(MOCK_INVOICES);
  const [selectedId, setSelectedId] = useState<string>('inv-8845');
  const [filter, setFilter] = useState<'all' | 'matched' | 'discrepancy' | 'blocked'>(
    'all'
  );
  const [search, setSearch] = useState('');
  const [approvedNotification, setApprovedNotification] = useState<string | null>(null);

  const isSepia = theme === 'sepia';

  const selectedInvoice =
    invoices.find((i) => i.id === selectedId) || invoices[0];

  const filteredInvoices = invoices.filter((inv) => {
    const matchesFilter = filter === 'all' || inv.status === filter;
    const matchesSearch =
      inv.supplierName.toLowerCase().includes(search.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.orderNumber.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              status: 'matched',
              varianceReason: 'Manuell freigegeben durch Einkaufsleiter.',
            }
          : inv
      )
    );
    setApprovedNotification(
      `Beleg ${selectedInvoice.invoiceNumber} erfolgreich für Buchungslauf freigegeben!`
    );
    setTimeout(() => setApprovedNotification(null), 3000);
  };

  const handleGenerateDebitNote = () => {
    setApprovedNotification(
      `Belastungsanzeige über ${selectedInvoice.varianceAmount.toFixed(
        2
      )} € an ${selectedInvoice.supplierName} generiert!`
    );
    setTimeout(() => setApprovedNotification(null), 3500);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isSepia
          ? 'bg-[#FAF8F5] text-[#18130E] selection:bg-[#0D9488] selection:text-white'
          : 'bg-[#0C101A] text-slate-100 selection:bg-teal-500 selection:text-[#090D14]'
      }`}
    >
      {/* Top Application Bar */}
      <header
        className={`h-14 px-4 flex items-center justify-between shrink-0 border-b ${
          isSepia
            ? 'bg-[#F4ECE1] border-[#E0D5C3] text-[#18130E]'
            : 'bg-[#080B12] border-white/[0.08] text-white'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
              isSepia
                ? 'border-[#D5C9B7] bg-[#FAF8F5] text-[#423425] hover:bg-[#EAE0CF]'
                : 'border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Zurück zur Kiventis Übersicht</span>
          </button>

          <div
            className={`h-4 w-[1px] ${
              isSepia ? 'bg-[#D5C9B7]' : 'bg-white/[0.1]'
            }`}
          />

          <div className="flex items-center gap-2">
            <div
              className={`h-7 w-7 rounded-lg border flex items-center justify-center ${
                isSepia
                  ? 'bg-[#0D9488]/15 border-[#0D9488]/30 text-[#0D9488]'
                  : 'bg-teal-500/10 border-teal-500/30 text-teal-400'
              }`}
            >
              <FileCheck2 className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold tracking-wide ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  ERP RECHNUNGSPRÜFER & RADAR
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold border ${
                    isSepia
                      ? 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'
                      : 'bg-teal-500/20 text-teal-400 border-teal-500/30'
                  }`}
                >
                  VIBE CODING CLIENT BUILD
                </span>
              </div>
              <div
                className={`text-[10px] font-mono ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                Kunde: Schultheiss Komponenten · Automatisierter 3-Wege-Abgleich
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setInvoices(MOCK_INVOICES)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-mono transition-colors cursor-pointer ${
              isSepia
                ? 'border-[#D5C9B7] bg-[#FAF8F5] text-[#423425] hover:bg-[#EAE0CF]'
                : 'border-white/[0.1] text-slate-300 hover:bg-white/[0.05]'
            }`}
          >
            <RotateCcw
              className={`h-3.5 w-3.5 ${
                isSepia ? 'text-[#0D9488]' : 'text-teal-400'
              }`}
            />
            <span>MOK-Belege neu laden</span>
          </button>
        </div>
      </header>

      {/* Notification Toast */}
      {approvedNotification && (
        <div className="bg-[#0D9488] text-white px-4 py-2 text-xs font-bold font-mono text-center flex items-center justify-center gap-2 shadow-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>{approvedNotification}</span>
        </div>
      )}

      {/* Main Split-Screen Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Invoice Inbox */}
        <aside
          className={`w-96 border-r flex flex-col shrink-0 overflow-hidden ${
            isSepia
              ? 'bg-[#F5EFE6] border-[#E0D5C3]'
              : 'bg-[#0A0E18] border-white/[0.08]'
          }`}
        >
          {/* Filter Bar */}
          <div
            className={`p-3 border-b space-y-2 ${
              isSepia
                ? 'bg-[#EFE7DA] border-[#E0D5C3]'
                : 'bg-[#0E1422] border-white/[0.06]'
            }`}
          >
            <div className="relative">
              <Search
                className={`h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                placeholder="Lieferant, Beleg- oder Bestellnr..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded border text-xs font-mono focus:outline-none ${
                  isSepia
                    ? 'bg-white border-[#D5C9B7] text-[#18130E] placeholder-[#9E9080] focus:border-[#0D9488]'
                    : 'bg-[#070A11] border-white/[0.1] text-white placeholder-slate-500 focus:border-teal-500'
                }`}
              />
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono">
              <button
                onClick={() => setFilter('all')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  filter === 'all'
                    ? isSepia
                      ? 'bg-white text-[#18130E] font-bold shadow-xs'
                      : 'bg-teal-500 text-[#090D14] font-bold'
                    : isSepia
                      ? 'text-[#5C5042] hover:text-[#18130E]'
                      : 'text-slate-400 hover:text-white'
                }`}
              >
                Alle ({invoices.length})
              </button>
              <button
                onClick={() => setFilter('discrepancy')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  filter === 'discrepancy'
                    ? 'bg-amber-600 text-white font-bold'
                    : isSepia
                      ? 'text-[#5C5042] hover:text-[#18130E]'
                      : 'text-slate-400 hover:text-white'
                }`}
              >
                Toleranz
              </button>
              <button
                onClick={() => setFilter('blocked')}
                className={`px-2 py-1 rounded cursor-pointer ${
                  filter === 'blocked'
                    ? 'bg-red-600 text-white font-bold'
                    : isSepia
                      ? 'text-[#5C5042] hover:text-[#18130E]'
                      : 'text-slate-400 hover:text-white'
                }`}
              >
                Gesperrt
              </button>
            </div>
          </div>

          {/* List of Invoices */}
          <div
            className={`flex-1 overflow-y-auto divide-y ${
              isSepia ? 'divide-[#E8E0D2]' : 'divide-white/[0.04]'
            }`}
          >
            {filteredInvoices.map((inv) => {
              const isSelected = inv.id === selectedId;
              return (
                <div
                  key={inv.id}
                  onClick={() => setSelectedId(inv.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected
                      ? isSepia
                        ? 'bg-[#0D9488]/15 border-l-3 border-[#0D9488]'
                        : 'bg-teal-500/10 border-l-2 border-teal-400'
                      : isSepia
                        ? 'hover:bg-[#FAF6EE]'
                        : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span
                      className={`font-bold ${
                        isSepia ? 'text-[#18130E]' : 'text-white'
                      }`}
                    >
                      {inv.invoiceNumber}
                    </span>
                    <span
                      className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'}
                    >
                      {inv.invoiceDate}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold truncate ${
                      isSepia ? 'text-[#2D2218]' : 'text-slate-200'
                    }`}
                  >
                    {inv.supplierName}
                  </div>
                  <div
                    className={`text-[11px] font-mono mt-1 ${
                      isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                    }`}
                  >
                    Bestellung: {inv.orderNumber}
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs font-mono">
                    <span
                      className={`font-bold ${
                        isSepia ? 'text-[#18130E]' : 'text-white'
                      }`}
                    >
                      {inv.invoiceTotal.toFixed(2)} €
                    </span>

                    {inv.status === 'matched' && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                          isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        100% MATCH
                      </span>
                    )}
                    {inv.status === 'discrepancy' && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                          isSepia ? 'text-amber-700' : 'text-amber-400'
                        }`}
                      >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        +{inv.variancePercent}%
                      </span>
                    )}
                    {inv.status === 'blocked' && (
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                          isSepia ? 'text-red-700' : 'text-red-400'
                        }`}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        SPERRE
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Side: Detailed Document Inspector */}
        <main
          className={`flex-1 flex flex-col overflow-hidden ${
            isSepia ? 'bg-[#FCFAF7]' : 'bg-[#0E131F]'
          }`}
        >
          {/* Document Header Bar */}
          <div
            className={`p-6 border-b flex flex-wrap items-center justify-between gap-4 ${
              isSepia
                ? 'bg-[#F9F5EE] border-[#E0D5C3]'
                : 'bg-[#111726] border-white/[0.08]'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-mono font-bold ${
                    isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                  }`}
                >
                  BELEG-ABGLEICH
                </span>
                <span className="text-slate-400">·</span>
                <span
                  className={`text-xs font-mono ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  {selectedInvoice.orderNumber}
                </span>
              </div>
              <h2
                className={`text-lg font-bold mt-0.5 ${
                  isSepia ? 'text-[#18130E]' : 'text-white'
                }`}
              >
                Rechnung {selectedInvoice.invoiceNumber} –{' '}
                {selectedInvoice.supplierName}
              </h2>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {selectedInvoice.status !== 'matched' && (
                <>
                  <button
                    onClick={handleGenerateDebitNote}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono cursor-pointer transition-colors ${
                      isSepia
                        ? 'border-amber-700/30 text-amber-800 bg-amber-700/10 hover:bg-amber-700/20'
                        : 'border-amber-500/40 text-amber-300 bg-amber-500/10 hover:bg-amber-500/20'
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Belastungsanzeige</span>
                  </button>
                  <button
                    onClick={() => handleApprove(selectedInvoice.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm ${
                      isSepia
                        ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs'
                        : 'bg-teal-500 hover:bg-teal-400 text-[#090D14]'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Toleranz freigeben & buchen</span>
                  </button>
                </>
              )}
              {selectedInvoice.status === 'matched' && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold ${
                    isSepia
                      ? 'bg-[#0D9488]/10 border-[#0D9488]/30 text-[#0D9488]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Bereits im SAP gebucht</span>
                </div>
              )}
            </div>
          </div>

          {/* Variance Analysis Box */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                selectedInvoice.status === 'matched'
                  ? isSepia
                    ? 'border-[#0D9488]/30 bg-[#0D9488]/10'
                    : 'border-emerald-500/30 bg-emerald-500/5'
                  : selectedInvoice.status === 'discrepancy'
                  ? isSepia
                    ? 'border-amber-700/30 bg-amber-700/10'
                    : 'border-amber-500/30 bg-amber-500/5'
                  : isSepia
                    ? 'border-red-700/30 bg-red-700/10'
                    : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              {selectedInvoice.status === 'matched' && (
                <CheckCircle2
                  className={`h-5 w-5 shrink-0 mt-0.5 ${
                    isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                  }`}
                />
              )}
              {selectedInvoice.status === 'discrepancy' && (
                <AlertTriangle
                  className={`h-5 w-5 shrink-0 mt-0.5 ${
                    isSepia ? 'text-amber-700' : 'text-amber-400'
                  }`}
                />
              )}
              {selectedInvoice.status === 'blocked' && (
                <XCircle
                  className={`h-5 w-5 shrink-0 mt-0.5 ${
                    isSepia ? 'text-red-700' : 'text-red-400'
                  }`}
                />
              )}
              <div className="space-y-1 text-xs">
                <div
                  className={`font-bold font-mono ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  Prüfergebnis der automatischen Rechnungsvalidierung:
                </div>
                <p
                  className={`leading-relaxed ${
                    isSepia ? 'text-[#423425]' : 'text-slate-300'
                  }`}
                >
                  {selectedInvoice.varianceReason}
                </p>
              </div>
            </div>

            {/* Financial Comparison Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'bg-[#FAF6EE] border-[#E0D5C3]'
                    : 'bg-[#090D15] border-white/[0.08]'
                }`}
              >
                <div
                  className={`text-[11px] font-mono uppercase ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Bestellwert (SAP PO)
                </div>
                <div
                  className={`font-mono text-xl font-bold mt-1 ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  {selectedInvoice.poTotal.toFixed(2)} €
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'
                  }`}
                >
                  Gültige Rahmenvereinbarung
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  isSepia
                    ? 'bg-[#FAF6EE] border-[#E0D5C3]'
                    : 'bg-[#090D15] border-white/[0.08]'
                }`}
              >
                <div
                  className={`text-[11px] font-mono uppercase ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Rechnungsbetrag (Ist)
                </div>
                <div
                  className={`font-mono text-xl font-bold mt-1 ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  {selectedInvoice.invoiceTotal.toFixed(2)} €
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-500'
                  }`}
                >
                  Eingang am {selectedInvoice.invoiceDate}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border ${
                  selectedInvoice.varianceAmount > 0
                    ? isSepia
                      ? 'border-amber-700/30 bg-amber-700/10'
                      : 'border-amber-500/30 bg-amber-500/5'
                    : isSepia
                      ? 'border-[#0D9488]/30 bg-[#0D9488]/10'
                      : 'border-emerald-500/30 bg-emerald-500/5'
                }`}
              >
                <div
                  className={`text-[11px] font-mono uppercase ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Abweichung
                </div>
                <div
                  className={`font-mono text-xl font-extrabold mt-1 ${
                    selectedInvoice.varianceAmount > 0
                      ? isSepia
                        ? 'text-amber-800'
                        : 'text-amber-400'
                      : isSepia
                        ? 'text-[#0D9488]'
                        : 'text-emerald-400'
                  }`}
                >
                  {selectedInvoice.varianceAmount > 0 ? '+' : ''}
                  {selectedInvoice.varianceAmount.toFixed(2)} € (
                  {selectedInvoice.variancePercent}%)
                </div>
                <div
                  className={`text-[10px] mt-1 ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  {selectedInvoice.varianceAmount === 0
                    ? 'Keine Differenz'
                    : 'Außerhalb Toleranz'}
                </div>
              </div>
            </div>

            {/* Line Items Comparison Table */}
            <div
              className={`rounded-xl border overflow-hidden ${
                isSepia
                  ? 'border-[#E0D5C3] bg-[#FCFAF7]'
                  : 'border-white/[0.08] bg-[#0A0E18]'
              }`}
            >
              <div
                className={`p-3 border-b flex items-center justify-between text-xs font-mono ${
                  isSepia
                    ? 'bg-[#EFE8DC] border-[#D5C9B7] text-[#18130E]'
                    : 'bg-[#0E1422] border-white/[0.06] text-slate-300'
                }`}
              >
                <span className="font-bold">Positionsabgleich (3-Way Match)</span>
                <span
                  className={`text-[11px] ${
                    isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                  }`}
                >
                  Bestellte vs. gelieferte vs. fakturierte Werte
                </span>
              </div>

              <table className="w-full text-left text-xs font-mono">
                <thead
                  className={`uppercase text-[11px] border-b ${
                    isSepia
                      ? 'bg-[#FAF6EE] text-[#5C5042] border-[#E0D5C3]'
                      : 'bg-[#070A11] text-slate-400 border-white/[0.06]'
                  }`}
                >
                  <tr>
                    <th className="py-2.5 px-3">Pos</th>
                    <th className="py-2.5 px-3">Artikelnummer & Text</th>
                    <th className="py-2.5 px-3 text-right">Bestellt</th>
                    <th className="py-2.5 px-3 text-right">Geliefert</th>
                    <th className="py-2.5 px-3 text-right">Berechnet</th>
                    <th className="py-2.5 px-3 text-right">EK Soll</th>
                    <th className="py-2.5 px-3 text-right">EK Ist</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isSepia ? 'divide-[#E8E0D2]' : 'divide-white/[0.04]'
                  }`}
                >
                  {selectedInvoice.lineItems.map((line) => (
                    <tr
                      key={line.pos}
                      className={
                        isSepia ? 'hover:bg-[#F4ECE1]' : 'hover:bg-white/[0.02]'
                      }
                    >
                      <td
                        className={`py-3 px-3 font-bold ${
                          isSepia ? 'text-[#8A7968]' : 'text-slate-500'
                        }`}
                      >
                        {line.pos}
                      </td>
                      <td className="py-3 px-3">
                        <div
                          className={`font-bold ${
                            isSepia ? 'text-[#18130E]' : 'text-white'
                          }`}
                        >
                          {line.partNumber}
                        </div>
                        <div
                          className={`text-[11px] truncate max-w-sm ${
                            isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                          }`}
                        >
                          {line.description}
                        </div>
                      </td>
                      <td
                        className={`py-3 px-3 text-right ${
                          isSepia ? 'text-[#423425]' : 'text-slate-300'
                        }`}
                      >
                        {line.orderedQty}
                      </td>
                      <td
                        className={`py-3 px-3 text-right ${
                          isSepia ? 'text-[#423425]' : 'text-slate-300'
                        }`}
                      >
                        {line.deliveredQty}
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-bold ${
                          line.invoicedQty !== line.orderedQty
                            ? 'text-red-600'
                            : isSepia
                              ? 'text-[#18130E]'
                              : 'text-white'
                        }`}
                      >
                        {line.invoicedQty}
                      </td>
                      <td
                        className={`py-3 px-3 text-right ${
                          isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                        }`}
                      >
                        {line.orderedUnitPrice.toFixed(2)} €
                      </td>
                      <td
                        className={`py-3 px-3 text-right font-bold ${
                          line.invoicedUnitPrice !== line.orderedUnitPrice
                            ? isSepia
                              ? 'text-amber-800'
                              : 'text-amber-400'
                            : isSepia
                              ? 'text-[#18130E]'
                              : 'text-white'
                        }`}
                      >
                        {line.invoicedUnitPrice.toFixed(2)} €
                      </td>
                      <td className="py-3 px-3 text-center">
                        {line.lineMatch ? (
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isSepia
                                ? 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            }`}
                          >
                            OK
                          </span>
                        ) : (
                          <span
                            className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${
                              isSepia
                                ? 'bg-amber-700/10 text-amber-800 border-amber-700/20'
                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            }`}
                          >
                            ABWEICHUNG
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
