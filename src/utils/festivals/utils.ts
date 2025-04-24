import { festivals } from './festivalData';
import { internationalDays } from './internationalDays';
import { specificTithiData, tithiData } from './tithiData';
import { getTithiFromBsDate, getTithiName } from '../convert/nepaliDate';
import { getTithiNameFromGregorian } from '../convert/astronomicalCalculations';
import { getGregorianDate } from '../convert/dateConversion';
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

export function getThithi(year: number, month: number, day: number, language: 'np' | 'en'): string | null {
  const yearStr = year.toString();
  const monthStr = (month + 1).toString();
  const dayStr = day.toString();
  
  const dayInfo = festivals[yearStr]?.[monthStr]?.[dayStr];
  if (dayInfo?.thithi) {
    return dayInfo.thithi[language];
  }
  
  const dateKey = `${year}-${month + 1}-${day}`;
  
  if (specificTithiData[dateKey]) {
    const tithiNum = specificTithiData[dateKey];
    return tithiData[tithiNum]?.[language] || null;
  }
  
  try {
    const gregDate = getGregorianDate(year, month, day);
    return getTithiNameFromGregorian(gregDate, language);
  } catch (error) {
    console.error("Error getting tithi:", error);
    
    const tithiNumber = getTithiFromBsDate(year, month, day);
    return getTithiName(tithiNumber, language);
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
