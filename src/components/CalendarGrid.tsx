
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
  
  // Get the Gregorian date for BS day 1 of the current month
  const firstDayOfMonth = getGregorianDate(bsYear, bsMonth, 1);
  
  // Calculate the day of week (0-6, Sunday-Saturday)
  const firstDayIndex = firstDayOfMonth.getDay();
  
  console.log(`First day of ${bsMonth+1}/${bsYear} BS is:`, 
    firstDayOfMonth.toDateString(), 
    `Day of week: ${firstDayIndex}`
  );
  
  // Today for highlighting 
  const realToday = new Date();
  realToday.setHours(0, 0, 0, 0);
  const todayBs = getBsDate(realToday);

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
  
  // Current month days - render ONLY the actual days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    // Get Gregorian date for this BS day using the direct conversion function
    const gDate = getGregorianDate(bsYear, bsMonth, day);
    
    // Log key dates for debugging
    if (day % 7 === 0 || day === 1 || day === 15) {
      console.log(`BS date ${day}/${bsMonth+1}/${bsYear} = AD date: ${gDate.toDateString()}, Day of week: ${gDate.getDay()}`);
    }
    
    // Check if today
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
