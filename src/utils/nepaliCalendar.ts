
// Utility functions for Nepali calendar calculations
import { nepaliMonthData, referenceEnDate2, referenceBsDate2 } from "./convert/nepaliMonthData";
import { bsMonths } from "./calendar/names";
import { 
  getTithiNameFromGregorian,
  getTithiNumberFromGregorian
} from "./convert/astronomicalCalculations";

// Get BS date from Gregorian date
export const getBsDateFromGregorian = (date: Date): { year: number; month: number; day: number } => {
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
  
  console.log('Converting date:', inputDate.toISOString(), 'to BS. Diff days from reference:', diffDays);
  
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

// Convert BS date to formatted string
export const formatBsDate = (bsDate: { year: number; month: number; day: number }, language: 'np' | 'en'): string => {
  const monthName = bsMonths[bsDate.month][language];
  
  if (language === 'np') {
    return `${bsDate.day} ${monthName} ${bsDate.year}`;
  } else {
    return `${bsDate.day} ${monthName} ${bsDate.year}`;
  }
};

// Get current BS date
export const getCurrentBsDate = (): { year: number; month: number; day: number } => {
  const today = new Date();
  return getBsDateFromGregorian(today);
};

// Get tithi info for the given BS date
export const getTithiInfo = (bsDate: { year: number; month: number; day: number }, language: 'np' | 'en'): string => {
  // Get the corresponding Gregorian date for the BS date
  const gregDate = getGregorianDateFromBs(bsDate.year, bsDate.month, bsDate.day);
  
  // Use the astronomical calculations to get the tithi name
  return getTithiNameFromGregorian(gregDate, language);
};

// Helper function to convert BS date to Gregorian date
function getGregorianDateFromBs(bsYear: number, bsMonth: number, bsDay: number): Date {
  // Start with the reference date
  const referenceGregorianDate = new Date(referenceEnDate2.getTime());
  const referenceBsDate = { ...referenceBsDate2 };
  
  // Calculate the difference in days between the reference BS date and the given BS date
  let daysDifference = 0;
  
  // If the target date is before the reference date
  if (bsYear < referenceBsDate.year || 
      (bsYear === referenceBsDate.year && bsMonth < referenceBsDate.month) || 
      (bsYear === referenceBsDate.year && bsMonth === referenceBsDate.month && bsDay < referenceBsDate.day)) {
    
    // Count backwards from reference date
    let year = referenceBsDate.year;
    let month = referenceBsDate.month;
    let day = referenceBsDate.day;
    
    while (year > bsYear || (year === bsYear && month > bsMonth) || (year === bsYear && month === bsMonth && day > bsDay)) {
      daysDifference--;
      day--;
      
      if (day === 0) {
        month--;
        if (month < 0) {
          year--;
          month = 11;
        }
        day = nepaliMonthData[year]?.[month] || 30;
      }
    }
  } else {
    // Count forwards from reference date
    let year = referenceBsDate.year;
    let month = referenceBsDate.month;
    let day = referenceBsDate.day;
    
    while (year < bsYear || (year === bsYear && month < bsMonth) || (year === bsYear && month === bsMonth && day < bsDay)) {
      daysDifference++;
      day++;
      
      const daysInMonth = nepaliMonthData[year]?.[month] || 30;
      if (day > daysInMonth) {
        day = 1;
        month++;
        if (month > 11) {
          year++;
          month = 0;
        }
      }
    }
  }
  
  // Create a new Date object by adding/subtracting the days difference
  const resultDate = new Date(referenceGregorianDate.getTime());
  resultDate.setDate(referenceGregorianDate.getDate() + daysDifference);
  return resultDate;
}

// Check if two BS dates are the same
export const isSameBsDate = (
  date1: { year: number; month: number; day: number },
  date2: { year: number; month: number; day: number }
): boolean => {
  return date1.year === date2.year && date1.month === date2.month && date1.day === date2.day;
};

// Get BS date for current day
export const getTodayBsDate = (): { year: number; month: number; day: number } => {
  const today = new Date();
  return getBsDateFromGregorian(today);
};
