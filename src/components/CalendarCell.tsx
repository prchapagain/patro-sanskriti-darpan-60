
import React from "react";
import { cn } from "@/lib/utils";
import { hasFestival, getFestivalName, toNepaliDigits } from "@/utils/dateUtils";

interface CalendarCellProps {
  bsDay: number;
  bsMonth: number;
  bsYear: number;
  gregorianDate: Date;
  isToday: boolean;
  language: 'np' | 'en';
  isCurrentMonth: boolean;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  bsDay,
  bsMonth,
  bsYear,
  gregorianDate,
  isToday,
  language,
  isCurrentMonth
}) => {
  const hasFest = hasFestival(bsYear, bsMonth, bsDay);
  const festivalNames = hasFest ? getFestivalName(bsYear, bsMonth, bsDay, language) : [];
  
  // Display number based on language
  const displayDay = language === 'np' ? toNepaliDigits(bsDay) : bsDay.toString();
  
  // Gregorian date display
  const gregDay = gregorianDate.getDate();
  const displayGregDay = language === 'np' ? toNepaliDigits(gregDay) : gregDay.toString();

  return (
    <div 
      className={cn(
        "relative min-h-[80px] p-1 border rounded-md transition-all duration-200 hover:shadow-md",
        isToday ? "today-cell" : "",
        hasFest ? "festival-day" : "",
        isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400",
        "flex flex-col"
      )}
    >
      <div className="flex justify-between text-xs">
        <span className={cn("font-bold", hasFest ? "text-nepali-red" : "")}>{displayDay}</span>
        <span className="text-gray-500">{displayGregDay}</span>
      </div>
      
      {hasFest && (
        <div className="mt-1 text-[10px] text-nepali-red font-semibold truncate">
          {festivalNames.map((festival, index) => (
            <div key={index} className="truncate">{festival}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarCell;
