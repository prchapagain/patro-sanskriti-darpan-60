
import { FestivalData, Festival, DayInfo } from './types';
import { getTithiFromBsDate as calculateTithiFromBsDate, getTithiName as calculateTithiName } from '../convert/nepaliDate';

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
      "1": {
        festivals: [
          { np: "नेपाली नयाँ वर्ष", en: "Nepali New Year", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      },
      "14": {
        festivals: [
          { np: "मध्य-वैशाख", en: "Mid-Baishakh", type: "special" }
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
      },
      "15": {
        festivals: [
          { np: "गणतन्त्र दिवस", en: "Republic Day", type: "national" }
        ],
        thithi: { np: "पञ्चमी", en: "Panchami" }
      }
    },
    "3": {
      "15": {
        festivals: [
          { np: "कुमार षष्ठी", en: "Kumar Sasthi", type: "festival" }
        ],
        thithi: { np: "षष्ठी", en: "Sasthi" }
      },
      "29": {
        festivals: [
          { np: "रक्षा बन्धन", en: "Raksha Bandhan", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      }
    },
    "4": {
      "18": {
        festivals: [
          { np: "नाग पञ्चमी", en: "Nag Panchami", type: "festival" }
        ],
        thithi: { np: "पञ्चमी", en: "Panchami" }
      }
    },
    "5": {
      "7": {
        festivals: [
          { np: "कृष्ण जन्माष्टमी", en: "Krishna Janmashtami", type: "festival" }
        ],
        thithi: { np: "अष्टमी", en: "Astami" }
      },
      "25": {
        festivals: [
          { np: "हरितालिका तीज", en: "Haritalika Teej", type: "festival" }
        ],
        thithi: { np: "तृतीया", en: "Tritiya" }
      }
    },
    "6": {
      "21": {
        festivals: [
          { np: "घटस्थापना (दशैं)", en: "Ghatasthapana (Dashain)", type: "festival" }
        ],
        thithi: { np: "प्रतिपदा", en: "Pratipada" }
      },
      "24": {
        festivals: [
          { np: "दशैं (विजयादशमी)", en: "Dashain (Vijaya Dashami)", type: "festival" }
        ],
        thithi: { np: "दशमी", en: "Dashami" }
      }
    },
    "7": {
      "12": {
        festivals: [
          { np: "तिहार (लक्ष्मी पूजा)", en: "Tihar (Laxmi Puja)", type: "festival" }
        ],
        thithi: { np: "द्वादशी", en: "Dwadashi" }
      },
      "15": {
        festivals: [
          { np: "छठ पर्व", en: "Chhath Parva", type: "festival" }
        ],
        thithi: { np: "षष्ठी", en: "Sasthi" }
      }
    },
    "8": {
      "20": {
        festivals: [
          { np: "विवाह पञ्चमी", en: "Vivaha Panchami", type: "festival" }
        ],
        thithi: { np: "पञ्चमी", en: "Panchami" }
      }
    },
    "9": {
      "1": {
        festivals: [
          { np: "तोल ल्होसार", en: "Tol Lhosar", type: "festival" }
        ],
        thithi: { np: "प्रतिपदा", en: "Pratipada" }
      }
    },
    "10": {
      "15": {
        festivals: [
          { np: "माघे संक्रान्ति", en: "Maghe Sankranti", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      }
    },
    "11": {
      "10": {
        festivals: [
          { np: "शिवरात्री", en: "Shivaratri", type: "festival" }
        ],
        thithi: { np: "चतुर्दशी", en: "Chaturdashi" }
      },
      "19": {
        festivals: [
          { np: "फागु पूर्णिमा (होली)", en: "Fagu Purnima (Holi)", type: "festival" }
        ],
        thithi: { np: "पूर्णिमा", en: "Purnima" }
      }
    },
    "12": {
      "14": {
        festivals: [
          { np: "चैते दशैं", en: "Chaite Dashain", type: "festival" }
        ],
        thithi: { np: "दशमी", en: "Dashami" }
      }
    }
  },
  "2081": {
    "1": {
      "1": {
        festivals: [
          { np: "नेपाली नयाँ वर्ष", en: "Nepali New Year", type: "festival" }
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
        thithi: { np: "दशमी", en: "Dashami" }
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

// International days
export const internationalDays = {
  // Format: "month-day" (Gregorian calendar)
  "1-1": { np: "अन्तर्राष्ट्रिय नयाँ वर्ष", en: "International New Year", type: "international" },
  "3-8": { np: "अन्तर्राष्ट्रिय महिला दिवस", en: "International Women's Day", type: "international" },
  "4-22": { np: "पृथ्वी दिवस", en: "Earth Day", type: "international" },
  "5-1": { np: "अन्तर्राष्ट्रिय श्रमिक दिवस", en: "International Workers' Day", type: "international" },
  "6-5": { np: "विश्व वातावरण दिवस", en: "World Environment Day", type: "international" },
  "10-24": { np: "संयुक्त राष्ट्र दिवस", en: "United Nations Day", type: "international" },
  "12-10": { np: "अन्तर्राष्ट्रिय मानव अधिकार दिवस", en: "Human Rights Day", type: "international" },
  "12-25": { np: "क्रिसमस", en: "Christmas", type: "international" }
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
  // Get tithi number from imported functions instead of using require()
  const tithiNumber = calculateTithiFromBsDate(year, month, day);
  return calculateTithiName(tithiNumber, language);
}

// Get international days based on Gregorian date
export function getInternationalDays(date: Date, language: 'np' | 'en'): string[] {
  const month = date.getMonth() + 1; // 0-indexed to 1-indexed
  const day = date.getDate();
  const key = `${month}-${day}`;
  
  if (internationalDays[key]) {
    return [internationalDays[key][language]];
  }
  
  return [];
}
