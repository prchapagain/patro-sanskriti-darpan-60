
// Nepali date conversion utility
// Adapted from https://github.com/khumnath/nepdate

// Define the number of days in each month of the Nepali calendar for different years
const nepaliMonthData: { [year: number]: number[] } = {
  2070: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2071: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2072: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2073: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2074: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2075: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2076: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2077: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2078: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2081: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2082: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2084: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2085: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2087: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2088: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2090: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2091: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2092: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2093: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2094: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2095: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2096: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2097: [30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2098: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2099: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2100: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
};

// Reference date for conversion: Jan 1, 2014 AD = Poush 17, 2070 BS
const referenceEnDate = new Date(2014, 0, 1);
const referenceBsDate = {
  year: 2070,
  month: 8, // Poush = 8 (0-indexed)
  day: 17
};

// Calculate the total number of days from a given BS year/month/day to the reference date
const getTotalDaysFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  let totalDays = 0;

  // Days from year
  if (bsYear < referenceBsDate.year) {
    // If the year is before the reference year
    for (let year = bsYear; year < referenceBsDate.year; year++) {
      if (nepaliMonthData[year]) {
        for (let i = 0; i < 12; i++) {
          totalDays += nepaliMonthData[year][i];
        }
      } else {
        // Fallback for years not in our data
        totalDays += 365;
      }
    }
    
    // Days from month in reference year
    for (let month = 0; month < referenceBsDate.month; month++) {
      totalDays += nepaliMonthData[referenceBsDate.year][month];
    }
    
    // Days from days
    totalDays += referenceBsDate.day;
    
    // Subtract the given BS day
    if (nepaliMonthData[bsYear] && bsMonth < 12) {
      for (let month = bsMonth + 1; month < 12; month++) {
        totalDays -= nepaliMonthData[bsYear][month];
      }
      totalDays -= nepaliMonthData[bsYear][bsMonth] - bsDay;
    }
    
    // Return negative days because date is before reference
    return -totalDays;
  } else {
    // If the year is after or equal to the reference year
    // Count days from reference year to the year before target
    for (let year = referenceBsDate.year; year < bsYear; year++) {
      if (nepaliMonthData[year]) {
        for (let i = 0; i < 12; i++) {
          totalDays += nepaliMonthData[year][i];
        }
      } else {
        // Fallback for years not in our data
        totalDays += 365;
      }
    }
    
    // Add days from months in target year
    for (let month = 0; month < bsMonth; month++) {
      if (nepaliMonthData[bsYear] && month < nepaliMonthData[bsYear].length) {
        totalDays += nepaliMonthData[bsYear][month];
      }
    }
    
    // Add days of the target month
    totalDays += bsDay;
    
    // Subtract the reference BS date
    // Days from month in reference year
    for (let month = 0; month < referenceBsDate.month; month++) {
      totalDays -= nepaliMonthData[referenceBsDate.year][month];
    }
    
    // Days from days
    totalDays -= referenceBsDate.day;
    
    return totalDays;
  }
};

// Convert Gregorian (AD) date to Bikram Sambat (BS) date
export const getBsDate = (date: Date): { year: number; month: number; day: number } => {
  // Calculate difference in days from reference date
  const diffTime = date.getTime() - referenceEnDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  let bsYear = referenceBsDate.year;
  let bsMonth = referenceBsDate.month;
  let bsDay = referenceBsDate.day;
  
  // If date is before reference date
  if (diffDays < 0) {
    let remainingDays = -diffDays;
    
    // Adjust day, month, and year for dates before reference
    while (remainingDays > 0) {
      if (bsDay > 1) {
        bsDay--;
        remainingDays--;
      } else {
        bsMonth--;
        
        if (bsMonth < 0) {
          bsYear--;
          bsMonth = 11;
        }
        
        if (nepaliMonthData[bsYear]) {
          bsDay = nepaliMonthData[bsYear][bsMonth];
        } else {
          bsDay = 30; // Default
        }
        
        remainingDays--;
      }
    }
  } else {
    // If date is after or equal to reference date
    let remainingDays = diffDays;
    
    // Adjust day, month, and year for dates after reference
    while (remainingDays > 0) {
      // Get days in current BS month
      let daysInMonth = 30; // Default
      if (nepaliMonthData[bsYear] && bsMonth < nepaliMonthData[bsYear].length) {
        daysInMonth = nepaliMonthData[bsYear][bsMonth];
      }
      
      // Check if we can add days within current month
      if (bsDay + remainingDays <= daysInMonth) {
        bsDay += remainingDays;
        remainingDays = 0;
      } else {
        // Move to next month
        remainingDays -= (daysInMonth - bsDay + 1);
        bsMonth++;
        bsDay = 1;
        
        if (bsMonth > 11) {
          bsYear++;
          bsMonth = 0;
        }
      }
    }
  }
  
  return { year: bsYear, month: bsMonth, day: bsDay };
};

// Convert BS date to Gregorian date
export const getGregorianDate = (
  bsYear: number,
  bsMonth: number,
  bsDay: number
): Date => {
  // Calculate days difference from reference BS date
  const daysDifference = getTotalDaysFromBsDate(bsYear, bsMonth, bsDay);
  
  // Create new date by adding/subtracting days from reference English date
  const resultDate = new Date(referenceEnDate);
  resultDate.setDate(referenceEnDate.getDate() + daysDifference);
  
  return resultDate;
};

// Improved Tithi calculation based on lunar phases
export const getTithiFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  // Convert BS date to Gregorian
  const gregDate = getGregorianDate(bsYear, bsMonth, bsDay);
  
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
