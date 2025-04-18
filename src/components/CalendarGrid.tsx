
import React from "react";
import CalendarCell from "./CalendarCell";
import { bsDays, bsMonthLengths, getBsDate } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  language: 'np' | 'en';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, language }) => {
  // Get current BS date
  const today = new Date();
  const todayBs = getBsDate(today);
  
  // Get current view month/year in BS
  const currentBs = getBsDate(currentDate);
  const { year: bsYear, month: bsMonth } = currentBs;
  
  // Days in the current BS month
  const daysInMonth = bsMonthLengths[bsYear]?.[bsMonth] || 30;
  
  // Calculate the first day of the month
  const firstDayOfMonth = new Date(currentDate);
  // Adjust to the first day of the BS month (this is a simplification)
  firstDayOfMonth.setDate(1);
  
  const startDayIndex = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Create calendar grid with cells
  const calendarCells: React.ReactNode[] = [];
  
  // Generate day headers (Sun, Mon, etc.)
  bsDays.forEach((day, index) => {
    calendarCells.push(
      <div key={`header-${index}`} className="text-center font-bold py-2">
        {language === 'np' ? day.np : day.en}
      </div>
    );
  });
  
  // Previous month's trailing days
  for (let i = 0; i < startDayIndex; i++) {
    const prevMonthDays = bsMonthLengths[bsMonth === 0 ? bsYear - 1 : bsYear]?.[bsMonth === 0 ? 11 : bsMonth - 1] || 30;
    const day = prevMonthDays - startDayIndex + i + 1;
    
    // Create a date object for the previous month
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setDate(prevMonthDate.getDate() - (startDayIndex - i));
    
    const prevBsDate = {
      year: bsMonth === 0 ? bsYear - 1 : bsYear,
      month: bsMonth === 0 ? 11 : bsMonth - 1,
      day
    };
    
    calendarCells.push(
      <CalendarCell
        key={`prev-${i}`}
        bsDay={day}
        bsMonth={prevBsDate.month}
        bsYear={prevBsDate.year}
        gregorianDate={prevMonthDate}
        isToday={false}
        language={language}
        isCurrentMonth={false}
      />
    );
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    // Create a date object for the current month
    const date = new Date(currentDate);
    date.setDate(date.getDate() - startDayIndex + day - 1);
    
    const isToday = 
      todayBs.year === bsYear && 
      todayBs.month === bsMonth && 
      todayBs.day === day;
    
    calendarCells.push(
      <CalendarCell
        key={`current-${day}`}
        bsDay={day}
        bsMonth={bsMonth}
        bsYear={bsYear}
        gregorianDate={date}
        isToday={isToday}
        language={language}
        isCurrentMonth={true}
      />
    );
  }
  
  // Add next month's leading days to complete the grid
  const totalCellsShown = 42; // 6 rows of 7 days
  const nextMonthDays = totalCellsShown - (startDayIndex + daysInMonth);
  
  for (let day = 1; day <= nextMonthDays; day++) {
    // Create a date object for the next month
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setDate(nextMonthDate.getDate() + daysInMonth - startDayIndex + day);
    
    const nextBsDate = {
      year: bsMonth === 11 ? bsYear + 1 : bsYear,
      month: bsMonth === 11 ? 0 : bsMonth + 1,
      day
    };
    
    calendarCells.push(
      <CalendarCell
        key={`next-${day}`}
        bsDay={day}
        bsMonth={nextBsDate.month}
        bsYear={nextBsDate.year}
        gregorianDate={nextMonthDate}
        isToday={false}
        language={language}
        isCurrentMonth={false}
      />
    );
  }
  
  return (
    <div className={cn(
      "grid grid-cols-7 gap-1 p-4",
      "bg-gradient-to-br from-white to-gray-50",
      "rounded-b-lg shadow-md"
    )}>
      {calendarCells}
    </div>
  );
};

export default CalendarGrid;
