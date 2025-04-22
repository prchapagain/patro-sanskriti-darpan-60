
// Export utility functions
export * from './festivals/types';
export * from './festivals/data';
export * from './calendar/names';
export * from './convert/numbers';
export * from './convert/dates';
export { getMonthLengths } from './convert/nepaliMonthData';
export { getTithiName, getTithiFromBsDate } from './convert/nepaliDate';

// Export our new Nepali calendar functions
export { 
  getBsDateFromGregorian,
  formatBsDate,
  getCurrentBsDate,
  getTithiInfo,
  isSameBsDate,
  getTodayBsDate
} from './nepaliCalendar';

// Re-export getBsDate for backward compatibility
export { getBsDateFromGregorian as getBsDate } from './nepaliCalendar';
