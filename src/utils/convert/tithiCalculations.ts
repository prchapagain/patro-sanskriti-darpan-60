
// Improved Tithi calculation based on lunar phases
export const getTithiFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  // Convert BS date to Gregorian
  const gregDate = new Date(2014, 0, 1); // Placeholder date, will be replaced by getGregorianDate import
  
  // Calculate approximate lunar phase (0-29)
  // This formula uses the Gregorian date to estimate the lunar day
  // Based on an average lunar month of 29.53 days
  const lunarCycleLength = 29.53;
  
  // Reference new moon date (known new moon near our reference date)
  const refNewMoon = new Date(2014, 0, 1); // Jan 1, 2014 (close to new moon)
  
  // Calculate days since reference new moon
  const daysSinceRefNewMoon = (gregDate.getTime() - refNewMoon.getTime()) / (24 * 60 * 60 * 1000);
  
  // Calculate the tithi (1-30)
  const tithiFloat = (daysSinceRefNewMoon % lunarCycleLength) / lunarCycleLength * 30;
  const tithi = Math.floor(tithiFloat) + 1;
  
  // Ensure tithi is between 1 and 30
  return tithi > 30 ? tithi - 30 : tithi;
};

// Lunar months in Nepali calendar for Tithi calculations
export const lunarMonths = {
  0: { np: "बैशाख", en: "Baishakh" },
  1: { np: "जेठ", en: "Jestha" },
  2: { np: "असार", en: "Asar" },
  3: { np: "श्रावण", en: "Shrawan" },
  4: { np: "भाद्र", en: "Bhadra" },
  5: { np: "आश्विन", en: "Ashwin" },
  6: { np: "कार्तिक", en: "Kartik" },
  7: { np: "मंसिर", en: "Mangsir" },
  8: { np: "पुष", en: "Poush" },
  9: { np: "माघ", en: "Magh" },
  10: { np: "फाल्गुन", en: "Falgun" },
  11: { np: "चैत्र", en: "Chaitra" }
};

// Get Tithi (lunar day) name from tithi number
export const getTithiName = (tithiNumber: number, language: 'np' | 'en'): string => {
  const tithiData: Record<number, { np: string; en: string }> = {
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
  
  return tithiData[tithiNumber]?.[language] || "";
};
