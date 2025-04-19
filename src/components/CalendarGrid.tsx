
import React, { useEffect } from "react";
import CalendarCell from "./CalendarCell";
import { bsDays, bsMonthLengths, getBsDate } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  currentDate: Date;
  language: 'np' | 'en';
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, language }) => {
  // Get current BS date for today
  const today = new Date();
  const todayBs = getBsDate(today);
  
  // Get current view month/year in BS
  const currentBs = getBsDate(currentDate);
  const { year: bsYear, month: bsMonth } = currentBs;
  
  console.log("Today's date:", today.toISOString());
  console.log("Today's BS date:", todayBs);
  console.log("Current view BS date:", currentBs);
  
  // Days in the current BS month
  const daysInMonth = bsMonthLengths[bsYear]?.[bsMonth] || 30;
  
  // Calculate the first day of the month in Gregorian calendar
  const firstDayOfMonth = new Date(currentDate);
  firstDayOfMonth.setDate(1); // Set to first day of the current month
  
  // Find the correct BS date for the 1st of this month
  const firstDayBs = getBsDate(firstDayOfMonth);
  
  // Adjust firstDayOfMonth to the actual first day of the BS month
  while (firstDayBs.day !== 1 || firstDayBs.month !== bsMonth || firstDayBs.year !== bsYear) {
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    const newBs = getBsDate(firstDayOfMonth);
    if (newBs.day === 1 && newBs.month === bsMonth && newBs.year === bsYear) {
      break;
    }
  }
  
  const startDayIndex = firstDayOfMonth.getDay(); // 0 = Sunday, 6 = Saturday
  console.log("First day of BS month starts on weekday:", startDayIndex, "(0=Sun, 6=Sat)");
  
  // Create calendar grid with cells
  const calendarCells: React.ReactNode[] = [];
  
  // Generate day headers (Sun, Mon, etc.)
  bsDays.forEach((day, index) => {
    calendarCells.push(
      <div key={`header-${index}`} className={cn(
        "text-center font-bold py-2",
        index === 6 ? "text-red-600" : "" // Saturday in red
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
    
    // Check if the date is a Saturday (6)
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
    // Create a date object for this BS day
    const currentDayDate = new Date(firstDayOfMonth);
    currentDayDate.setDate(firstDayOfMonth.getDate() + day - 1);
    
    const currentBsDate = getBsDate(currentDayDate);
    
    // Double-check that our calculation is correct
    while (currentBsDate.day !== day || currentBsDate.month !== bsMonth || currentBsDate.year !== bsYear) {
      currentDayDate.setDate(currentDayDate.getDate() + 1);
      const newBs = getBsDate(currentDayDate);
      if (newBs.day === day && newBs.month === bsMonth && newBs.year === bsYear) {
        break;
      }
    }
    
    const isToday = 
      todayBs.year === bsYear && 
      todayBs.month === bsMonth && 
      todayBs.day === day;
      
    // Check if the date is a Saturday (6)
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
  
  // Add next month's leading days to complete the grid
  const totalCellsShown = 42; // 6 rows of 7 days
  const currentDaysCount = daysInMonth + startDayIndex;
  const nextMonthDays = totalCellsShown - currentDaysCount;
  
  for (let day = 1; day <= nextMonthDays; day++) {
    // Create a date object for the next month
    const nextMonthDate = new Date(firstDayOfMonth);
    nextMonthDate.setDate(firstDayOfMonth.getDate() + daysInMonth + day - 1);
    
    const nextBsDate = getBsDate(nextMonthDate);
    
    // Check if the date is a Saturday (6)
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
      "bg-gradient-to-br from-white to-gray-50",
      "rounded-b-lg shadow-md"
    )}>
      {calendarCells}
    </div>
  );
};

export default CalendarGrid;
