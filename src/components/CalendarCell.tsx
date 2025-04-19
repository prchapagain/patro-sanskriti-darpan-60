
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
              isToday ? "bg-amber-50 border-amber-300" : "",
              hasFest ? "festival-day border-nepali-red/30" : "",
              isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400",
              "flex flex-col"
            )}
          >
            <div className="flex justify-between text-xs">
              <span className={cn(
                "font-bold", 
                hasFest ? "text-nepali-red" : "",
                language === 'np' ? "font-noto" : ""  // Apply Nepali font
              )}>
                {displayDay}
              </span>
              <span className="text-gray-500">{displayGregDay}</span>
            </div>
            
            <div className="mt-1 flex flex-col gap-0.5">
              {/* Show festivals */}
              {festivalNames.map((name, index) => (
                <div 
                  key={`festival-${index}`} 
                  className={cn(
                    "text-[10px] truncate text-nepali-red",
                    language === 'np' ? "font-noto" : "" // Apply Nepali font
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
                    "text-[10px] truncate text-nepali-turquoise",
                    language === 'np' ? "font-noto" : "" // Apply Nepali font
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
                  "text-[10px] truncate text-nepali-purple",
                  language === 'np' ? "font-noto" : "" // Apply Nepali font
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
        <TooltipContent>
          <div className={cn(
            "text-sm",
            language === 'np' ? "font-noto" : "" // Apply Nepali font
          )}>
            {festivalNames.map((name, index) => (
              <div key={`tooltip-festival-${index}`} className="font-medium text-nepali-red">
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
