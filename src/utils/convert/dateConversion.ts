
import { nepaliMonthData, referenceEnDate, referenceBsDate } from './nepaliMonthData';

// Calculate the total number of days from a given BS year/month/day to the reference date
export const getTotalDaysFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
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
