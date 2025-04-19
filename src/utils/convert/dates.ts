
// Updated month lengths for BS years 2080-2086
export const bsMonthLengths: { [year: number]: number[] } = {
  2080: [31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2083: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2085: [31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2086: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31]
};

// Export only what we need from these files
export { getBsDate, getTithiFromBsDate, getTithiName } from './nepaliDate';
export { getGregorianDate } from './dateConversion';
