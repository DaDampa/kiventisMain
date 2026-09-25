import { CustomerLead, LeadType, LeadStatus } from '../types/lead';

const STORAGE_KEY = 'kiventis_customer_leads_v2';
// Private recipient address for internal lead and booking notifications (never shown to customer)
const PRIVATE_NOTIFICATION_EMAIL = 'auswander-hub@proton.me';

export const getStoredLeads = (): CustomerLead[] => {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Check legacy storage keys if present
      const legacyKeys = ['kiventis_customer_leads', 'kiventis_leads'];
      for (const k of legacyKeys) {
        const legacyVal = localStorage.getItem(k);
        if (legacyVal) {
          raw = legacyVal;
          localStorage.setItem(STORAGE_KEY, legacyVal);
          localStorage.removeItem(k);
          break;
        }
      }
    }
    if (!raw) {
      return [];
    }
    const parsed: CustomerLead[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error reading leads from storage', e);
    return [];
  }
};

export const saveNewLead = async (data: Omit<CustomerLead, 'id' | 'createdAt' | 'status'>): Promise<CustomerLead> => {
  const newLead: CustomerLead = {
    ...data,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: data.doubleOptInConfirmed ? 'verified' : 'new',
  };

  const existing = getStoredLeads();
  // Filter out any sample placeholder leads automatically when real leads are saved
  const cleanExisting = existing.filter((l) => !l.id.startsWith('lead-sample-'));
  const updated = [newLead, ...cleanExisting.filter((l) => l.email !== newLead.email || l.type !== newLead.type)];

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to write leads to localStorage', e);
  }

  // Forward lead payload to configured webhook if set
  try {
    const webhookUrl = localStorage.getItem('kiventis_lead_webhook');
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: PRIVATE_NOTIFICATION_EMAIL,
          lead: newLead,
        }),
      }).catch(() => {});
    }
  } catch {
    // Ignore webhook network issues
  }

  // Attempt local server endpoint if running
  try {
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: PRIVATE_NOTIFICATION_EMAIL,
        lead: newLead,
      }),
    }).catch(() => {});
  } catch {
    // Graceful fallback
  }

  return newLead;
};

export const updateLeadStatus = (leadId: string, status: LeadStatus, notes?: string): CustomerLead[] => {
  const existing = getStoredLeads();
  const updated = existing.map((lead) => {
    if (lead.id === leadId) {
      return {
        ...lead,
        status,
        ...(notes !== undefined ? { notes } : {}),
      };
    }
    return lead;
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update lead', e);
  }
  return updated;
};

export const deleteLead = (leadId: string): CustomerLead[] => {
  const existing = getStoredLeads();
  const targetId = String(leadId).trim();
  const updated = existing.filter((l) => String(l.id).trim() !== targetId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    localStorage.removeItem('kiventis_customer_leads');
    localStorage.removeItem('kiventis_leads');
  } catch (e) {
    console.error('Failed to delete lead', e);
  }
  return updated;
};

export const clearSampleLeads = (): CustomerLead[] => {
  const existing = getStoredLeads();
  const realLeads = existing.filter((l) => {
    const id = String(l.id || '').toLowerCase();
    const email = String(l.email || '').toLowerCase();
    const name = String(l.name || '').toLowerCase();
    return (
      !id.startsWith('lead-sample-') &&
      !id.includes('sample') &&
      !id.includes('demo') &&
      !email.includes('muster') &&
      !email.includes('example.com') &&
      !name.includes('muster') &&
      !name.includes('demo')
    );
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(realLeads));
    localStorage.removeItem('kiventis_customer_leads');
    localStorage.removeItem('kiventis_leads');
  } catch (e) {
    console.error('Failed to clear sample leads', e);
  }
  return realLeads;
};

export const clearAllLeads = (): CustomerLead[] => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.removeItem('kiventis_customer_leads');
    localStorage.removeItem('kiventis_leads');
  } catch (e) {
    console.error('Failed to reset leads', e);
  }
  return [];
};

export const exportLeadsToCsv = (leads: CustomerLead[]): void => {
  const headers = ['ID', 'Typ', 'Status', 'Name', 'E-Mail', 'Firma', 'Telefon', 'Thema / Zeitfenster', 'Double-Opt-In', 'Erstellt am', 'Vorab-Notiz'];

  const rows = leads.map((l) => [
    l.id,
    l.type === 'guide_download' ? 'Praxisleitfaden 38S' : 'Erstgespräch Termin',
    l.status,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    l.email,
    `"${(l.company || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.timeSlot || l.topic || '').replace(/"/g, '""')}"`,
    l.doubleOptInConfirmed ? 'JA (Verifiziert)' : 'NEIN',
    new Date(l.createdAt).toLocaleString('de-DE'),
    `"${(l.notes || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `KIVENTIS_Leads_Export_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const createMailtoForLead = (lead: CustomerLead): string => {
  const subject = encodeURIComponent(
    `Ihre Terminanfrage bei KIVENTIS: ${lead.type === 'guide_download' ? 'KMU-Praxisleitfaden' : 'Erstberatung'}`
  );
  const body = encodeURIComponent(
    `Sehr geehrte/r Frau/Herr ${lead.name},\n\nvielen Dank für Ihre Terminanfrage für ${
      lead.timeSlot || 'ein 30-minütiges Beratungsgespräch'
    }.\n\nWir bestätigen Ihren Termin hiermit gerne und senden Ihnen in Kürze die Video-Call-Einladung.\n\nMit freundlichen Grüßen,\nKIVENTIS B2B Team`
  );
  return `mailto:${lead.email}?subject=${subject}&body=${body}`;
};

/**
 * Creates mailto link directly addressed to the private notification mailbox
 * with all lead and appointment details formatted cleanly.
 */
export const createOwnerNotificationMailto = (lead: CustomerLead): string => {
  const subject = encodeURIComponent(
    `[NEUER TERMIN] ${lead.name} - ${lead.company || 'Unternehmen'} (${lead.timeSlot || lead.topic})`
  );
  const body = encodeURIComponent(
    `Neue Terminanfrage eingegangen:\n\n` +
      `--------------------------------------------------\n` +
      `KONTAKTDATEN DES INTERESSENTEN:\n` +
      `Name: ${lead.name}\n` +
      `E-Mail: ${lead.email}\n` +
      `Firma: ${lead.company || 'Nicht angegeben'}\n` +
      `Telefon: ${lead.phone || 'Nicht angegeben'}\n\n` +
      `TERMIN & THEMA:\n` +
      `Gewähltes Zeitfenster: ${lead.timeSlot || 'Nicht spezifiziert'}\n` +
      `Paket / Thema: ${lead.topic || '30-Min. Erstgespräch'}\n` +
      `Vorab-Notiz / Fragen: ${lead.notes || 'Keine Notiz hinterlegt'}\n\n` +
      `METADATEN:\n` +
      `Double-Opt-In bestätigt: ${lead.doubleOptInConfirmed ? 'JA' : 'NEIN'}\n` +
      `Eingegangen am: ${new Date(lead.createdAt).toLocaleString('de-DE')}\n` +
      `Lead-ID: ${lead.id}\n` +
      `--------------------------------------------------`
  );
  return `mailto:${PRIVATE_NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
};
