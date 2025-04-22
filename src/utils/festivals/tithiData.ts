
// Tithi data mapping numbers to Nepali and English names
export const tithiData: Record<number, { np: string; en: string }> = {
  1: { np: "प्रथमा", en: "Pratipada" },
  2: { np: "द्वितीया", en: "Dwitiya" },
  3: { np: "तृतीया", en: "Tritiya" },
  4: { np: "चतुर्थी", en: "Chaturthi" },
  5: { np: "पञ्चमी", en: "Panchami" },
  6: { np: "षष्ठी", en: "Sasthi" },
  7: { np: "सप्तमी", en: "Saptami" },
  8: { np: "अष्टमी", en: "Astami" },
  9: { np: "नवमी", en: "Navami" },
  10: { np: "दशमी", en: "Dashami" },
  11: { np: "एकादशी", en: "Ekadashi" },
  12: { np: "द्वादशी", en: "Dwadashi" },
  13: { np: "त्रयोदशी", en: "Trayodashi" },
  14: { np: "चतुर्दशी", en: "Chaturdashi" },
  15: { np: "पूर्णिमा", en: "Purnima" },
  16: { np: "प्रतिपदा", en: "Pratipada" },
  17: { np: "द्वितीया", en: "Dwitiya" },
  18: { np: "तृतीया", en: "Tritiya" },
  19: { np: "चतुर्थी", en: "Chaturthi" },
  20: { np: "पञ्चमी", en: "Panchami" },
  21: { np: "षष्ठी", en: "Sasthi" },
  22: { np: "सप्तमी", en: "Saptami" },
  23: { np: "अष्टमी", en: "Astami" },
  24: { np: "नवमी", en: "Navami" },
  25: { np: "दशमी", en: "Dashami" },
  26: { np: "एकादशी", en: "Ekadashi" },
  27: { np: "द्वादशी", en: "Dwadashi" },
  28: { np: "त्रयोदशी", en: "Trayodashi" },
  29: { np: "चतुर्दशी", en: "Chaturdashi" },
  30: { np: "औंसी", en: "Aaunsi" }
};

// Special thithi correction data - lookup table for accurate thithi calculation
// This maps specific BS dates to their correct thithi values
// Format: "year-month-day": thithiNumber
export const specificTithiData: Record<string, number> = {
  // 2080 key dates for tithi calibration
  "2080-1-1": 1,  // Baisakh 1 is Pratipada (first day), not Purnima
  "2080-1-15": 15, // Purnima in the middle of the month
  "2080-1-30": 30, // Aaunsi at the end of the month
  
  // 2082 key dates with accurate thithi information
  "2082-1-1": 1,   // Pratipada - correct for Baisakh 1
  "2082-1-15": 15, // Purnima
  "2082-1-30": 30, // Aaunsi
  "2082-2-15": 15, // Purnima
  "2082-2-29": 30, // Aaunsi
  "2082-3-15": 15, // Purnima
  "2082-3-29": 30, // Aaunsi
  "2082-4-15": 15, // Purnima
  "2082-4-30": 30, // Aaunsi
  "2082-5-15": 15, // Purnima
  "2082-5-30": 30, // Aaunsi
  "2082-6-15": 15, // Purnima
  "2082-6-30": 30, // Aaunsi
  "2082-7-15": 15, // Purnima
  "2082-7-30": 30, // Aaunsi
  "2082-8-15": 15, // Purnima
  "2082-8-30": 30, // Aaunsi
  "2082-9-15": 15, // Purnima
  "2082-9-30": 30, // Aaunsi
  "2082-10-15": 15, // Purnima
  "2082-10-30": 30, // Aaunsi
  "2082-11-15": 15, // Purnima
  "2082-11-30": 30, // Aaunsi
  "2082-12-15": 15, // Purnima
  "2082-12-30": 30, // Aaunsi
  
  // Additional key festival dates
  "2082-6-10": 10,  // Dashami (Dashain)
  "2082-6-24": 24,  // Purnima (Kojagrat)
  "2082-11-25": 25, // Chaturdashi (Shivaratri)
  "2082-12-16": 16  // Navami (Ram Navami)
};
