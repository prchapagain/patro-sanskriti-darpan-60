
import React from "react";
import { Button } from "@/components/ui/button";
import { getBsDate, bsMonths } from "@/utils/dateUtils";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Calendar, Languages } from "lucide-react";

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
  // Get BS date
  const { year: bsYear, month: bsMonth } = getBsDate(currentDate);
  
  // Get month name
  const monthName = bsMonths[bsMonth][language];
  
  // Format Gregorian date
  const gregYear = currentDate.getFullYear();
  const gregMonth = currentDate.getMonth();
  
  // Month names in English
  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const gregMonthName = englishMonths[gregMonth];
  
  return (
    <div className={cn(
      "calendar-header p-4 rounded-t-lg",
      "flex flex-col md:flex-row items-center justify-between gap-4",
      "bg-gradient-to-r from-nepali-purple/90 to-nepali-deepRed/90"
    )}>
      <div className="flex flex-col items-center md:items-start">
        <h1 className={cn(
          "text-2xl font-bold text-white",
          language === 'np' ? "font-noto text-3xl" : "font-mukta"
        )}>
          {language === 'np' ? `${monthName} ${bsYear}` : `${monthName} ${bsYear} BS`}
        </h1>
        <p className="text-white/80 text-sm">
          {`${gregMonthName} ${gregYear}`}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          onClick={onPrevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          onClick={onToday}
        >
          <Calendar className="h-4 w-4 mr-1" />
          {language === 'np' ? 'आज' : 'Today'}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          onClick={onNextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/10 hover:bg-white/20 border-white/20 text-white"
          onClick={onLanguageToggle}
        >
          <Languages className="h-4 w-4 mr-1" />
          {language === 'np' ? 'ENG' : 'नेपाली'}
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
