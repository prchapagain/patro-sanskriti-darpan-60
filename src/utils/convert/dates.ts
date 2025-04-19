
export const bsMonthLengths: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 30]
};

export function getBsDate(date: Date): {year: number, month: number, day: number} {
  const startDate = new Date(2023, 3, 14); // April 14, 2023
  const bsStartYear = 2080;
  const bsStartMonth = 0; // Baisakh (0-indexed)
  const bsStartDay = 1;

  const diffTime = date.getTime() - startDate.getTime();
  let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let year = bsStartYear;
  let month = bsStartMonth;
  let day = bsStartDay;

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
