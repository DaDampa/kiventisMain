export interface CalculatedSlot {
  id: string;
  dayTitle: string;
  dateStr: string;
  timeWindow: string;
  fullLabel: string;
  isCustomNotes?: boolean;
}

/**
 * Calculates upcoming dynamic dates for the requested schedule slots:
 * - Nächsten Montag zwischen 13 und 15 Uhr
 * - Nächsten Mittwoch zwischen 13 und 15 Uhr
 * - Nächsten Freitag zwischen 09:00 und 11:00 Uhr (MEZ)
 * - Nächsten Samstag zwischen 08:00 und 11:00 Uhr
 * - Kachel: "Geben Sie uns Vorschläge in der Vorab-Notiz"
 */
export function getDynamicTimeSlots(lang: 'de' | 'en' = 'de'): CalculatedSlot[] {
  const now = new Date();

  // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
  const getNextDateForDay = (targetDay: number): Date => {
    const d = new Date(now);
    const currentDay = d.getDay();
    let daysAhead = (targetDay - currentDay + 7) % 7;

    // If target day is today, push to next week so appointments have reasonable prep time
    if (daysAhead === 0) {
      daysAhead = 7;
    }
    d.setDate(d.getDate() + daysAhead);
    return d;
  };

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatGermanDate = (d: Date) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
  const formatEnglishDate = (d: Date) => `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;

  const monday = getNextDateForDay(1);
  const wednesday = getNextDateForDay(3);
  const friday = getNextDateForDay(5);
  const saturday = getNextDateForDay(6);

  if (lang === 'de') {
    return [
      {
        id: 'monday',
        dayTitle: 'Nächsten Montag',
        dateStr: formatGermanDate(monday),
        timeWindow: 'zwischen 13:00 und 15:00 Uhr',
        fullLabel: `Nächsten Montag (${formatGermanDate(monday)}) zwischen 13:00 und 15:00 Uhr`,
      },
      {
        id: 'wednesday',
        dayTitle: 'Nächsten Mittwoch',
        dateStr: formatGermanDate(wednesday),
        timeWindow: 'zwischen 13:00 und 15:00 Uhr',
        fullLabel: `Nächsten Mittwoch (${formatGermanDate(wednesday)}) zwischen 13:00 und 15:00 Uhr`,
      },
      {
        id: 'friday',
        dayTitle: 'Nächsten Freitag',
        dateStr: formatGermanDate(friday),
        timeWindow: 'zwischen 09:00 und 11:00 Uhr (MEZ)',
        fullLabel: `Nächsten Freitag (${formatGermanDate(friday)}) zwischen 09:00 und 11:00 Uhr (MEZ)`,
      },
      {
        id: 'saturday',
        dayTitle: 'Nächsten Samstag',
        dateStr: formatGermanDate(saturday),
        timeWindow: 'zwischen 08:00 und 11:00 Uhr',
        fullLabel: `Nächsten Samstag (${formatGermanDate(saturday)}) zwischen 08:00 und 11:00 Uhr`,
      },
      {
        id: 'custom_notes',
        dayTitle: 'Wunschtermin / Individuell',
        dateStr: '',
        timeWindow: 'Geben Sie uns Vorschläge in der Vorab-Notiz',
        fullLabel: 'Individueller Wunschtermin (Vorschläge in der Vorab-Notiz angegeben)',
        isCustomNotes: true,
      },
    ];
  } else {
    return [
      {
        id: 'monday',
        dayTitle: 'Next Monday',
        dateStr: formatEnglishDate(monday),
        timeWindow: 'between 1:00 PM and 3:00 PM (CET)',
        fullLabel: `Next Monday (${formatEnglishDate(monday)}) between 1:00 PM and 3:00 PM (CET)`,
      },
      {
        id: 'wednesday',
        dayTitle: 'Next Wednesday',
        dateStr: formatEnglishDate(wednesday),
        timeWindow: 'between 1:00 PM and 3:00 PM (CET)',
        fullLabel: `Next Wednesday (${formatEnglishDate(wednesday)}) between 1:00 PM and 3:00 PM (CET)`,
      },
      {
        id: 'friday',
        dayTitle: 'Next Friday',
        dateStr: formatEnglishDate(friday),
        timeWindow: 'between 09:00 AM and 11:00 AM (CET)',
        fullLabel: `Next Friday (${formatEnglishDate(friday)}) between 09:00 AM and 11:00 AM (CET)`,
      },
      {
        id: 'saturday',
        dayTitle: 'Next Saturday',
        dateStr: formatEnglishDate(saturday),
        timeWindow: 'between 08:00 AM and 11:00 AM (CET)',
        fullLabel: `Next Saturday (${formatEnglishDate(saturday)}) between 08:00 AM and 11:00 AM (CET)`,
      },
      {
        id: 'custom_notes',
        dayTitle: 'Custom Preferred Slot',
        dateStr: '',
        timeWindow: 'Provide suggestions in preliminary notes',
        fullLabel: 'Custom Preferred Slot (Suggestions in preliminary notes)',
        isCustomNotes: true,
      },
    ];
  }
}
