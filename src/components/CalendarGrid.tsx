
import React from "react";
import CalendarCell from "./CalendarCell";
import { bsDays, bsMonthLengths, getBsDate } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  language: 'np' | 'en';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, language }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Consistent for timezone

  const todayBs = getBsDate(today);
  const currentBs = getBsDate(currentDate);
  const { year: bsYear, month: bsMonth } = currentBs;

  const daysInMonth = bsMonthLengths[bsYear]?.[bsMonth] || 30;

  // First day of current month in Gregorian calendar
  const firstDayOfMonth = new Date(currentDate);
  firstDayOfMonth.setDate(1);
  const firstDayBs = getBsDate(firstDayOfMonth);
  while (firstDayBs.day !== 1 || firstDayBs.month !== bsMonth || firstDayBs.year !== bsYear) {
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    const newBs = getBsDate(firstDayOfMonth);
    if (newBs.day === 1 && newBs.month === bsMonth && newBs.year === bsYear) break;
  }

  const startDayIndex = firstDayOfMonth.getDay();

  // Render header
  const calendarCells: React.ReactNode[] = [];
  bsDays.forEach((day, index) => {
    calendarCells.push(
      <div key={`header-${index}`} className={cn(
        "text-center font-bold py-2 bg-gray-50 dark:bg-gray-900",
        index === 6 ? "text-red-600" : ""
      )}>
        {language === 'np' ? day.np : day.en}
      </div>
    );
  });

  // Previous month's trailing days
  for (let i = 0; i < startDayIndex; i++) {
    const prevMonthDate = new Date(firstDayOfMonth);
    prevMonthDate.setDate(prevMonthDate.getDate() - (startDayIndex - i));
    const prevBsDate = getBsDate(prevMonthDate);
    const isSaturday = prevMonthDate.getDay() === 6;
    calendarCells.push(
      <CalendarCell
        key={`prev-${i}`}
        bsDay={prevBsDate.day}
        bsMonth={prevBsDate.month}
        bsYear={prevBsDate.year}
        gregorianDate={prevMonthDate}
        isToday={false}
        language={language}
        isCurrentMonth={false}
        isSaturday={isSaturday}
      />
    );
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDayDate = new Date(firstDayOfMonth);
    currentDayDate.setDate(firstDayOfMonth.getDate() + day - 1);
    const currentBsDate = getBsDate(currentDayDate);
    while (currentBsDate.day !== day || currentBsDate.month !== bsMonth || currentBsDate.year !== bsYear) {
      currentDayDate.setDate(currentDayDate.getDate() + 1);
      const newBs = getBsDate(currentDayDate);
      if (newBs.day === day && newBs.month === bsMonth && newBs.year === bsYear) break;
    }
    const isToday = todayBs.year === bsYear && todayBs.month === bsMonth && todayBs.day === day;
    const isSaturday = currentDayDate.getDay() === 6;
    calendarCells.push(
      <CalendarCell
        key={`current-${day}`}
        bsDay={day}
        bsMonth={bsMonth}
        bsYear={bsYear}
        gregorianDate={currentDayDate}
        isToday={isToday}
        language={language}
        isCurrentMonth={true}
        isSaturday={isSaturday}
      />
    );
  }

  // Add next month's leading days
  const totalCellsShown = 42;
  const currentDaysCount = daysInMonth + startDayIndex;
  const nextMonthDays = totalCellsShown - currentDaysCount;
  for (let day = 1; day <= nextMonthDays; day++) {
    const nextMonthDate = new Date(firstDayOfMonth);
    nextMonthDate.setDate(firstDayOfMonth.getDate() + daysInMonth + day - 1);
    const nextBsDate = getBsDate(nextMonthDate);
    const isSaturday = nextMonthDate.getDay() === 6;

    calendarCells.push(
      <CalendarCell
        key={`next-${day}`}
        bsDay={nextBsDate.day}
        bsMonth={nextBsDate.month}
        bsYear={nextBsDate.year}
        gregorianDate={nextMonthDate}
        isToday={false}
        language={language}
        isCurrentMonth={false}
        isSaturday={isSaturday}
      />
    );
  }

  return (
    <div className={cn(
      "grid grid-cols-7 gap-1 p-4",
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900",
      "rounded-b-lg shadow-md"
    )}>
      {calendarCells}
    </div>
  );
};

export default CalendarGrid;
