import { FestivalData } from './types';

export const festivals: FestivalData = {
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

export function hasFestival(year: number, month: number, day: number): boolean {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  return !!festivals[yearStr]?.[monthStr]?.[dayStr];
}

export function getFestivalName(year: number, month: number, day: number, language: 'np' | 'en'): string[] {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  const dayInfo = festivals[yearStr]?.[monthStr]?.[dayStr];
  if (!dayInfo) return [];
  
  const names: string[] = [];
  
  dayInfo.festivals.forEach(festival => {
    names.push(festival[language]);
  });
  
  if (dayInfo.thithi) {
    names.push(dayInfo.thithi[language]);
  }
  
  return names;
}
