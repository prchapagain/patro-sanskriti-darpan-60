
import { nepaliMonthData, referenceEnDate, referenceBsDate, getMonthLengths } from './nepaliMonthData';

// Calculate the total number of days from a given BS year/month/day to the reference date
export const getTotalDaysFromBsDate = (bsYear: number, bsMonth: number, bsDay: number): number => {
  let totalDays = 0;

  // Days from year
  if (bsYear < referenceBsDate.year) {
    // If the year is before the reference year
    for (let year = bsYear; year < referenceBsDate.year; year++) {
      // Use getMonthLengths which handles years not in our dataset
      const yearData = getMonthLengths(year);
      for (let i = 0; i < 12; i++) {
        totalDays += yearData[i];
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

// Convert BS date to Gregorian date
export const getGregorianDate = (
  bsYear: number,
  bsMonth: number,
  bsDay: number
): Date => {
  try {
    // Calculate days difference from reference BS date
    const daysDifference = getTotalDaysFromBsDate(bsYear, bsMonth, bsDay);
    
    // Create new date by adding/subtracting days from reference English date
    const resultDate = new Date(referenceEnDate);
    resultDate.setDate(referenceEnDate.getDate() + daysDifference);
    return resultDate;
  } catch (error) {
    console.error(`Error converting BS date (${bsYear}-${bsMonth+1}-${bsDay}) to Gregorian:`, error);
    // Fallback to a reasonable estimation for dates outside our mapping
    const estimatedDate = new Date(bsYear - 57, bsMonth, bsDay); // Rough estimation
    return estimatedDate;
  }
};
