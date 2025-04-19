
import React from "react";
import { cn } from "@/lib/utils";
import { Calendar, Moon, Globe } from "lucide-react";
import { 
  hasFestival, 
  getFestivalName, 
  getThithi, 
  toNepaliDigits,
  getInternationalDays
} from "@/utils/dateUtils";
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
  const thithi = getThithi(bsYear, bsMonth, bsDay, language);
  const internationalDays = getInternationalDays(gregorianDate, language);

  // Check if this day is a holiday/leave (बिदा)
  const isHoliday = festivalNames.length > 0;
  
  // Check if this day is a Saturday
  const isSaturday = gregorianDate.getDay() === 6;
  
  const displayDay = isToday 
    ? (language === 'np' ? "आज" : "Today") 
    : (language === 'np' ? toNepaliDigits(bsDay) : bsDay.toString());
  
  const gregDay = gregorianDate.getDate();
  const displayGregDay = language === 'np' ? toNepaliDigits(gregDay) : gregDay.toString();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "relative min-h-[80px] p-1 border rounded-md transition-all duration-300",
              "hover:shadow-lg hover:scale-105 transform",
              isToday ? "bg-amber-50 border-amber-300 ring-2 ring-amber-300" : "", // Enhanced today highlight
              isHoliday ? "animate-pulse-slow bg-red-50/30" : "",
              isSaturday ? "bg-red-50/20" : "",
              isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400",
              "flex flex-col"
            )}
          >
            <div className={cn(
              "flex justify-between text-xs",
              (isHoliday || isSaturday) && "text-red-600 font-bold"
            )}>
              <span className={cn(
                "font-bold", 
                isToday ? "text-amber-500" : "",
                (isHoliday || isSaturday) ? "text-red-600" : "",
                language === 'np' ? "font-noto" : ""
              )}>
                {displayDay}
              </span>
              <span className={(isHoliday || isSaturday) ? "text-red-400" : "text-gray-500"}>
                {displayGregDay}
              </span>
            </div>
            
            <div className="mt-1 flex flex-col gap-0.5">
              {/* Show festivals with enhanced styling */}
              {festivalNames.map((name, index) => (
                <div 
                  key={`festival-${index}`} 
                  className={cn(
                    "text-[10px] truncate",
                    "text-red-600 font-semibold",
                    "animate-fade-in-slow",
                    language === 'np' ? "font-noto" : "",
                    isHoliday && "bg-red-50/50 rounded px-1 py-0.5"
                  )}
                >
                  <span className="inline-flex items-center">
                    <Calendar className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
              
              {/* Show international days */}
              {internationalDays.map((name, index) => (
                <div 
                  key={`international-${index}`} 
                  className={cn(
                    "text-[10px] truncate text-nepali-turquoise animate-fade-in-slow",
                    language === 'np' ? "font-noto" : ""
                  )}
                >
                  <span className="inline-flex items-center">
                    <Globe className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
              
              {/* Show thithi with improved styling */}
              {thithi && (
                <div className={cn(
                  "text-[10px] truncate text-nepali-purple animate-fade-in-slow",
                  language === 'np' ? "font-noto" : ""
                )}>
                  <span className="inline-flex items-center">
                    <Moon className="h-3 w-3 mr-0.5" />
                    {thithi}
                  </span>
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent 
          className={cn(
            (isHoliday || isSaturday) ? "bg-red-50 border-red-200" : "",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          <div className={cn(
            "text-sm",
            language === 'np' ? "font-noto" : ""
          )}>
            {isSaturday && !isHoliday && (
              <div className="font-medium text-red-600">
                {language === 'np' ? "शनिबार बिदा" : "Saturday Holiday"}
              </div>
            )}
            {festivalNames.map((name, index) => (
              <div 
                key={`tooltip-festival-${index}`} 
                className={cn(
                  "font-medium",
                  isHoliday ? "text-red-600" : "text-nepali-red"
                )}
              >
                {name}
              </div>
            ))}
            {internationalDays.map((name, index) => (
              <div key={`tooltip-international-${index}`} className="font-medium text-nepali-turquoise">
                {name}
              </div>
            ))}
            {thithi && (
              <div className="font-medium text-nepali-purple">
                {thithi}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CalendarCell;
