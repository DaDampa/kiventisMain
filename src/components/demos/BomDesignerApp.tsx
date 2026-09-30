import React, { useState } from 'react';
import { Theme } from '../../types';
import {
  Layers,
  ArrowLeft,
  RotateCcw,
  Plus,
  Trash2,
  FileCode,
  Search,
  FolderTree,
  ChevronRight,
  Info,
  Sliders,
  Copy,
  Check,
} from 'lucide-react';

interface BomItem {
  id: string;
  pos: number;
  level: number;
  partNumber: string;
  name: string;
  material: string;
  supplier: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  laborMinutes: number;
  status: 'released' | 'review' | 'locked';
}

const INITIAL_BOM_DATA: BomItem[] = [
  {
    id: 'item-10',
    pos: 10,
    level: 1,
    partNumber: 'BG-GA400-01',
    name: 'Getriebegehäuse vormontiert',
    material: 'AlSi9Cu3 / EN AC-46000',
    supplier: 'Eigenfertigung CNC-Zentrum 2',
    quantity: 1,
    unit: 'Stk',
    unitPrice: 185.5,
    laborMinutes: 45,
    status: 'released',
  },
  {
    id: 'item-20',
    pos: 20,
    level: 2,
    partNumber: 'GH-UNT-4011',
    name: 'Gehäuse-Unterteil Druckguss',
    material: 'AlSi9Cu3 entgratet, T6 vergütet',
    supplier: 'Gusswerk Südwest GmbH',
    quantity: 1,
    unit: 'Stk',
    unitPrice: 94.0,
    laborMinutes: 20,
    status: 'released',
  },
  {
    id: 'item-30',
    pos: 30,
    level: 2,
    partNumber: 'GH-DEK-4012',
    name: 'Gehäusedeckel mit Passbohrungen',
    material: 'AlSi9Cu3 gefräst',
    supplier: 'Gusswerk Südwest GmbH',
    quantity: 1,
    unit: 'Stk',
    unitPrice: 58.5,
    laborMinutes: 15,
    status: 'released',
  },
  {
    id: 'item-40',
    pos: 40,
    level: 1,
    partNumber: 'ZR-ST-2100',
    name: 'Stirnradstufe 1 (Modul 2,5)',
    material: '16MnCr5 einsatzgehärtet DIN 3962 Q6',
    supplier: 'Präzisionszahnräder Meier KG',
    quantity: 2,
    unit: 'Stk',
    unitPrice: 52.8,
    laborMinutes: 18,
    status: 'released',
  },
  {
    id: 'item-50',
    pos: 50,
    level: 1,
    partNumber: 'WLL-VA-4025',
    name: 'Antriebs-Vollwelle geschliffen',
    material: '42CrMo4+QT, h6 Passung d=32mm',
    supplier: 'Stahlkontor West',
    quantity: 1,
    unit: 'Stk',
    unitPrice: 89.0,
    laborMinutes: 30,
    status: 'released',
  },
  {
    id: 'item-60',
    pos: 60,
    level: 1,
    partNumber: 'LAG-DIN-6207',
    name: 'Rillenkugellager 6207-2RS1 C3',
    material: 'Wälzlagerstahl 100Cr6',
    supplier: 'SKF Deutschland AG',
    quantity: 4,
    unit: 'Stk',
    unitPrice: 19.4,
    laborMinutes: 12,
    status: 'released',
  },
  {
    id: 'item-70',
    pos: 70,
    level: 1,
    partNumber: 'DIC-NBR-3552',
    name: 'Wellendichtring 35x52x7 BASL',
    material: 'NBR 70 Shore A (DIN 3760)',
    supplier: 'Freudenberg Sealing Technologies',
    quantity: 2,
    unit: 'Stk',
    unitPrice: 5.2,
    laborMinutes: 6,
    status: 'released',
  },
  {
    id: 'item-80',
    pos: 80,
    level: 1,
    partNumber: 'SCH-M8-35VZ',
    name: 'Zylinderschrauben ISO 4762 M8x35',
    material: 'Stahl 8.8 verzinkt (Set à 16)',
    supplier: 'Würth Industrie Service',
    quantity: 1,
    unit: 'Satz',
    unitPrice: 14.8,
    laborMinutes: 10,
    status: 'released',
  },
];

