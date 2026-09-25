import React, { useState, useEffect } from 'react';
import { CustomerLead, LeadStatus } from '../types/lead';
import {
  getStoredLeads,
  updateLeadStatus,
  deleteLead,
  clearSampleLeads,
  clearAllLeads,
  exportLeadsToCsv,
  createMailtoForLead,
  createOwnerNotificationMailto,
} from '../services/leadService';
import {
  X,
  Download,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Trash2,
  Copy,
  Check,
  Search,
  Users,
  ShieldCheck,
  Send,
  Calendar,
  Lock,
  Unlock,
  KeyRound,
  AlertCircle,
  LogOut,
  RefreshCw,
} from 'lucide-react';

interface AdminLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const REQUIRED_PIN = '9250';
const AUTH_STORAGE_KEY = 'kiventis_admin_authenticated';

export const AdminLeadModal: React.FC<AdminLeadModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });

  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [leads, setLeads] = useState<CustomerLead[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => localStorage.getItem('kiventis_lead_webhook') || '');
  const [webhookSaved, setWebhookSaved] = useState(false);

  const showToast = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3200);
  };

  useEffect(() => {
    if (isOpen) {
      // Check if session is already authenticated
      const auth = sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
      setIsAuthenticated(auth);
      if (auth) {
        setLeads(getStoredLeads());
      }
      setPinInput('');
      setPinError('');
      setDeleteConfirmId(null);
      setShowClearAllConfirm(false);
      setFeedbackMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === REQUIRED_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setPinError('');
      setLeads(getStoredLeads());
    } else {
      setPinError('Ungültiger PIN-Code. Zugriff verweigert.');
      setPinInput('');
    }
  };

  const handlePinDigit = (digit: string) => {
    if (pinInput.length < 4) {
      const nextPin = pinInput + digit;
      setPinInput(nextPin);
      setPinError('');
      if (nextPin.length === 4) {
        if (nextPin === REQUIRED_PIN) {
          setIsAuthenticated(true);
          sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
          setLeads(getStoredLeads());
        } else {
          setPinError('Ungültiger PIN-Code. Zugriff verweigert.');
          setTimeout(() => setPinInput(''), 400);
        }
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setPinInput('');
    setPinError('');
  };

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (leadId: string) => {
    const updated = deleteLead(leadId);
    setLeads(updated);
    setDeleteConfirmId(null);
    showToast('Lead wurde erfolgreich gelöscht.');
  };

  const handleClearSampleData = () => {
    const updated = clearSampleLeads();
    setLeads(updated);
    showToast('Demodaten wurden erfolgreich entfernt.');
  };

  const handleClearAll = () => {
    const updated = clearAllLeads();
    setLeads(updated);
    setShowClearAllConfirm(false);
    showToast('Alle Leads wurden gelöscht.');
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('kiventis_lead_webhook', webhookUrl.trim());
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2500);
  };

  const filteredLeads = leads.filter((l) => {
    if (filterType !== 'all' && l.type !== filterType) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q))
    );
  });

  const isSampleLead = (l: CustomerLead) => {
    const id = String(l.id || '').toLowerCase();
    const email = String(l.email || '').toLowerCase();
    const name = String(l.name || '').toLowerCase();
    return (
      id.startsWith('lead-sample-') ||
      id.includes('sample') ||
      id.includes('demo') ||
      email.includes('muster') ||
      email.includes('example.com') ||
      name.includes('muster') ||
      name.includes('demo')
    );
  };

  const guideCount = leads.filter((l) => l.type === 'guide_download').length;
  const bookingCount = leads.filter((l) => l.type === 'discovery_booking').length;
  const hasSampleData = leads.some(isSampleLead);

  // -------------------------------------------------------------
  // VIEW 1: PIN CODE PROTECTION SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0E1524] p-6 sm:p-8 text-white shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4 shadow-lg shadow-teal-500/10">
              <Lock className="h-7 w-7" />
            </div>

            <div className="text-xs font-mono font-semibold tracking-wider text-teal-400 uppercase">
              Administrator-Sicherheit
            </div>
            <h2 className="text-xl font-bold font-display text-white mt-1">
              Geschützter Admin-Bereich
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Geben Sie den 4-stelligen Sicherheitscode ein, um Kundendaten, E-Mails und Termine einzusehen.
            </p>

            {/* PIN Dots Display */}
            <div className="flex justify-center gap-3 my-6">
              {[0, 1, 2, 3].map((index) => {
                const isFilled = pinInput.length > index;
                return (
                  <div
                    key={index}
                    className={`w-12 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-mono transition-all ${
                      isFilled
                        ? 'border-teal-400 bg-teal-500/15 text-white font-bold ring-2 ring-teal-500/30'
                        : 'border-white/15 bg-white/[0.02] text-slate-500'
                    }`}
                  >
                    {isFilled ? '●' : '○'}
                  </div>
                );
              })}
            </div>

            {pinError && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center justify-center gap-1.5">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            {/* Direct Input Field for keyboard / mobile */}
            <form onSubmit={handlePinSubmit} className="mb-4">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoFocus
                placeholder="PIN eingeben (z. B. 9250)"
                value={pinInput}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setPinInput(val);
                  setPinError('');
                  if (val === REQUIRED_PIN) {
                    setIsAuthenticated(true);
                    sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
                    setLeads(getStoredLeads());
                  }
                }}
                className="w-full text-center tracking-widest font-mono text-base py-2.5 px-4 rounded-xl border border-white/10 bg-[#090D14] text-white placeholder-slate-600 focus:outline-hidden focus:border-teal-400"
              />
            </form>

            {/* Numeric Keypad for fast touch/mouse entry */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-4">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  type="button"
                  onClick={() => handlePinDigit(digit)}
                  className="py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] active:bg-teal-500/20 text-white font-mono text-lg font-semibold transition-all cursor-pointer"
                >
                  {digit}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPinInput('')}
                className="py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-xs text-slate-400 font-mono transition-all cursor-pointer"
              >
                Löschen
              </button>
              <button
                type="button"
                onClick={() => handlePinDigit('0')}
                className="py-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] active:bg-teal-500/20 text-white font-mono text-lg font-semibold transition-all cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handlePinSubmit()}
                className="py-3 rounded-xl border border-teal-500/40 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-mono text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Unlock className="h-3.5 w-3.5" />
                <span>OK</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-mono">
              Sicherheitshinweis: Zugang ausschließlich für autorisierte KIVENTIS-Administratoren.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: UNLOCKED ADMIN LEAD DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0E1524] text-white shadow-2xl my-6 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-center justify-between bg-[#121B2E] rounded-t-2xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6] font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>INTERNER LEAD-MANAGER & KUNDENDATEN-ZENTRALE</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                PIN-Autorisiert
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
              Erfasste Kundenanfragen & Termine
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Alle Interessenten aus dem 38-Seiten-Praxisleitfaden und Erstgespräch-Buchungen.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportLeadsToCsv(leads)}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-[#090D14] text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CSV Export</span>
            </button>

            {hasSampleData && (
              <button
                onClick={handleClearSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-colors cursor-pointer"
                title="Löscht die beiden Demo-Mustereinträge und behält nur echte Anfragen"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Demodaten löschen</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
              title="Admin-Bereich sperren"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-400" />
              <span>Sperren</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Schließen"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Toast / Feedback message */}
        {feedbackMessage && (
          <div className="px-5 py-2.5 bg-emerald-500/15 border-b border-emerald-500/30 flex items-center justify-between gap-2 text-xs text-emerald-300 font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{feedbackMessage}</span>
            </div>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="text-emerald-400/70 hover:text-emerald-300 text-[11px] cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Clear All Confirmation Banner */}
        {showClearAllConfirm && (
          <div className="px-5 py-3 bg-red-500/15 border-b border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-red-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
              <span>Möchten Sie wirklich die <strong>gesamte Lead-Liste leeren</strong>? Diese Aktion kann nicht rückgängig gemacht werden.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleClearAll}
                className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold cursor-pointer transition-colors shadow-sm"
              >
                Ja, Liste leeren
              </button>
              <button
                type="button"
                onClick={() => setShowClearAllConfirm(false)}
                className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 cursor-pointer transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Stats bar */}
        <div className="p-4 sm:p-6 bg-[#090D14] border-b border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg border border-white/10 bg-white/[0.02]">
            <span className="text-slate-400 block text-[11px]">Gesamt Leads</span>
            <span className="text-xl font-bold text-white">{leads.length}</span>
          </div>
          <div className="p-3 rounded-lg border border-teal-500/20 bg-teal-500/5">
            <span className="text-teal-400 block text-[11px]">Praxisleitfaden (38S)</span>
            <span className="text-xl font-bold text-teal-300">{guideCount}</span>
          </div>
          <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
            <span className="text-blue-400 block text-[11px]">Erstgespräche</span>
            <span className="text-xl font-bold text-blue-300">{bookingCount}</span>
          </div>
          <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
            <span className="text-emerald-400 block text-[11px]">Private Ziel-E-Mail (Admin)</span>
            <span className="text-xs font-semibold text-emerald-300 truncate block">auswander-hub@proton.me</span>
          </div>
        </div>

        {/* Filters and search */}
        <div className="p-4 border-b border-white/[0.06] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-[#0A0F1D]">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Suche nach Name, E-Mail, Firma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-white/10 bg-[#090D14] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#14B8A6]"
              />
            </div>

            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                  filterType === 'all'
                    ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-teal-300 font-semibold'
                    : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                Alle ({leads.length})
              </button>
              <button
                onClick={() => setFilterType('guide_download')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                  filterType === 'guide_download'
                    ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-teal-300 font-semibold'
                    : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                Leitfaden ({guideCount})
              </button>
              <button
                onClick={() => setFilterType('discovery_booking')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs cursor-pointer ${
                  filterType === 'discovery_booking'
                    ? 'border-[#14B8A6] bg-[#14B8A6]/10 text-teal-300 font-semibold'
                    : 'border-white/10 bg-white/[0.02] text-slate-400 hover:text-white'
                }`}
              >
                Termine ({bookingCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {leads.length > 0 && (
              <a
                href={createOwnerNotificationMailto(leads[0])}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-300 transition-colors"
                title="Öffnet Ihren E-Mail-Client mit den Daten des letzten Leads an auswander-hub@proton.me"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Letzten Lead per Mail öffnen</span>
              </a>
            )}

            {leads.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearAllConfirm(true)}
                className="text-xs text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                title="Gesamte Liste leeren"
              >
                Liste leeren
              </button>
            )}
          </div>
        </div>

        {/* Lead Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-16 text-slate-500 text-xs">
              <Users className="h-8 w-8 mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="font-semibold text-slate-400">Keine Leads oder Anfragen vorhanden.</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Sobald Besucher den Praxisleitfaden anfordern oder einen Erstgespräch-Termin buchen, erscheinen ihre Kontaktdaten automatisch hier.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLeads.map((lead) => {
                const isSample = isSampleLead(lead);
                return (
                  <div
                    key={lead.id}
                    className={`p-4 rounded-xl border transition-all text-xs ${
                      isSample
                        ? 'border-amber-500/20 bg-[#090D14]/70'
                        : 'border-white/[0.08] bg-[#090D14] hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">{lead.name}</span>
                        {isSample && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            Demodaten
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                            lead.type === 'guide_download'
                              ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                              : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          {lead.type === 'guide_download' ? '38S Leitfaden' : 'Erstberatung Termin'}
                        </span>
                        {lead.doubleOptInConfirmed && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>Double-Opt-In OK</span>
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] font-mono text-slate-500">
                        {new Date(lead.createdAt).toLocaleString('de-DE')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                          <span className="font-mono text-white select-all">{lead.email}</span>
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(lead.email, lead.id)}
                            className="p-1 rounded hover:bg-white/[0.05] text-slate-400 hover:text-white cursor-pointer"
                            title="E-Mail kopieren"
                          >
                            {copiedId === lead.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          </button>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                            <span className="font-mono">{lead.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        {lead.company && (
                          <div className="flex items-center gap-1.5">
                            <Building className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                            <span>{lead.company}</span>
                          </div>
                        )}
                        {(lead.timeSlot || lead.topic) && (
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Calendar className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                            <span className="text-teal-200">{lead.timeSlot || lead.topic}</span>
                          </div>
                        )}
                        {lead.notes && (
                          <div className="text-[11px] text-slate-400 italic bg-white/[0.02] p-1.5 rounded border border-white/[0.04]">
                            {lead.notes}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-start sm:justify-end gap-2 pt-2 sm:pt-0">
                        <a
                          href={createMailtoForLead(lead)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 text-teal-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          <span>Kunden anschreiben</span>
                        </a>

                        {deleteConfirmId === lead.id ? (
                          <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 px-2 py-1 rounded-lg">
                            <span className="text-[11px] text-red-200 font-semibold whitespace-nowrap">Löschen?</span>
                            <button
                              type="button"
                              onClick={() => handleDelete(lead.id)}
                              className="px-2 py-0.5 rounded bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold cursor-pointer transition-colors"
                            >
                              Ja
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-slate-300 text-[10px] cursor-pointer transition-colors"
                            >
                              Abbrechen
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(lead.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                            title="Diesen Lead löschen"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Webhook & Notification Settings footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#0A0F1D] rounded-b-2xl text-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-slate-400">
              <strong className="text-white">Private Benachrichtigung:</strong> Neue Termine & Leads werden intern erfasst und an{' '}
              <span className="text-emerald-400 font-mono">auswander-hub@proton.me</span> gesendet.
            </div>

            <form onSubmit={handleSaveWebhook} className="flex gap-2 w-full sm:w-auto">
              <input
                type="url"
                placeholder="Optional: Zapier/Slack/Make Webhook URL"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-[#090D14] text-white placeholder-slate-500 sm:w-72 focus:outline-hidden focus:border-[#14B8A6]"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                {webhookSaved ? 'Gespeichert!' : 'Webhook speichern'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
