
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
  isSaturday: boolean;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  bsDay,
  bsMonth,
  bsYear,
  gregorianDate,
  isToday,
  language,
  isCurrentMonth,
  isSaturday
}) => {
  const festivalNames = hasFestival(bsYear, bsMonth, bsDay)
    ? getFestivalName(bsYear, bsMonth, bsDay, language)
    : [];
  const thithi = getThithi(bsYear, bsMonth, bsDay, language);
  const internationalDays = getInternationalDays(gregorianDate, language);

  const isHoliday = festivalNames.length > 0;

  // BS/AD date representation
  const bsDisplay = language === 'np' ? toNepaliDigits(bsDay) : bsDay;
  const gregDay = gregorianDate.getDate();
  const adDisplay = language === 'np' ? toNepaliDigits(gregDay) : gregDay;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative min-h-[90px] p-1 border rounded-md transition-all duration-300 cursor-pointer",
              "hover:shadow-lg hover:scale-105 transform",
              isToday ? "bg-amber-50 border-amber-300 ring-2 ring-amber-300 dark:bg-yellow-900/40" : "",
              isHoliday ? "animate-pulse-slow bg-red-50/30 dark:bg-red-900/20" : "",
              isSaturday ? "bg-red-50/30 border-red-300 dark:bg-red-900/10" : "",
              isCurrentMonth ? "bg-white dark:bg-gray-950" : "bg-gray-50/60 text-gray-400 dark:bg-gray-800/40",
              "flex flex-col items-center justify-start"
            )}
          >
            {/* Date numbers row */}
            <div className="flex flex-col w-full items-center mt-1 mb-1">
              <span className={cn(
                "font-bold leading-6 text-center",
                "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl",
                language === 'np' ? "font-noto" : "font-mukta",
                isToday ? "text-amber-600 dark:text-yellow-200 shadow-sm" : "",
                isHoliday ? "text-red-600 dark:text-red-300" : "",
                isSaturday ? "text-red-600 dark:text-red-300" : ""
              )}>
                {bsDisplay}
              </span>
              <span className={cn(
                "text-xs md:text-sm leading-3 mt-0.5",
                isHoliday || isSaturday ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-300"
              )}>{adDisplay}</span>
            </div>
            {/* Festival / International / Tithi Notes */}
            <div className="flex flex-col gap-0.5 w-full items-center mb-1">
              {festivalNames.map((name, index) => (
                <div key={`festival-${index}`} className={cn(
                  "text-[11px] truncate font-semibold px-1 rounded",
                  "text-red-600 dark:text-red-300 bg-red-50/60 dark:bg-red-900/30 animate-fade-in-slow",
                  language === 'np' ? "font-noto" : ""
                )}>
                  <span className="inline-flex items-center">
                    <Calendar className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
              {internationalDays.map((name, index) => (
                <div key={`international-${index}`} className={cn(
                  "text-[10px] truncate text-nepali-turquoise animate-fade-in-slow",
                  language === 'np' ? "font-noto" : ""
                )}>
                  <span className="inline-flex items-center">
                    <Globe className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
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
        <TooltipContent className={cn(
          (isHoliday || isSaturday) ? "bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800" : "",
          "animate-in fade-in-0 zoom-in-95 dark:bg-gray-900"
        )}>
          <div className={cn(
            "text-sm",
            language === 'np' ? "font-noto" : ""
          )}>
            {isSaturday && (
              <div className="font-medium text-red-600 dark:text-red-300">
                {language === 'np' ? "शनिबार बिदा" : "Saturday Holiday"}
              </div>
            )}
            {festivalNames.map((name, index) => (
              <div key={`tooltip-festival-${index}`} className={cn(
                "font-medium",
                isHoliday ? "text-red-600 dark:text-red-300" : "text-nepali-red"
              )}>
                {name}
              </div>
            ))}
            {internationalDays.map((name, index) => (
              <div key={`tooltip-international-${index}`} className="font-medium text-nepali-turquoise">{name}</div>
            ))}
            {thithi && (<div className="font-medium text-nepali-purple">{thithi}</div>)}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CalendarCell;
