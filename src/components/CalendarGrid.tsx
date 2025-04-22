import React, { useEffect } from "react";
import CalendarCell from "./CalendarCell";
import { bsDays, getMonthLengths } from "@/utils/dateUtils";
import { getBsDateFromGregorian, getTodayBsDate } from "@/utils/nepaliCalendar";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  language: 'np' | 'en';
  onAutoRefresh: () => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, language, onAutoRefresh }) => {
  // Find BS date for displayed month
  const currentBs = getBsDateFromGregorian(currentDate);
  const { year: bsYear, month: bsMonth } = currentBs;
  
  // Auto-refresh to keep the calendar updated
  useEffect(() => {
    // Set up auto-refresh to update the calendar at midnight
    const calculateTimeToMidnight = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow.getTime() - now.getTime();
    };

    // Schedule the first refresh at midnight
    const timeToMidnight = calculateTimeToMidnight();
    const refreshTimer = setTimeout(() => {
      onAutoRefresh();
      // After the first refresh, set up daily refreshes
      const dailyRefresh = setInterval(onAutoRefresh, 24 * 60 * 60 * 1000);
      return () => clearInterval(dailyRefresh);
    }, timeToMidnight);

    return () => clearTimeout(refreshTimer);
  }, [onAutoRefresh]);
  
  // Get number of BS days in month
  const daysInMonth = getMonthLengths(bsYear)[bsMonth];
  
  // Find which Gregorian day is BS 1
  let firstDayOfBsMonth: Date | null = null;
  for (let d = 0; d < 31; d++) {
    const tryDate = new Date(currentDate);
    tryDate.setDate(1 + d);
    const bs = getBsDateFromGregorian(tryDate);
    if (bs.year === bsYear && bs.month === bsMonth && bs.day === 1) {
      firstDayOfBsMonth = tryDate;
      break;
    }
  }
  
  if (!firstDayOfBsMonth) {
    firstDayOfBsMonth = new Date(currentDate);
    firstDayOfBsMonth.setDate(1);
  }
  
  // Today for highlighting - Use actual today's date
  const realToday = new Date();
  realToday.setHours(0, 0, 0, 0);
  const todayBs = getTodayBsDate();

  // Render day names and calendar grid
  const calendarCells: React.ReactNode[] = [];
  
  // Render day names with increased height
  bsDays.forEach((day, i) => {
    calendarCells.push(
      <div key={`header-${i}`} className={cn(
        "text-center font-bold py-3 md:py-4 uppercase text-xs md:text-sm bg-gray-50 dark:bg-gray-900",
        "flex items-center justify-center min-h-[50px]",
        i === 6 ? "text-red-600" : ""
      )}>
        {language === 'np' ? day.np : day.en}
      </div>
    );
  });
  
  // Get the day of the week for the first day of the BS month (0 = Sunday, 6 = Saturday)
  const firstDayWeekday = firstDayOfBsMonth.getDay();
  
  // Add empty cells for the days of the week before the first day
  for (let i = 0; i < firstDayWeekday; i++) {
    calendarCells.push(
      <div key={`empty-start-${i}`} className="bg-transparent"></div>
    );
  }
  
  // Current month days - exactly the number of days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Find correct Date for this BS day
    let gDate: Date | null = null;
    for (let offset = -1; offset < 3; offset++) { // Include -1 to handle edge cases
      const guess = new Date(firstDayOfBsMonth as Date);
      guess.setDate((firstDayOfBsMonth as Date).getDate() + day - 1 + offset);
      const bs = getBsDateFromGregorian(guess);
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
  
  // Add empty cells for the remaining days of the week after the last day
  const lastDayWeekday = (firstDayWeekday + daysInMonth) % 7;
  if (lastDayWeekday !== 0) {
    for (let i = lastDayWeekday; i < 7; i++) {
      calendarCells.push(
        <div key={`empty-end-${i}`} className="bg-transparent"></div>
      );
    }
  }

  return (
    <div className={cn(
      "grid grid-cols-7 auto-rows-fr gap-px md:gap-1 px-1 pb-1 md:p-4",
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900",
      "rounded-b-lg shadow-md"
    )}>
      {calendarCells}
    </div>
  );
};

export default CalendarGrid;
