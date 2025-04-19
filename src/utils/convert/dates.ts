
export const bsMonthLengths: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 30]
};

// Improved date conversion function with more accurate reference point
export function getBsDate(date: Date): {year: number, month: number, day: number} {
  // Using April 14, 2023 as reference point corresponding to Baisakh 1, 2080
  const startDate = new Date(2023, 3, 14); // April 14, 2023
  const bsStartYear = 2080;
  const bsStartMonth = 0; // Baisakh (0-indexed)
  const bsStartDay = 1;

  // Calculate difference in days
  const diffTime = date.getTime() - startDate.getTime();
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // If date is before reference date, return the reference date as fallback
  if (diffDays < 0) {
    return { year: bsStartYear, month: bsStartMonth, day: bsStartDay };
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

// Convert BS date to Gregorian date (approximate)
export function getGregorianDate(bsYear: number, bsMonth: number, bsDay: number): Date {
  // Start with our reference date
  const startDate = new Date(2023, 3, 14); // April 14, 2023 (Baisakh 1, 2080)
  const bsStartYear = 2080;
  const bsStartMonth = 0;
  const bsStartDay = 1;
  
  let totalDays = 0;
  
  // Calculate days between the start date and target BS date
  if (bsYear === bsStartYear) {
    // Same year
    for (let m = bsStartMonth; m < bsMonth; m++) {
      totalDays += bsMonthLengths[bsYear][m];
    }
    totalDays += (bsDay - bsStartDay);
  } else if (bsYear > bsStartYear) {
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
