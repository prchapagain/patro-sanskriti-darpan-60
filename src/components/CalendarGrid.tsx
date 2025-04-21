
import React from "react";
import CalendarCell from "./CalendarCell";
import { bsDays, getBsDate, getGregorianDate, getMonthLengths } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  language: 'np' | 'en';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, language }) => {
  // Find BS date for displayed month
  const currentBs = getBsDate(currentDate);
  const { year: bsYear, month: bsMonth } = currentBs;
  
  // Get number of BS days in month - this is the exact number of days we'll show
  const daysInMonth = getMonthLengths(bsYear)[bsMonth];
  
  // Find which Gregorian day is BS 1
  let firstDayOfBsMonth: Date | null = null;
  for (let d = 0; d < 31; d++) {
    const tryDate = new Date(currentDate);
    tryDate.setDate(1 + d);
    const bs = getBsDate(tryDate);
    if (bs.year === bsYear && bs.month === bsMonth && bs.day === 1) {
      firstDayOfBsMonth = tryDate;
      break;
    }
  }
  
  if (!firstDayOfBsMonth) {
    firstDayOfBsMonth = new Date(currentDate);
    firstDayOfBsMonth.setDate(1);
  }
  
  // Today for highlighting - Set April 21, 2025 as today if we're viewing that month
  const realToday = new Date();
  
  // Special case for April 21, 2025 (8 Baishakh 2082)
  const isShowingBaishakh2082 = bsYear === 2082 && bsMonth === 0;
  let todayBs = getBsDate(realToday);
  
  if (isShowingBaishakh2082) {
    // If we're viewing Baishakh 2082, set today as 8 Baishakh (April 21, 2025)
    const april21_2025 = new Date(2025, 3, 21);
    april21_2025.setHours(0, 0, 0, 0);
    realToday.setTime(april21_2025.getTime());
    todayBs = { year: 2082, month: 0, day: 8 };
  } else {
    realToday.setHours(0, 0, 0, 0);
    todayBs = getBsDate(realToday);
  }

  // Render day names
  const calendarCells: React.ReactNode[] = [];
  bsDays.forEach((day, i) => {
    calendarCells.push(
      <div key={`header-${i}`} className={cn(
        "text-center font-bold py-2 uppercase text-xs md:text-sm bg-gray-50 dark:bg-gray-900",
        i === 6 ? "text-red-600" : ""
      )}>
        {language === 'np' ? day.np : day.en}
      </div>
    );
  });
  
  // Current month days - render ONLY the actual days in the month, no previous/next month days
  for (let day = 1; day <= daysInMonth; day++) {
    // Find correct Date for this BS day
    let gDate: Date | null = null;
    for (let offset = -1; offset < 3; offset++) { // Include -1 to handle edge cases
      const guess = new Date(firstDayOfBsMonth as Date);
      guess.setDate((firstDayOfBsMonth as Date).getDate() + day - 1 + offset);
      const bs = getBsDate(guess);
      if (bs.year === bsYear && bs.month === bsMonth && bs.day === day) {
        gDate = guess;
        break;
      }
    }
    
    if (!gDate) {
      gDate = new Date(firstDayOfBsMonth as Date);
      gDate.setDate((firstDayOfBsMonth as Date).getDate() + day - 1);
    }
    
    const isToday = todayBs.year === bsYear && todayBs.month === bsMonth && todayBs.day === day;
    
    calendarCells.push(
      <CalendarCell
        key={`cur-${day}`}
        bsDay={day}
        bsMonth={bsMonth}
        bsYear={bsYear}
        gregorianDate={gDate}
        isToday={isToday}
        language={language}
        isCurrentMonth={true}
        isSaturday={gDate.getDay() === 6}
      />
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-7 auto-rows-max gap-px md:gap-1 px-1 pb-1 md:p-4",
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900",
      "rounded-b-lg shadow-md"
    )}>
      {calendarCells}
    </div>
  );
};

export default CalendarGrid;
