export type LeadType = 'guide_download' | 'discovery_booking' | 'contact_request';

export type LeadStatus = 'new' | 'verified' | 'contacted' | 'converted';

export interface CustomerLead {
  id: string;
  type: LeadType;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  topic?: string;
  timeSlot?: string;
  notes?: string;
  doubleOptInConfirmed: boolean;
  optInTimestamp?: string;
  createdAt: string;
  status: LeadStatus;
}
