import React from 'react';
import { X, ShieldCheck, Mail, MapPin, Building, Globe } from 'lucide-react';
import { Language } from '../types';

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ImpressumModal: React.FC<ImpressumModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const isDe = lang === 'de';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0E1524] p-6 sm:p-8 text-slate-200 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-[#14B8A6] border border-teal-500/20">
              <Building className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                {isDe ? 'Impressum & Rechtliche Angaben' : 'Legal Notice / Imprint'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {isDe ? 'Angaben gemäß § 5 TMG / DDG' : 'Information according to legal regulations'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-xs text-slate-300 leading-relaxed">
          {/* Company Details */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#14B8A6]" />
              <span>Diensteanbieter / Betreiber</span>
            </h4>
            <div className="text-slate-200 font-mono text-xs space-y-1">
              <div className="text-white font-bold text-sm">ERP and Marketing Solutions LLC</div>
              <div>1209 Mountain Road PL NE, STE R</div>
              <div>Albuquerque, NM 87110</div>
              <div>USA</div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#14B8A6]" />
              <span>Kontakt</span>
            </h4>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">E-Mail:</span>
                <a
                  href="mailto:Kontakt@kiventis.com"
                  className="text-[#14B8A6] hover:underline"
                >
                  Kontakt@kiventis.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Website:</span>
                <span className="text-white">https://kiventis.com</span>
              </div>
            </div>
          </div>

          {/* Legal Notes / Haftungsausschluss */}
          <div className="space-y-4 text-[11px] text-slate-400">
            <div>
              <h5 className="font-semibold text-slate-200 mb-1">
                {isDe ? 'Haftung für Inhalte' : 'Liability for Contents'}
              </h5>
              <p>
                {isDe
                  ? 'Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.'
                  : 'As a service provider, we are responsible for our own content on these pages under general laws. We are not obliged to monitor transmitted or stored third-party information or to investigate circumstances indicating unlawful activity.'}
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-slate-200 mb-1">
                {isDe ? 'Haftung für Links' : 'Liability for External Links'}
              </h5>
              <p>
                {isDe
                  ? 'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.'
                  : 'Our site contains links to external third-party websites over whose content we have no control. The respective provider or operator of the linked pages is always responsible for their content.'}
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-slate-200 mb-1">
                {isDe ? 'Urheberrecht & Marken' : 'Copyright & Intellectual Property'}
              </h5>
              <p>
                {isDe
                  ? 'Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem Urheberrecht. KIVENTIS ist eine Initiative der ERP and Marketing Solutions LLC. Beiträge Dritter sind als solche gekennzeichnet.'
                  : 'The content and works provided on these web pages are governed by copyright law. KIVENTIS is an initiative of ERP and Marketing Solutions LLC.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#090D14] text-xs font-bold px-5 py-2 transition-colors cursor-pointer"
          >
            {isDe ? 'Schließen' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
