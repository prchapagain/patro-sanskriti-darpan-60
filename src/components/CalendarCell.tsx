
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Moon } from "lucide-react";
import { hasFestival, getFestivalName, toNepaliDigits } from "@/utils/dateUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
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
              <span className={cn(
                "font-bold", 
                hasFest ? "text-nepali-red" : ""
              )}>
                {displayDay}
              </span>
              <span className="text-gray-500">{displayGregDay}</span>
            </div>
            
            {hasFest && (
              <div className="mt-1 flex flex-col gap-0.5">
                {festivalNames.map((name, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "text-[10px] truncate",
                      index === festivalNames.length - 1 ? "text-nepali-purple" : "text-nepali-red"
                    )}
                  >
                    <span className="inline-flex items-center">
                      {index === festivalNames.length - 1 ? (
                        <Moon className="h-3 w-3 mr-0.5" />
                      ) : (
                        <Calendar className="h-3 w-3 mr-0.5" />
                      )}
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            {festivalNames.map((name, index) => (
              <div key={index} className="font-medium">
                {name}
              </div>
            ))}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CalendarCell;

