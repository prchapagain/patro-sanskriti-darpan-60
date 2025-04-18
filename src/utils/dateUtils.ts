// Nepali date conversion utilities
// These functions handle conversion between Bikram Sambat and Gregorian calendars

interface BsMonth {
  np: string;
  en: string;
}

interface BsDay {
  np: string;
  en: string;
}

interface Festival {
  np: string;
  en: string;
  type: 'festival' | 'thithi' | 'special';
}

interface DayInfo {
  festivals: Festival[];
  thithi?: {
    np: string;
    en: string;
  };
}

// Nepali months in both Nepali and English
export const bsMonths: BsMonth[] = [
  { np: "बैशाख", en: "Baisakh" },
  { np: "जेठ", en: "Jestha" },
  { np: "असार", en: "Ashar" },
  { np: "श्रावण", en: "Shrawan" },
  { np: "भदौ", en: "Bhadra" },
  { np: "आश्विन", en: "Ashwin" },
  { np: "कार्तिक", en: "Kartik" },
  { np: "मंसिर", en: "Mangsir" },
  { np: "पुष", en: "Poush" },
  { np: "माघ", en: "Magh" },
  { np: "फाल्गुन", en: "Falgun" },
  { np: "चैत्र", en: "Chaitra" }
];

// Nepali days in both Nepali and English
export const bsDays: BsDay[] = [
  { np: "आइत", en: "Sun" },
  { np: "सोम", en: "Mon" },
  { np: "मंगल", en: "Tue" },
  { np: "बुध", en: "Wed" },
  { np: "बिही", en: "Thu" },
  { np: "शुक्र", en: "Fri" },
  { np: "शनि", en: "Sat" }
];

// Nepali digits
export const nepaliDigits: { [key: string]: string } = {
  "0": "०",
  "1": "१",
  "2": "२",
  "3": "३",
  "4": "४",
  "5": "५",
  "6": "६",
  "7": "७",
  "8": "८",
  "9": "९"
};

// Convert English digits to Nepali digits
export function toNepaliDigits(num: number): string {
  return num.toString().split('').map(digit => nepaliDigits[digit] || digit).join('');
}

// Simple BS-to-AD mapping (simplified for demo)
// In a real app, this would be a more complex calculation
export const bsMonthLengths: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2080 BS (2023-2024 AD)
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 30]  // 2081 BS (2024-2025 AD)
};

// Enhanced festivals data structure with both Nepali and English names
export const festivals: { [key: string]: { [key: string]: { [key: string]: DayInfo } } } = {
  "2080": {
    "1": {
      "14": {
        festivals: [
          { np: "नयाँ वर्ष", en: "New Year", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      },
      "15": {
        festivals: [
          { np: "मेष संक्रान्ति", en: "Mesh Sankranti", type: "special" }
        ],
        thithi: { np: "प्रतिपदा", en: "Pratipada" }
      }
    },
    "2": {
      "5": {
        festivals: [
          { np: "बुद्ध जयन्ति", en: "Buddha Jayanti", type: "festival" }
        ],
        thithi: { np: "पञ्चमी", en: "Panchami" }
      }
    },
    "3": {
      "29": {
        festivals: [
          { np: "रक्षा बन्धन", en: "Raksha Bandhan", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      }
    },
    "6": {
      "24": {
        festivals: [
          { np: "दशैं", en: "Dashain", type: "festival" }
        ],
        thithi: { np: "नवमी", en: "Navami" }
      }
    },
    "7": {
      "12": {
        festivals: [
          { np: "तिहार", en: "Tihar", type: "festival" }
        ],
        thithi: { np: "द्वादशी", en: "Dwadashi" }
      }
    }
  },
  "2081": {
    "1": {
      "14": {
        festivals: [
          { np: "नयाँ वर्ष", en: "New Year", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      }
    },
    "2": {
      "15": {
        festivals: [
          { np: "बुद्ध जयन्ति", en: "Buddha Jayanti", type: "festival" }
        ],
        thithi: { np: "पञ्चमी", en: "Panchami" }
      }
    },
    "6": {
      "12": {
        festivals: [
          { np: "दशैं", en: "Dashain", type: "festival" }
        ],
        thithi: { np: "नवमी", en: "Navami" }
      }
    },
    "7": {
      "2": {
        festivals: [
          { np: "तिहार", en: "Tihar", type: "festival" }
        ],
        thithi: { np: "द्वादशी", en: "Dwadashi" }
      }
    }
  }
};

// Returns the equivalent Bikram Sambat date for a given Gregorian date
// This is a simplified version for the demo - a real app would need more precise calculations
export function getBsDate(date: Date): {year: number, month: number, day: number} {
  // This is a very simplified conversion - in reality it's more complex
  // Starting point: April 14, 2023 = Baisakh 1, 2080 BS
  const startDate = new Date(2023, 3, 14); // April 14, 2023
  const bsStartYear = 2080;
  const bsStartMonth = 0; // Baisakh (0-indexed)
  const bsStartDay = 1;

  // Calculate days difference
  const diffTime = date.getTime() - startDate.getTime();
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Start with BS start date
  let year = bsStartYear;
  let month = bsStartMonth;
  let day = bsStartDay;

  // Add the difference in days to get the BS date
  while (diffDays > 0) {
    // Get days in current BS month
    const daysInMonth = bsMonthLengths[year]?.[month] || 30;

    // Check if we can subtract a full month
    if (diffDays >= daysInMonth - day + 1) {
      diffDays -= (daysInMonth - day + 1);
      month++;
      day = 1;

      // Handle year change
      if (month > 11) {
        month = 0;
        year++;
      }
    } else {
      // Add remaining days
      day += diffDays;
      diffDays = 0;
    }
  }

  return { year, month, day };
}

// Check if a date has any festival
export function hasFestival(year: number, month: number, day: number): boolean {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  return !!festivals[yearStr]?.[monthStr]?.[dayStr];
}

// Get festival name
export function getFestivalName(year: number, month: number, day: number, language: 'np' | 'en'): string[] {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  const dayInfo = festivals[yearStr]?.[monthStr]?.[dayStr];
  if (!dayInfo) return [];
  
  const names: string[] = [];
  
  // Add festivals
  dayInfo.festivals.forEach(festival => {
    names.push(festival[language]);
  });
  
  // Add thithi if present
  if (dayInfo.thithi) {
    names.push(dayInfo.thithi[language]);
  }
  
  return names;
}
