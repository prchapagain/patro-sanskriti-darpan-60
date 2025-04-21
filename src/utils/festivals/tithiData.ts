
// Tithi data mapping numbers to Nepali and English names
export const tithiData: Record<number, { np: string; en: string }> = {
  1: { np: "प्रतिपदा", en: "Pratipada" },
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
  // 2082 key dates with accurate thithi information
  "2082-1-1": 15,  // Purnima
  "2082-1-8": 1,   // Pratipada - April 21, 2025
  "2082-1-15": 29, // Amavasya
  "2082-1-30": 15, // Purnima
  "2082-2-15": 15, // Purnima
  "2082-2-29": 30, // Aaunsi
  "2082-3-15": 16, // Pratipada
  "2082-3-29": 15, // Purnima
  "2082-4-15": 30, // Aaunsi
  "2082-4-30": 15, // Purnima
  "2082-5-15": 30, // Aaunsi
  "2082-5-30": 15, // Purnima
  "2082-6-10": 1,  // Pratipada
  "2082-6-19": 10, // Dashami
  "2082-6-24": 15, // Purnima
  "2082-7-3": 30,  // Aaunsi
  "2082-7-19": 16, // Pratipada
  "2082-7-24": 15, // Purnima
  "2082-8-9": 30,  // Aaunsi
  "2082-8-24": 15, // Purnima
  "2082-9-9": 30,  // Aaunsi
  "2082-9-23": 15, // Purnima
  "2082-10-1": 30, // Aaunsi
  "2082-10-15": 15, // Purnima
  "2082-11-7": 23, // Astami
  "2082-11-15": 30, // Aaunsi
  "2082-11-25": 14, // Chaturdashi (Shivaratri)
  "2082-11-30": 15, // Purnima (Fagu)
  "2082-12-16": 10, // Dashami (Chaite Dashain)
  "2082-12-30": 9   // Navami (Ram Navami)
};
