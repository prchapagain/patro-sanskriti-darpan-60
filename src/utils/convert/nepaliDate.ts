
import { getGregorianDate as getGregorianDateConverter } from './dateConversion';
import { tithiData, specificTithiData } from '../festivals/tithiData';
import { nepaliMonthData, referenceEnDate2, referenceBsDate2 } from './nepaliMonthData';

// Convert Gregorian (AD) date to Bikram Sambat (BS) date
export const getBsDate = (date: Date): { year: number; month: number; day: number } => {
  // Using the more recent reference point
  const referenceDate = referenceEnDate2;
  const referenceBsYear = referenceBsDate2.year;
  const referenceBsMonth = referenceBsDate2.month;
  const referenceBsDay = referenceBsDate2.day;
  
  // Calculate difference in days
  const diffTime = date.getTime() - referenceDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If date is earlier than reference, handle differently
  if (diffDays < 0) {
    // For dates before reference, work backwards
    let totalDays = -diffDays;
    let year = referenceBsYear;
    let month = referenceBsMonth;
    let day = referenceBsDay;
    
    while (totalDays > 0) {
      if (day > 1) {
        day--;
        totalDays--;
      } else {
        // Move to previous month
        month--;
        
        if (month < 0) {
          year--;
          month = 11; // Move to Chaitra
        }
        
        // Get days in this month
        const daysInMonth = nepaliMonthData[year]?.[month] || 30;
        day = daysInMonth;
        totalDays--;
      }
    }
    
    return { year, month, day };
  } else {
    // For dates after or equal to reference
    let year = referenceBsYear;
    let month = referenceBsMonth;
    let day = referenceBsDay;
    let remainingDays = diffDays;
    
    while (remainingDays > 0) {
      // Get days in current month
      const daysInMonth = nepaliMonthData[year]?.[month] || 30;
      
      // Check if we can add days within current month
      const daysLeftInMonth = daysInMonth - day + 1;
      
      if (remainingDays < daysLeftInMonth) {
        day += remainingDays;
        remainingDays = 0;
      } else {
        // Move to next month
        remainingDays -= daysLeftInMonth;
        month++;
        day = 1;
        
        if (month > 11) {
          year++;
          month = 0;
        }
      }
    }
    
    return { year, month, day };
  }
};

// Calculate tithi (lunar day) for a given BS date
export const getTithiFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  // First check if we have specific tithi data for this date
  const dateKey = `${bsYear}-${bsMonth + 1}-${bsDay}`;
  if (specificTithiData[dateKey]) {
    return specificTithiData[dateKey];
  }
  
  // If not in our lookup table, convert BS to Gregorian date
  const gregDate = getGregorianDateConverter(bsYear, bsMonth, bsDay);
  
  // Use a more accurate method based on lunar cycles
  // The lunar cycle is approximately 29.53 days
  const lunarCycleLength = 29.53;
  
  // Reference new moon date (known new moon)
  const refNewMoon = new Date(2023, 3, 19); // April 19, 2023 was New Moon
  
  // Calculate days since reference new moon
  const daysSinceRefNewMoon = (gregDate.getTime() - refNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  
  // Calculate position in lunar cycle (0 to 29.53)
  const positionInCycle = ((daysSinceRefNewMoon % lunarCycleLength) + lunarCycleLength) % lunarCycleLength;
  
  // Convert to tithi (1-30)
  const tithiNum = Math.floor(positionInCycle / lunarCycleLength * 30) + 1;
  
  return tithiNum <= 30 ? tithiNum : 1; // Ensure we return a value between 1-30
};

// Get tithi name from date components
export const getTithiName = (tithiNumber: number, language: 'np' | 'en'): string => {
  return tithiData[tithiNumber]?.[language] || "";
};
