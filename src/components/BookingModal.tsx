import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  User,
  Building,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { saveNewLead } from '../services/leadService';
import { getDynamicTimeSlots, CalculatedSlot } from '../utils/dateSlots';

interface BookingModalProps {
  lang: Language;
  isOpen: boolean;
  preselectedPackage?: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  lang,
  isOpen,
  preselectedPackage,
  onClose,
}) => {
  const t = translations[lang].bookingModal;

  const [step, setStep] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>(preselectedPackage ? 'scan' : 'vibe');
  const [companySize, setCompanySize] = useState<string>(t.companySizes[1]);
  const [region, setRegion] = useState<string>(t.regions[0]);

  // Dynamic calculated time slots
  const dynamicSlots = useMemo(() => getDynamicTimeSlots(lang), [lang, isOpen]);
  const [selectedSlot, setSelectedSlot] = useState<CalculatedSlot>(dynamicSlots[0]);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const notesTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Keep selected slot updated if dynamicSlots change
  useEffect(() => {
    if (dynamicSlots.length > 0 && !dynamicSlots.find((s) => s.id === selectedSlot.id)) {
      setSelectedSlot(dynamicSlots[0]);
    }
  }, [dynamicSlots]);

  if (!isOpen) return null;

  const handleSelectSlot = (slot: CalculatedSlot) => {
    setSelectedSlot(slot);
    if (slot.isCustomNotes) {
      setTimeout(() => {
        notesTextareaRef.current?.focus();
      }, 100);
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1 && !selectedTopic) {
      setErrorMsg(lang === 'de' ? 'Bitte wählen Sie ein Thema aus.' : 'Please select a topic.');
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg(lang === 'de' ? 'Bitte geben Sie Ihren Namen an.' : 'Please provide your full name.');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg(lang === 'de' ? 'Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse an.' : 'Please enter a valid business email.');
      return;
    }
    if (!formData.company.trim()) {
      setErrorMsg(lang === 'de' ? 'Bitte nennen Sie Ihr Unternehmen.' : 'Please state your company name.');
      return;
    }

    const matchedTopic = t.topics.find((tp) => tp.id === selectedTopic);
    const topicLabel = matchedTopic ? matchedTopic.label : 'Allgemeine B2B KI-Beratung';

    // Save lead to persistent storage and trigger background dispatch
    saveNewLead({
      type: 'discovery_booking',
      name: formData.name.trim(),
      email: formData.email.trim(),
      company: formData.company.trim(),
      phone: formData.phone.trim() || undefined,
      topic: `${topicLabel} · ${companySize} MA · ${region}`,
      timeSlot: selectedSlot.fullLabel,
      doubleOptInConfirmed: true,
      optInTimestamp: new Date().toISOString(),
      notes: formData.notes.trim()
        ? `Vorab-Notiz: ${formData.notes.trim()}`
        : selectedSlot.isCustomNotes
        ? 'Wunschtermin erbeten (Vorschläge in Vorab-Notiz)'
        : 'Standard-Slot gewählt',
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0E1524] p-6 sm:p-8 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors"
          aria-label="Schließen"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#14B8A6]">
                30-MIN. ERSTGESPRÄCH · VIRTUELLE ERSTBERATUNG
              </span>
              <h3 className="mt-1 text-2xl font-bold font-display text-white">
                {t.title}
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                {t.subtitle}
              </p>
            </div>

            {/* Step Progress Indicators */}
            <div className="mt-6 flex items-center justify-between border-b border-white/[0.08] pb-4 text-xs font-mono">
              <span className={step >= 1 ? 'text-[#14B8A6] font-bold' : 'text-slate-500'}>
                {t.step1}
              </span>
              <span className="text-slate-600">→</span>
              <span className={step >= 2 ? 'text-[#14B8A6] font-bold' : 'text-slate-500'}>
                {t.step2}
              </span>
              <span className="text-slate-600">→</span>
              <span className={step >= 3 ? 'text-[#14B8A6] font-bold' : 'text-slate-500'}>
                {t.step3}
              </span>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            {/* STEP 1: TOPIC SELECTION */}
            {step === 1 && (
              <div className="mt-6 space-y-3">
                {t.topics.map((tp) => (
                  <div
                    key={tp.id}
                    onClick={() => setSelectedTopic(tp.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedTopic === tp.id
                        ? 'border-[#14B8A6] bg-[#14B8A6]/[0.08] shadow-md ring-1 ring-[#14B8A6]/30'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">{tp.label}</span>
                      {selectedTopic === tp.id && (
                        <CheckCircle2 className="h-4 w-4 text-[#14B8A6] shrink-0" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {tp.desc}
                    </p>
                  </div>
                ))}

                <div className="pt-4 flex justify-end border-t border-white/[0.06]">
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-5 py-2.5 transition-all cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Weiter zur Unternehmensgröße' : 'Continue'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: COMPANY SIZE & REGION */}
            {step === 2 && (
              <div className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-semibold text-white block mb-2">
                    {t.companySizeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {t.companySizes.map((size, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCompanySize(size)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                          companySize === size
                            ? 'border-[#14B8A6] bg-[#14B8A6]/[0.08] text-white font-bold'
                            : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-white block mb-2">
                    {t.regionLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {t.regions.map((reg, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setRegion(reg)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-colors cursor-pointer ${
                          region === reg
                            ? 'border-[#14B8A6] bg-[#14B8A6]/[0.08] text-white font-bold'
                            : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20'
                        }`}
                      >
                        {reg}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    {lang === 'de' ? '← Zurück' : '← Back'}
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-5 py-2.5 transition-all cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Weiter zur Terminauswahl' : 'Select Time Slot'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DYNAMIC CALCULATED TIME SLOTS & CONTACT FORM */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-[#14B8A6]" />
                      <span>{lang === 'de' ? 'Verfügbare Terminfenster' : 'Available Time Slots'}</span>
                    </label>
                    <span className="text-[11px] font-mono text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded border border-[#14B8A6]/20">
                      Dynamisch berechnet
                    </span>
                  </div>

                  {/* 5 Time Slot Tiles with dynamically calculated dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {dynamicSlots.map((slot) => {
                      const isSelected = selectedSlot.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                            slot.isCustomNotes ? 'sm:col-span-2' : ''
                          } ${
                            isSelected
                              ? 'border-[#14B8A6] bg-[#14B8A6]/15 text-white ring-1 ring-[#14B8A6]/40 shadow-sm'
                              : 'border-white/[0.08] bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-white">
                                {slot.isCustomNotes ? (
                                  <MessageSquare className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                                ) : (
                                  <CalendarDays className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                                )}
                                <span>
                                  {slot.dayTitle}
                                  {slot.dateStr && (
                                    <span className="ml-1 text-teal-300 font-mono text-xs">
                                      ({slot.dateStr})
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="text-xs text-slate-300 flex items-center gap-1">
                                {!slot.isCustomNotes && <Clock className="h-3 w-3 text-slate-400 shrink-0" />}
                                <span className={slot.isCustomNotes ? 'italic text-teal-200' : ''}>
                                  {slot.timeWindow}
                                </span>
                              </div>
                            </div>

                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedSlot.isCustomNotes && (
                    <div className="mt-2 p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-200 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-teal-300 shrink-0" />
                      <span>
                        {lang === 'de'
                          ? 'Wunschtermin aktiv: Bitte nennen Sie unten im Notizfeld Ihre bevorzugten Tage und Uhrzeiten.'
                          : 'Custom slot active: Please specify your preferred days and times in the notes field below.'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contact Input Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06]">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {t.formLabels.name} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z. B. Dr. Stefan Meier"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {t.formLabels.email} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@unternehmen.de"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {t.formLabels.company} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="z. B. Präzisionstechnik GmbH"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1 font-medium">
                      {t.formLabels.phone}
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 170 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1 font-medium">
                    {lang === 'de' ? 'Vorab-Notiz / Fragen / Terminvorschläge' : 'Preliminary Notes / Suggestions'}
                  </label>
                  <textarea
                    ref={notesTextareaRef}
                    rows={2}
                    placeholder={
                      selectedSlot.isCustomNotes
                        ? lang === 'de'
                          ? 'z. B. Bevorzugter Tag: Donnerstag ab 14:00 Uhr oder Freitag nachmittags...'
                          : 'e.g. Preferred days: Thursday from 2:00 PM or Friday afternoon...'
                        : lang === 'de'
                        ? 'Aktuelle Herausforderung, Wunschschwerpunkt oder konkrete Fragen...'
                        : 'Current challenges or specific questions...'
                    }
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#090D14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#14B8A6] focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    {lang === 'de' ? '← Zurück' : '← Back'}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] font-bold text-xs sm:text-sm px-6 py-2.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>{t.formLabels.submit}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* SUCCESS CONFIRMATION SCREEN (Protected: Customer NEVER sees the internal notification mail) */
          <div className="py-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-2xl font-bold font-display text-white">
              {t.successTitle}
            </h3>

            <p className="mt-2 text-sm text-slate-300 max-w-md mx-auto">
              {t.successDesc}
            </p>

            {/* Appointment Summary Box */}
            <div className="mt-6 max-w-md mx-auto rounded-xl border border-white/[0.08] bg-[#090D14] p-4 text-left text-xs font-mono space-y-2">
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Gewählter Termin:</span>
                <span className="text-teal-300 font-bold text-right">{selectedSlot.fullLabel}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Teilnehmer:</span>
                <span className="text-white">{formData.name} ({formData.company})</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-2">
                <span className="text-slate-400">Bestätigung an:</span>
                <span className="text-emerald-400">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Betreuung:</span>
                <span className="text-slate-200">KIVENTIS B2B Executive Advisory</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                  'KIVENTIS 30-Min KI-Erstgespräch'
                )}&details=${encodeURIComponent(
                  `Virtuelles Beratungsgespräch zu Vibe Coding, EU AI Act und ROI.\nTermin: ${selectedSlot.fullLabel}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold px-4 py-2.5 text-white transition-colors cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Google Calendar vormerken</span>
              </a>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold px-6 py-2.5 transition-colors cursor-pointer"
              >
                {t.closeBtn}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
