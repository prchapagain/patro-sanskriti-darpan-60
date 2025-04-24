
import { festivals } from './festivalData';
import { internationalDays } from './internationalDays';
import { specificTithiData, tithiData } from './tithiData';
import { getTithiNumberFromGregorian } from '../convert/astronomicalCalculations';
import { getGregorianDateFromBs } from '../nepaliCalendar';
import type { DayInfo } from './types';

export function hasFestival(year: number, month: number, day: number): boolean {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  return !!festivals[yearStr]?.[monthStr]?.[dayStr];
}

export function getFestivalInfo(year: number, month: number, day: number): DayInfo | null {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  return festivals[yearStr]?.[monthStr]?.[dayStr] || null;
}

export function getFestivalName(year: number, month: number, day: number, language: 'np' | 'en'): string[] {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  const dayInfo = festivals[yearStr]?.[monthStr]?.[dayStr];
  if (!dayInfo) return [];
  
  return dayInfo.festivals.map(festival => festival[language]);
}

// Direct port of C++ getThithi functionality
export function getThithi(year: number, month: number, day: number, language: 'np' | 'en'): string | null {
  // First check the dedicated tithi data - highest priority like in C++
  const dateKey = `${year}-${month + 1}-${day}`;
  if (specificTithiData[dateKey]) {
    const tithiNum = specificTithiData[dateKey];
    return tithiData[tithiNum]?.[language] || null;
  }
  
  // Check festival data next - second priority
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  const dayInfo = festivals[yearStr]?.[monthStr]?.[dayStr];
  if (dayInfo?.thithi) {
    return dayInfo.thithi[language];
  }
  
  // Calculate tithi using astronomical method - same as C++ implementation
  try {
    // Convert BS to Gregorian
    const gregDate = getGregorianDateFromBs(year, month, day);
    
    // Get tithi from Gregorian date
    const tithiNum = getTithiNumberFromGregorian(gregDate);
    return tithiData[tithiNum]?.[language] || null;
  } catch (error) {
    console.error("Error calculating tithi:", error);
    return null;
  }
}

export function getInternationalDays(date: Date, language: 'np' | 'en'): string[] {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = `${month}-${day}`;
  
  if (internationalDays[key]) {
    return [internationalDays[key][language]];
  }
  
  return [];
}
