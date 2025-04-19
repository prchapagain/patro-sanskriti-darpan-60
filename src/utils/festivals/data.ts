import { FestivalData, Festival, DayInfo } from './types';

const tithiData = {
  "1": { np: "प्रतिपदा", en: "Pratipada" },
  "2": { np: "द्वितीया", en: "Dwitiya" },
  "3": { np: "तृतीया", en: "Tritiya" },
  "4": { np: "चतुर्थी", en: "Chaturthi" },
  "5": { np: "पञ्चमी", en: "Panchami" },
  "6": { np: "षष्ठी", en: "Sasthi" },
  "7": { np: "सप्तमी", en: "Saptami" },
  "8": { np: "अष्टमी", en: "Astami" },
  "9": { np: "नवमी", en: "Navami" },
  "10": { np: "दशमी", en: "Dashami" },
  "11": { np: "एकादशी", en: "Ekadashi" },
  "12": { np: "द्वादशी", en: "Dwadashi" },
  "13": { np: "त्रयोदशी", en: "Trayodashi" },
  "14": { np: "चतुर्दशी", en: "Chaturdashi" },
  "15": { np: "पूर्णिमा", en: "Purnima" },
  "16": { np: "प्रतिपदा", en: "Pratipada" },
  "17": { np: "द्वितीया", en: "Dwitiya" },
  "18": { np: "तृतीया", en: "Tritiya" },
  "19": { np: "चतुर्थी", en: "Chaturthi" },
  "20": { np: "पञ्चमी", en: "Panchami" },
  "21": { np: "षष्ठी", en: "Sasthi" },
  "22": { np: "सप्तमी", en: "Saptami" },
  "23": { np: "अष्टमी", en: "Astami" },
  "24": { np: "नवमी", en: "Navami" },
  "25": { np: "दशमी", en: "Dashami" },
  "26": { np: "एकादशी", en: "Ekadashi" },
  "27": { np: "द्वादशी", en: "Dwadashi" },
  "28": { np: "त्रयोदशी", en: "Trayodashi" },
  "29": { np: "चतुर्दशी", en: "Chaturdashi" },
  "30": { np: "औंसी", en: "Aaunsi" }
};

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

export function getFestivalInfo(year: number, month: number, day: number): DayInfo | null {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  return festivals[yearStr]?.[monthStr]?.[dayStr] || null;
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
  
  return names;
}

export function getThithi(year: number, month: number, day: number, language: 'np' | 'en'): string | null {
  const lunarDay = ((day + month * 30) % 30) + 1;
  return tithiData[lunarDay.toString()]?.[language] || null;
}