export const BomDesignerApp: React.FC<{ theme?: Theme; onBack: () => void }> = ({
  theme = 'dark',
  onBack,
}) => {
  const [items, setItems] = useState<BomItem[]>(INITIAL_BOM_DATA);
  const [search, setSearch] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<string>('item-10');
  const [hourlyLaborRate, setHourlyLaborRate] = useState<number>(72.0);
  const [overheadPct, setOverheadPct] = useState<number>(15.0);
  const [batchSize, setBatchSize] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'table' | 'cogs' | 'erp-export'>('table');
  const [copiedPayload, setCopiedPayload] = useState(false);

  const isSepia = theme === 'sepia';

  // Calculations
  const totalDirectMaterial = items.reduce(
    (acc, it) => acc + it.unitPrice * it.quantity,
    0
  );
  const totalLaborMinutes = items.reduce(
    (acc, it) => acc + it.laborMinutes * it.quantity,
    0
  );
  const totalLaborCost = (totalLaborMinutes / 60) * hourlyLaborRate;
  const overheadCost = (totalDirectMaterial + totalLaborCost) * (overheadPct / 100);
  const unitCogs = totalDirectMaterial + totalLaborCost + overheadCost;
  const batchCogs = unitCogs * batchSize;

  const selectedItem = items.find((i) => i.id === selectedItemId) || items[0];

  const handleResetData = () => {
    setItems(INITIAL_BOM_DATA);
  };

  const handleUpdate = (id: string, field: keyof BomItem, val: any) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: val } : i))
    );
  };

  const handleAddItem = () => {
    const nextPos = (items.length + 1) * 10;
    const newItem: BomItem = {
      id: `item-${Date.now()}`,
      pos: nextPos,
      level: 1,
      partNumber: `TEIL-${nextPos}`,
      name: 'Neues Konstruktionsteil',
      material: 'Werkstoff nach Zeichnung',
      supplier: 'Lieferant / Zukauf',
      quantity: 1,
      unit: 'Stk',
      unitPrice: 25.0,
      laborMinutes: 10,
      status: 'review',
    };
    setItems([...items, newItem]);
    setSelectedItemId(newItem.id);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filteredItems = items.filter(
    (it) =>
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.partNumber.toLowerCase().includes(search.toLowerCase()) ||
      it.material.toLowerCase().includes(search.toLowerCase())
  );

  const erpPayload = {
    metadata: {
      generator: 'Kiventis Citizen BOM-Designer v2.4 (Vibe Coding Inhouse App)',
      sourceCompany: 'Hofmann Präzisions-Systeme GmbH',
      targetErp: 'SAP S/4HANA Enterprise Cloud (OData API API_BILL_OF_MATERIAL_SRV)',
      generatedAt: new Date().toISOString(),
      status: 'ReleasedForProduction',
    },
    billOfMaterialHeader: {
      BillOfMaterial: 'BOM-GA400-01',
      BillOfMaterialCategory: 'M',
      Material: 'MAT-GETR-400-M',
      Plant: '1010',
      BOMHeaderText: 'Industrie-Getriebeantrieb GA-400 Serie M (Drehmoment 450 Nm)',
      BOMAlternative: '1',
      BOMUsage: '1',
      BaseQuantity: 1,
      BaseUnit: 'PCE',
      Currency: 'EUR',
      CostingDetails: {
        DirectMaterialCost: Number(totalDirectMaterial.toFixed(2)),
        DirectLaborMinutes: totalLaborMinutes,
        DirectLaborCost: Number(totalLaborCost.toFixed(2)),
        OverheadPercentage: overheadPct,
        OverheadCost: Number(overheadCost.toFixed(2)),
        CalculatedUnitCOGS: Number(unitCogs.toFixed(2)),
        BatchSize: batchSize,
        TotalBatchCOGS: Number(batchCogs.toFixed(2)),
      },
    },
    billOfMaterialItems: items.map((it) => ({
      BOMItemNumber: it.pos.toString().padStart(4, '0'),
      BOMItemCategory: 'L',
      ComponentMaterial: it.partNumber,
      ComponentDescription: it.name,
      BillOfMaterialComponentQty: it.quantity,
      ComponentUnitOfMeasure: it.unit,
      ComponentUnitPrice: it.unitPrice,
      MaterialSpecification: it.material,
      SupplierName: it.supplier,
      AssemblyLaborMinutes: it.laborMinutes,
      LineTotalCost: Number((it.unitPrice * it.quantity).toFixed(2)),
      ItemReleaseStatus: it.status,
    })),
  };

  const handleCopyJson = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(erpPayload, null, 2));
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isSepia
          ? 'bg-[#FAF8F5] text-[#18130E] selection:bg-[#0D9488] selection:text-white'
          : 'bg-[#0E131F] text-slate-100 selection:bg-teal-500 selection:text-[#090D14]'
      }`}
    >
      {/* Top Application Bar */}
      <header
        className={`h-14 px-4 flex items-center justify-between shrink-0 border-b ${
          isSepia
            ? 'bg-[#F4ECE1] border-[#E0D5C3] text-[#18130E]'
            : 'bg-[#0A0D16] border-white/[0.08] text-slate-100'
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
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold tracking-wide ${
                    isSepia ? 'text-[#18130E]' : 'text-white'
                  }`}
                >
                  BOM DESIGNER PRO
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
                Kunde: Hofmann Präzisions-Systeme · SAP S/4HANA OData Sync
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetData}
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
            <span>MOK-Daten zurücksetzen</span>
          </button>

          <button
            onClick={handleCopyJson}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              isSepia
                ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs'
                : 'bg-teal-500 hover:bg-teal-400 text-[#090D14]'
            }`}
          >
            {copiedPayload ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <FileCode className="h-3.5 w-3.5" />
            )}
            <span>{copiedPayload ? 'Kopiert!' : 'SAP ERP Payload (JSON)'}</span>
          </button>
        </div>
      </header>

      {/* Engineering Tool Sub-Header */}
      <div
        className={`border-b px-6 py-3 flex flex-wrap items-center justify-between gap-4 ${
          isSepia
            ? 'bg-[#F9F5EE] border-[#E0D5C3]'
            : 'bg-[#121927] border-white/[0.06]'
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`px-2.5 py-1 rounded border text-xs font-mono font-bold ${
              isSepia
                ? 'bg-[#EFE7DA] border-[#D5C9B7] text-[#0D9488]'
                : 'bg-[#0A0D16] border-white/[0.1] text-teal-400'
            }`}
          >
            BG-GA400-01 REV.D
          </span>
          <h1
            className={`text-base font-bold ${
              isSepia ? 'text-[#18130E]' : 'text-white'
            }`}
          >
            Industrie-Getriebeantrieb GA-400 (450 Nm · Nenndrehzahl 1.450 min⁻¹)
          </h1>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-mono text-[11px] border ${
              isSepia
                ? 'bg-[#0D9488]/10 text-[#0D9488] border-[#0D9488]/20'
                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
            }`}
          >
            Freigegeben zur Serienkalkulation
          </span>
        </div>

        {/* View Switcher Tabs */}
        <div
          className={`flex items-center gap-1 p-1 rounded-lg border ${
            isSepia
              ? 'bg-[#EFE8DC] border-[#D5C9B7]'
              : 'bg-[#0A0D16] border-white/[0.08]'
          }`}
        >
          <button
            onClick={() => setActiveTab('table')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'table'
                ? isSepia
                  ? 'bg-white text-[#18130E] font-bold shadow-xs'
                  : 'bg-teal-500 text-[#090D14] font-bold shadow-sm'
                : isSepia
                  ? 'text-[#5C5042] hover:text-[#18130E]'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            Stückliste ({items.length} Positionen)
          </button>
          <button
            onClick={() => setActiveTab('cogs')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'cogs'
                ? isSepia
                  ? 'bg-white text-[#18130E] font-bold shadow-xs'
                  : 'bg-teal-500 text-[#090D14] font-bold shadow-sm'
                : isSepia
                  ? 'text-[#5C5042] hover:text-[#18130E]'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            Herstellkosten-Kalkulation (COGS)
          </button>
          <button
            onClick={() => setActiveTab('erp-export')}
            className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
              activeTab === 'erp-export'
                ? isSepia
                  ? 'bg-white text-[#18130E] font-bold shadow-xs'
                  : 'bg-teal-500 text-[#090D14] font-bold shadow-sm'
                : isSepia
                  ? 'text-[#5C5042] hover:text-[#18130E]'
                  : 'text-slate-400 hover:text-white'
            }`}
          >
            ERP / REST OData Payload
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Assembly Explorer & Parameter Controls */}
        <aside
          className={`w-72 border-r p-4 flex flex-col justify-between shrink-0 overflow-y-auto ${
            isSepia
              ? 'bg-[#F5EFE6] border-[#E0D5C3]'
              : 'bg-[#0A0E18] border-white/[0.08]'
          }`}
        >
          <div className="space-y-6">
            <div>
              <div
                className={`text-[11px] font-mono uppercase font-semibold tracking-wider mb-2 flex items-center gap-1.5 ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                <FolderTree
                  className={`h-3.5 w-3.5 ${
                    isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                  }`}
                />
                <span>Baugruppen-Hierarchie</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div
                  className={`p-2 rounded border font-semibold flex items-center justify-between ${
                    isSepia
                      ? 'bg-white border-[#D5C9B7] text-[#18130E]'
                      : 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                  }`}
                >
                  <span>[0] BG-GA400-01 (Hauptantrieb)</span>
                  <span
                    className={`text-[10px] ${
                      isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                    }`}
                  >
                    {items.length} Teile
                  </span>
                </div>
                <div
                  className={`pl-4 space-y-1 text-[11px] ${
                    isSepia ? 'text-[#5C5042]' : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 cursor-pointer py-1 ${
                      isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 opacity-60" />
                    <span>├─ Unterteil Guss (CNC)</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 cursor-pointer py-1 ${
                      isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 opacity-60" />
                    <span>├─ Stirnradstufe gehärtet</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 cursor-pointer py-1 ${
                      isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 opacity-60" />
                    <span>├─ Lager & Dichtungspaket</span>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 cursor-pointer py-1 ${
                      isSepia ? 'hover:text-[#18130E]' : 'hover:text-white'
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 opacity-60" />
                    <span>└─ Normteile Schrauben</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Parameters */}
            <div
              className={`border-t pt-4 space-y-3 ${
                isSepia ? 'border-[#E0D5C3]' : 'border-white/[0.06]'
              }`}
            >
              <div
                className={`text-[11px] font-mono uppercase font-semibold tracking-wider flex items-center gap-1.5 ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                <Sliders
                  className={`h-3.5 w-3.5 ${
                    isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                  }`}
                />
                <span>Kalkulations-Parameter</span>
              </div>

              <div className="space-y-1">
                <label
                  className={`text-xs flex justify-between ${
                    isSepia ? 'text-[#423425]' : 'text-slate-300'
                  }`}
                >
                  <span>Stundensatz Fertigung:</span>
                  <span
                    className={`font-mono font-bold ${
                      isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                    }`}
                  >
                    {hourlyLaborRate} €/h
                  </span>
                </label>
                <input
                  type="range"
                  min={45}
                  max={120}
                  step={1}
                  value={hourlyLaborRate}
                  onChange={(e) => setHourlyLaborRate(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`text-xs flex justify-between ${
                    isSepia ? 'text-[#423425]' : 'text-slate-300'
                  }`}
                >
                  <span>Gemeinkostenzuschlag:</span>
                  <span
                    className={`font-mono font-bold ${
                      isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                    }`}
                  >
                    {overheadPct} %
                  </span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={overheadPct}
                  onChange={(e) => setOverheadPct(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label
                  className={`text-xs flex justify-between ${
                    isSepia ? 'text-[#423425]' : 'text-slate-300'
                  }`}
                >
                  <span>Losgröße (Serie):</span>
                  <span
                    className={`font-mono font-bold ${
                      isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                    }`}
                  >
                    {batchSize} Stk
                  </span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={500}
                  step={5}
                  value={batchSize}
                  onChange={(e) => setBatchSize(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Quick KPI Summary Card */}
            <div
              className={`rounded-xl border p-3.5 space-y-2 ${
                isSepia
                  ? 'border-[#D5C9B7] bg-[#FCFAF7]'
                  : 'border-teal-500/20 bg-teal-500/5'
              }`}
            >
              <div
                className={`text-[11px] font-mono uppercase font-bold ${
                  isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                }`}
              >
                Kalkulierter Stückpreis (COGS)
              </div>
              <div
                className={`font-mono text-2xl font-extrabold ${
                  isSepia ? 'text-[#18130E]' : 'text-white'
                }`}
              >
                {unitCogs.toFixed(2)} €
              </div>
              <div
                className={`text-[11px] font-mono ${
                  isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                }`}
              >
                Loskosten ({batchSize} Stk): {(batchCogs / 1000).toFixed(1)} T€
              </div>
            </div>
          </div>

          {/* Bottom Info Note */}
          <div
            className={`border-t pt-3 text-[11px] space-y-1 ${
              isSepia
                ? 'border-[#E0D5C3] text-[#7A6B5B]'
                : 'border-white/[0.06] text-slate-400'
            }`}
          >
            <div
              className={`font-semibold flex items-center gap-1 ${
                isSepia ? 'text-[#18130E]' : 'text-slate-300'
              }`}
            >
              <Info
                className={`h-3 w-3 ${
                  isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                }`}
              />
              <span>Entwicklungs-Hintergrund</span>
            </div>
            <p className="leading-tight">
              Dieses Tool ersetzt Excel-Listen und spart 6,5 Std./Woche bei Neuangeboten.
            </p>
          </div>
        </aside>

        {/* Center / Right Content Area */}
        <main
          className={`flex-1 flex flex-col overflow-hidden ${
            isSepia ? 'bg-[#FCFAF7]' : 'bg-[#0D121D]'
          }`}
        >
          {/* TAB 1: THE RICH BOM TABLE */}
          {activeTab === 'table' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Table Toolbar */}
              <div
                className={`p-3 border-b flex items-center justify-between gap-4 shrink-0 ${
                  isSepia
                    ? 'bg-[#F7F2E8] border-[#E0D5C3]'
                    : 'bg-[#0F1624] border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search
                      className={`h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    />
                    <input
                      type="text"
                      placeholder="Sachnummer, Werkstoff, Bezeichnung filtern..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={`w-full pl-9 pr-3 py-1.5 rounded border text-xs font-mono focus:outline-none ${
                        isSepia
                          ? 'bg-white border-[#D5C9B7] text-[#18130E] placeholder-[#9E9080] focus:border-[#0D9488]'
                          : 'bg-[#090D16] border-white/[0.1] text-white placeholder-slate-500 focus:border-teal-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAddItem}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                      isSepia
                        ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white'
                        : 'bg-teal-500 hover:bg-teal-400 text-[#090D14]'
                    }`}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Position hinzufügen</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead
                    className={`font-mono uppercase text-[11px] sticky top-0 border-b z-10 ${
                      isSepia
                        ? 'bg-[#EFE8DC] text-[#4D3F30] border-[#D5C9B7]'
                        : 'bg-[#0A0E18] text-slate-400 border-white/[0.08]'
                    }`}
                  >
                    <tr>
                      <th className="py-2.5 px-3 w-12 text-center">Pos</th>
                      <th className="py-2.5 px-3 w-32">Sachnummer</th>
                      <th className="py-2.5 px-3">Komponente / Spezifikation</th>
                      <th className="py-2.5 px-3">Werkstoff / Norm</th>
                      <th className="py-2.5 px-3 text-right w-20">Menge</th>
                      <th className="py-2.5 px-2 w-14">ME</th>
                      <th className="py-2.5 px-3 text-right w-24">EK-Preis (€)</th>
                      <th className="py-2.5 px-3 text-right w-24">Montage (m)</th>
                      <th className="py-2.5 px-3 text-right w-28">Position (€)</th>
                      <th className="py-2.5 px-2 w-10 text-center">Aktion</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y font-mono ${
                      isSepia ? 'divide-[#E8E0D2]' : 'divide-white/[0.04]'
                    }`}
                  >
                    {filteredItems.map((item) => {
                      const isSelected = item.id === selectedItemId;
                      const lineTotal = item.unitPrice * item.quantity;
                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedItemId(item.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? isSepia
                                ? 'bg-[#0D9488]/15 text-[#18130E]'
                                : 'bg-teal-500/10 text-white'
                              : isSepia
                                ? 'hover:bg-[#F4ECE1] text-[#332619]'
                                : 'hover:bg-white/[0.02] text-slate-300'
                          }`}
                        >
                          <td
                            className={`py-2.5 px-3 text-center font-semibold ${
                              isSepia ? 'text-[#8A7968]' : 'text-slate-500'
                            }`}
                          >
                            {item.pos}
                          </td>
                          <td
                            className={`py-2.5 px-3 font-bold ${
                              isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                            }`}
                          >
                            <input
                              type="text"
                              value={item.partNumber}
                              onChange={(e) =>
                                handleUpdate(item.id, 'partNumber', e.target.value)
                              }
                              className={`bg-transparent border-b border-transparent focus:outline-none w-full text-xs font-mono ${
                                isSepia
                                  ? 'hover:border-[#C4B49F] focus:border-[#0D9488] text-[#0D9488]'
                                  : 'hover:border-white/20 focus:border-teal-400 text-teal-300'
                              }`}
                            />
                          </td>
                          <td className="py-2.5 px-3 font-sans">
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) =>
                                handleUpdate(item.id, 'name', e.target.value)
                              }
                              className={`bg-transparent border-b border-transparent focus:outline-none w-full text-xs font-medium ${
                                isSepia
                                  ? 'hover:border-[#C4B49F] focus:border-[#0D9488] text-[#18130E]'
                                  : 'hover:border-white/20 focus:border-teal-400 text-white'
                              }`}
                            />
                            <div
                              className={`text-[10px] truncate ${
                                isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                              }`}
                            >
                              Lieferant: {item.supplier}
                            </div>
                          </td>
                          <td
                            className={`py-2.5 px-3 text-[11px] truncate max-w-xs font-sans ${
                              isSepia ? 'text-[#5C5042]' : 'text-slate-400'
                            }`}
                          >
                            {item.material}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) =>
                                handleUpdate(item.id, 'quantity', Number(e.target.value))
                              }
                              className={`w-14 px-1.5 py-0.5 rounded border text-right font-mono text-xs focus:outline-none ${
                                isSepia
                                  ? 'bg-white border-[#D5C9B7] text-[#18130E] focus:border-[#0D9488]'
                                  : 'bg-[#070A10] border-white/[0.1] text-white focus:border-teal-400'
                              }`}
                            />
                          </td>
                          <td
                            className={`py-2.5 px-2 ${
                              isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                            }`}
                          >
                            {item.unit}
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <input
                              type="number"
                              step="0.1"
                              value={item.unitPrice}
                              onChange={(e) =>
                                handleUpdate(item.id, 'unitPrice', Number(e.target.value))
                              }
                              className={`w-20 px-1.5 py-0.5 rounded border text-right font-mono text-xs focus:outline-none ${
                                isSepia
                                  ? 'bg-white border-[#D5C9B7] text-[#18130E] focus:border-[#0D9488]'
                                  : 'bg-[#070A10] border-white/[0.1] text-white focus:border-teal-400'
                              }`}
                            />
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <input
                              type="number"
                              value={item.laborMinutes}
                              onChange={(e) =>
                                handleUpdate(
                                  item.id,
                                  'laborMinutes',
                                  Number(e.target.value)
                                )
                              }
                              className={`w-16 px-1.5 py-0.5 rounded border text-right font-mono text-xs focus:outline-none ${
                                isSepia
                                  ? 'bg-white border-[#D5C9B7] text-[#18130E] focus:border-[#0D9488]'
                                  : 'bg-[#070A10] border-white/[0.1] text-white focus:border-teal-400'
                              }`}
                            />
                          </td>
                          <td
                            className={`py-2.5 px-3 text-right font-bold ${
                              isSepia ? 'text-[#18130E]' : 'text-white'
                            }`}
                          >
                            {lineTotal.toFixed(2)} €
                          </td>
                          <td className="py-2.5 px-2 text-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item.id);
                              }}
                              className={`p-1 rounded transition-colors ${
                                isSepia
                                  ? 'text-[#A39281] hover:text-red-600'
                                  : 'text-slate-500 hover:text-red-400'
                              }`}
                              title="Zeile entfernen"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Status Bar */}
              <div
                className={`h-9 border-t px-4 flex items-center justify-between text-[11px] font-mono shrink-0 ${
                  isSepia
                    ? 'bg-[#F2ECE1] border-[#E0D5C3] text-[#5C5042]'
                    : 'bg-[#0A0D16] border-white/[0.08] text-slate-400'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span>Geladene Positionen: {items.length}</span>
                  <span>·</span>
                  <span>
                    Ausgewählt:{' '}
                    <strong className={isSepia ? 'text-[#18130E]' : 'text-white'}>
                      {selectedItem.partNumber}
                    </strong>{' '}
                    ({selectedItem.name})
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>
                    Materialsumme:{' '}
                    <strong className={isSepia ? 'text-[#18130E]' : 'text-white'}>
                      {totalDirectMaterial.toFixed(2)} €
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    Montagezeit gesamt:{' '}
                    <strong className={isSepia ? 'text-[#0D9488]' : 'text-teal-400'}>
                      {totalLaborMinutes} Min.
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COGS BREAKDOWN */}
          {activeTab === 'cogs' && (
            <div className="p-8 overflow-y-auto space-y-6">
              <div className="max-w-4xl space-y-6">
                <div>
                  <h2
                    className={`text-xl font-bold ${
                      isSepia ? 'text-[#18130E]' : 'text-white'
                    }`}
                  >
                    Vollkostenrechnung & Herstellkosten (COGS)
                  </h2>
                  <p
                    className={`text-xs mt-1 ${
                      isSepia ? 'text-[#6B5D4E]' : 'text-slate-400'
                    }`}
                  >
                    Transparente Aufschlüsselung nach Material, Fertigungslohn und variablen Gemeinkosten.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`p-5 rounded-xl border space-y-2 ${
                      isSepia
                        ? 'border-[#E0D5C3] bg-[#FAF6EE]'
                        : 'border-white/[0.08] bg-[#121826]'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono uppercase ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      1. Materialeinzelkosten (MEK)
                    </span>
                    <div
                      className={`font-mono text-2xl font-bold ${
                        isSepia ? 'text-[#18130E]' : 'text-white'
                      }`}
                    >
                      {totalDirectMaterial.toFixed(2)} €
                    </div>
                    <div
                      className={`text-[11px] ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      {((totalDirectMaterial / unitCogs) * 100).toFixed(1)} % der Herstellkosten
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-xl border space-y-2 ${
                      isSepia
                        ? 'border-[#E0D5C3] bg-[#FAF6EE]'
                        : 'border-white/[0.08] bg-[#121826]'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono uppercase ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      2. Fertigungslohnkosten (FLK)
                    </span>
                    <div
                      className={`font-mono text-2xl font-bold ${
                        isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                      }`}
                    >
                      {totalLaborCost.toFixed(2)} €
                    </div>
                    <div
                      className={`text-[11px] ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      {(totalLaborMinutes / 60).toFixed(2)} Std. à {hourlyLaborRate} €/h
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-xl border space-y-2 ${
                      isSepia
                        ? 'border-[#E0D5C3] bg-[#FAF6EE]'
                        : 'border-white/[0.08] bg-[#121826]'
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono uppercase ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      3. Gemeinkostenzuschlag ({overheadPct}%)
                    </span>
                    <div
                      className={`font-mono text-2xl font-bold ${
                        isSepia ? 'text-[#B45309]' : 'text-amber-400'
                      }`}
                    >
                      {overheadCost.toFixed(2)} €
                    </div>
                    <div
                      className={`text-[11px] ${
                        isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'
                      }`}
                    >
                      Deckung für Maschinenabschreibung & AV
                    </div>
                  </div>
                </div>

                {/* Calculation Table */}
                <div
                  className={`rounded-xl border p-6 space-y-4 ${
                    isSepia
                      ? 'border-[#E0D5C3] bg-[#FAF6EE]'
                      : 'border-white/[0.08] bg-[#121826]'
                  }`}
                >
                  <h3
                    className={`font-display font-bold text-sm ${
                      isSepia ? 'text-[#18130E]' : 'text-white'
                    }`}
                  >
                    Staffelpreis-Kalkulation nach Losgrößen
                  </h3>
                  <div className="grid grid-cols-4 gap-4 text-xs font-mono">
                    <div
                      className={`p-3 rounded border ${
                        isSepia
                          ? 'bg-white border-[#D5C9B7]'
                          : 'bg-[#0A0D16] border-white/[0.06]'
                      }`}
                    >
                      <div className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>
                        Losgröße 1 (Muster)
                      </div>
                      <div
                        className={`text-base font-bold mt-1 ${
                          isSepia ? 'text-[#18130E]' : 'text-white'
                        }`}
                      >
                        {(unitCogs * 1.35).toFixed(2)} €
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        +35% Einzelrüstzuschlag
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border ${
                        isSepia
                          ? 'bg-white border-[#D5C9B7]'
                          : 'bg-[#0A0D16] border-white/[0.06]'
                      }`}
                    >
                      <div className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>
                        Losgröße 25
                      </div>
                      <div
                        className={`text-base font-bold mt-1 ${
                          isSepia ? 'text-[#18130E]' : 'text-white'
                        }`}
                      >
                        {(unitCogs * 1.08).toFixed(2)} €
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        +8% Rüstkostenumlage
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border ${
                        isSepia
                          ? 'bg-[#0D9488]/10 border-[#0D9488]/40'
                          : 'bg-[#0A0D16] border-teal-500/30 bg-teal-500/5'
                      }`}
                    >
                      <div
                        className={`font-bold ${
                          isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                        }`}
                      >
                        Losgröße 50 (Standard)
                      </div>
                      <div
                        className={`text-base font-bold mt-1 ${
                          isSepia ? 'text-[#0D9488]' : 'text-teal-300'
                        }`}
                      >
                        {unitCogs.toFixed(2)} €
                      </div>
                      <div
                        className={`text-[10px] mt-1 ${
                          isSepia ? 'text-[#0D9488]' : 'text-teal-400'
                        }`}
                      >
                        Basis-Serienherstellkosten
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded border ${
                        isSepia
                          ? 'bg-white border-[#D5C9B7]'
                          : 'bg-[#0A0D16] border-white/[0.06]'
                      }`}
                    >
                      <div className={isSepia ? 'text-[#7A6B5B]' : 'text-slate-400'}>
                        Losgröße 250
                      </div>
                      <div
                        className={`text-base font-bold mt-1 ${
                          isSepia ? 'text-[#047857]' : 'text-emerald-400'
                        }`}
                      >
                        {(unitCogs * 0.91).toFixed(2)} €
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        -9% Mengenskonto Lieferant
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ERP / OData Payload */}
          {activeTab === 'erp-export' && (
            <div className="flex-1 p-6 flex flex-col overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    className={`text-sm font-bold ${
                      isSepia ? 'text-[#18130E]' : 'text-white'
                    }`}
                  >
                    SAP S/4HANA & MS Business Central Schnittstellen-Payload
                  </h2>
                  <p
                    className={`text-xs ${
                      isSepia ? 'text-[#6B5D4E]' : 'text-slate-400'
                    }`}
                  >
                    Generierter OData v4 JSON-Datensatz zur Übernahme in die Standard-BOM-API.
                  </p>
                </div>
                <button
                  onClick={handleCopyJson}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold cursor-pointer ${
                    isSepia
                      ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs'
                      : 'bg-teal-500 hover:bg-teal-400 text-[#090D14]'
                  }`}
                >
                  {copiedPayload ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  <span>{copiedPayload ? 'In Zwischenablage kopiert!' : 'JSON kopieren'}</span>
                </button>
              </div>

              <div
                className={`flex-1 overflow-auto rounded-xl border p-4 ${
                  isSepia
                    ? 'border-[#D5C9B7] bg-[#F7F2E8]'
                    : 'border-white/[0.08] bg-[#070A11]'
                }`}
              >
                <pre
                  className={`font-mono text-xs leading-relaxed ${
                    isSepia ? 'text-[#0D9488]' : 'text-emerald-400'
                  }`}
                >
                  {JSON.stringify(erpPayload, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
