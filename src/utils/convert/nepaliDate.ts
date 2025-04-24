
import { getGregorianDate as getGregorianDateConverter } from './dateConversion';
import { tithiData, specificTithiData } from '../festivals/tithiData';
import { getTithiNumberFromGregorian, getTithiNameFromGregorian } from './astronomicalCalculations';
import { nepaliMonthData, referenceEnDate2, referenceBsDate2 } from './nepaliMonthData';

// Convert Gregorian (AD) date to Bikram Sambat (BS) date
export const getBsDate = (date: Date): { year: number; month: number; day: number } => {
  // Ensure we're working with a fresh date to avoid timezone issues
  const inputDate = new Date(date.getTime());
  // Reset hours to ensure consistent day calculations
  inputDate.setHours(0, 0, 0, 0);
  
  // Using the more recent reference point
  const referenceDate = new Date(referenceEnDate2.getTime());
  // Reset hours to ensure consistent day calculations
  referenceDate.setHours(0, 0, 0, 0);
  
  const referenceBsYear = referenceBsDate2.year;
  const referenceBsMonth = referenceBsDate2.month;
  const referenceBsDay = referenceBsDate2.day;
  
  // Calculate difference in days (ensuring proper date comparison)
  const diffTime = inputDate.getTime() - referenceDate.getTime();
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

// Calculate tithi (lunar day) for a given BS date - prioritizing specificTithiData
export const getTithiFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  // First check if we have specific tithi data for this date
  const dateKey = `${bsYear}-${bsMonth + 1}-${bsDay}`;
  if (specificTithiData[dateKey]) {
    return specificTithiData[dateKey];
  }
  
  try {
    // Convert BS to Gregorian date
    const gregDate = getGregorianDateConverter(bsYear, bsMonth, bsDay);
    
    // Use the astronomical calculations to get the tithi number
    const tithiNum = getTithiNumberFromGregorian(gregDate);
    return tithiNum;
  } catch (error) {
    console.error("Error calculating tithi:", error);
    
    // Fallback to a simple approximation when all else fails
    const dayOfMonth = bsDay;
    if (dayOfMonth <= 15) {
      // Shukla Paksha (Bright fortnight) - tithi 1 to 15
      return dayOfMonth;
    } else {
      // Krishna Paksha (Dark fortnight) - tithi 16 to 30
      return dayOfMonth + 15 - 30;
    }
  }
};

// Get tithi name from tithi number
export const getTithiName = (tithiNumber: number, language: 'np' | 'en' = 'np'): string => {
  // Use tithiData lookup
  return tithiData[tithiNumber]?.[language] || "";
};
