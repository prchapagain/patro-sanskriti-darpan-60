
import React from "react";
import { Button } from "@/components/ui/button";
import { getBsDate, bsMonths } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar, Languages } from "lucide-react";
import PrintCalendar from "./PrintCalendar";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  language: 'np' | 'en';
  onLanguageToggle: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
  language,
  onLanguageToggle
}) => {
  const { theme, toggle } = useTheme();
  const { year: bsYear, month: bsMonth } = getBsDate(currentDate);

  // Format Gregorian date
  const gregYear = currentDate.getFullYear();
  const gregMonth = currentDate.getMonth();
  const gregDate = currentDate.getDate();

  // Month names in English
  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthNameBS = bsMonths[bsMonth][language];
  const monthNameAD = englishMonths[gregMonth];

  return (
    <div className={cn(
      "calendar-header p-4 rounded-t-lg flex flex-col md:flex-row items-center justify-between gap-4",
      "bg-gradient-to-r from-nepali-purple/90 to-nepali-deepRed/90 dark:from-gray-900 dark:to-gray-800"
    )}>
      <div className="flex flex-col items-center md:items-start">
        <h1 className={cn(
          "text-2xl font-bold text-white",
          language === 'np' ? "font-noto text-3xl" : "font-mukta"
        )}>
          {language === 'np'
            ? `${monthNameBS} ${bsYear} | ${monthNameAD} ${gregYear}`
            : `${monthNameBS} ${bsYear} BS | ${monthNameAD} ${gregYear}`}
        </h1>
        <p className="text-white/80 text-sm">
          {language === "np"
            ? `मिति: ${monthNameBS} ${bsYear}, ${monthNameAD} ${gregYear}`
            : `Date: ${monthNameAD} ${gregYear} | ${monthNameBS} ${bsYear}`}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={onPrevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={onToday}>
          <Calendar className="h-4 w-4 mr-1" />
          {language === 'np' ? 'आज' : 'Today'}
        </Button>
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={onLanguageToggle}>
          <Languages className="h-4 w-4 mr-1" />
          {language === 'np' ? 'ENG' : 'नेपाली'}
        </Button>
        <PrintCalendar language={language} />
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
    </div>
  );
};

export default CalendarHeader;
