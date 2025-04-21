
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

// Helper to format both BS and AD side by side, large
function BigDateView({ bsDay, adDay, language, isToday, isHoliday, isSaturday }: {
  bsDay: number,
  adDay: number,
  language: 'np' | 'en',
  isToday: boolean,
  isHoliday: boolean,
  isSaturday: boolean
}) {
  return (
    <div className="flex flex-col items-center w-full">
      <span className={cn(
        "leading-none font-bold tracking-tight",
        "text-4xl md:text-5xl lg:text-5xl",
        language === "np" ? "font-noto" : "font-mukta",
        isToday ? "text-yellow-600 dark:text-yellow-200 ring-4 ring-yellow-300/50 dark:ring-yellow-400/30 p-1 rounded-full" : "",
        isHoliday ? "text-red-600 dark:text-red-300" : "",
        isSaturday ? "text-red-500 dark:text-red-300" : "text-gray-800 dark:text-gray-100"
      )}>
        {language === "np" ? toNepaliDigits(bsDay) : bsDay}
      </span>
      <span className={cn(
        "text-xs font-medium mt-1",
        isHoliday || isSaturday ? "text-red-400 dark:text-red-300" : "text-gray-500 dark:text-gray-300"
      )}>
        {language === "np" ? toNepaliDigits(adDay) : adDay}
      </span>
    </div>
  )
}

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

  // Gregorian date always shown (AD)
  const adDisplay = gregorianDate.getDate();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "relative min-h-[96px] p-[6px] md:p-2 border rounded-lg md:rounded-xl transition-all duration-200 cursor-pointer select-none",
              "hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transform-gpu",
              isToday ? "bg-yellow-50 border-yellow-200 shadow-lg shadow-yellow-200/20 dark:bg-yellow-950/40 dark:shadow-yellow-900/10" : "",
              isHoliday ? "bg-red-50/50 border-red-200 dark:bg-red-900/20" : "",
              isSaturday ? "bg-red-50 border-red-200 dark:bg-red-900/10" : "",
              isCurrentMonth ? "bg-white dark:bg-gray-950" : "bg-gray-50/40 text-gray-400 dark:bg-gray-800/40",
              "flex flex-col items-center justify-between"
            )}
          >
            <BigDateView
              bsDay={bsDay}
              adDay={adDisplay}
              language={language}
              isToday={isToday}
              isHoliday={isHoliday}
              isSaturday={isSaturday}
            />
            {/* Festival / International / Tithi */}
            <div className="flex flex-col gap-1 w-full items-center mb-0.5 mt-1">
              {festivalNames.map((name, index) => (
                <div key={`festival-${index}`} className={cn(
                  "text-[11px] truncate font-semibold px-1 rounded leading-tight",
                  "text-red-600 dark:text-red-300 bg-red-50/70 dark:bg-red-900/30"
                )}>
                  <span className="inline-flex items-center gap-x-1">
                    <Calendar className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
              {internationalDays.map((name, index) => (
                <div key={`international-${index}`} className={cn(
                  "text-[10px] truncate text-nepali-turquoise"
                )}>
                  <span className="inline-flex items-center gap-x-1">
                    <Globe className="h-3 w-3 mr-0.5" />
                    {name}
                  </span>
                </div>
              ))}
              {thithi && (
                <div className={cn(
                  "text-[10px] truncate text-nepali-purple"
                )}>
                  <span className="inline-flex items-center gap-x-1">
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
            "text-xs",
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
              )}>{name}</div>
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
