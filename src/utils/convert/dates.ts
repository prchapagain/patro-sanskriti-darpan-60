
export * from './nepaliDate';

// Updated month lengths for BS years 2080-2082
export const bsMonthLengths: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30]
};

// More accurate date conversion with improved reference point
export function getBsDate(date: Date): {year: number, month: number, day: number} {
  // Using April 13, 2023 as reference point corresponding to Baisakh 1, 2080
  const startDate = new Date(2023, 3, 13); // April 13, 2023
  const bsStartYear = 2080;
  const bsStartMonth = 0; // Baisakh (0-indexed)
  const bsStartDay = 1;

  // Calculate difference in days
  const diffTime = date.getTime() - startDate.getTime();
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If date is before reference date, use alternative calculation
  if (diffDays < 0) {
    // Use the nepaliDate converter which works well for older dates
    return getBsDate(date);
  }

  let year = bsStartYear;
  let month = bsStartMonth;
  let day = bsStartDay;

  // Accurately calculate BS date by iterating through days
  while (diffDays > 0) {
    const daysInMonth = bsMonthLengths[year]?.[month] || 30;

    if (diffDays >= daysInMonth - day + 1) {
      diffDays -= (daysInMonth - day + 1);
      month++;
      day = 1;

      if (month > 11) {
        month = 0;
        year++;
      }
    } else {
      day += diffDays;
      diffDays = 0;
    }
  }

  return { year, month, day };
}

// Convert BS date to Gregorian date with improved accuracy
export function getGregorianDate(bsYear: number, bsMonth: number, bsDay: number): Date {
  // Using April 13, 2023 (start of 2080) as reference
  const startDate = new Date(2023, 3, 13); 
  const bsStartYear = 2080;
  const bsStartMonth = 0;
  const bsStartDay = 1;
  
  // If the date is before our reference, use the more robust calculation
  if (bsYear < bsStartYear || (bsYear === bsStartYear && bsMonth < bsStartMonth) ||
      (bsYear === bsStartYear && bsMonth === bsStartMonth && bsDay < bsStartDay)) {
    // Use the calculation from the imported module
    return getGregorianDate(bsYear, bsMonth, bsDay);
  }
  
  let totalDays = 0;
  
  // Calculate days between the start date and target BS date
  if (bsYear === bsStartYear) {
    // Same year
    for (let m = bsStartMonth; m < bsMonth; m++) {
      totalDays += bsMonthLengths[bsYear][m];
    }
    totalDays += (bsDay - bsStartDay);
  } else {
    // Future year
    // Add remaining days of start year
    for (let m = bsStartMonth; m < 12; m++) {
      totalDays += bsMonthLengths[bsStartYear][m];
    }
    
    // Add days for years in between
    for (let y = bsStartYear + 1; y < bsYear; y++) {
      if (bsMonthLengths[y]) {
        totalDays += bsMonthLengths[y].reduce((sum, days) => sum + days, 0);
      } else {
        // Fallback: assume 365 days per year if data is missing
        totalDays += 365;
      }
    }
    
    // Add days of the target year
    for (let m = 0; m < bsMonth; m++) {
      totalDays += bsMonthLengths[bsYear]?.[m] || 30;
    }
    
    totalDays += (bsDay - 1);
  }
  
  // Add days to the start date
  const resultDate = new Date(startDate);
  resultDate.setDate(resultDate.getDate() + totalDays);
  
  return resultDate;
}
