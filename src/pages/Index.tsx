
import React, { useState, useEffect } from "react";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import { cn } from "@/lib/utils";

const Index = () => {
  // Ensure date is set to the current system date
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    // Create a new date object with time set to noon to avoid timezone issues
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    console.log("Today's date initialized as:", today.toISOString());
    return today;
  });
  const [language, setLanguage] = useState<'np' | 'en'>('np');

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    console.log("Setting date to today:", today.toISOString());
    setCurrentDate(today);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'np' ? 'en' : 'np');
  };

  console.log("Current date in Index:", currentDate.toISOString());

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 nepali-pattern",
      "flex flex-col items-center justify-center p-4"
    )}>
      <div className={cn(
        "w-full max-w-4xl animate-fade-in",
      )}>
        <header className="text-center mb-8">
          <h1 className={cn(
            "text-3xl md:text-4xl font-bold mb-2",
            language === 'np' ? "font-noto text-4xl md:text-5xl" : "font-mukta"
          )}>
            {language === 'np' ? "मेरो पात्रो" : "Mero Patro"}
          </h1>
          <p className={cn(
            "text-gray-600",
            language === 'np' ? "font-noto text-xl" : "font-mukta"
          )}>
            {language === 'np' ? "तपाईंको डिजिटल पात्रो" : "Your Digital Calendar"}
          </p>
        </header>

        <div className="calendar-container overflow-hidden rounded-lg shadow-xl">
          <CalendarHeader
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            language={language}
            onLanguageToggle={toggleLanguage}
          />
          <CalendarGrid 
            currentDate={currentDate}
            language={language}
          />
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} {language === 'np' ? "मेरो पात्रो" : "Mero Patro"}</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
