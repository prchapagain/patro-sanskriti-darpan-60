
import React, { useState, useEffect } from "react";
import CalendarHeader from "@/components/CalendarHeader";
import CalendarGrid from "@/components/CalendarGrid";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getBsDate } from "@/utils/dateUtils";
import Panchanga from "@/components/Panchanga";

const Index = () => {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    return today;
  });
  const [language, setLanguage] = useState<'np' | 'en'>('np');

  // Auto-refresh when the date changes (midnight)
  const handleAutoRefresh = () => {
    console.log('Auto refreshing calendar with new date');
    const today = new Date();
    today.setHours(12, 0, 0, 0);
    setCurrentDate(today);
  };

  // Ensure the calendar is up-to-date when the component first mounts
  useEffect(() => {
    handleAutoRefresh();
  }, []);

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
    setCurrentDate(today);
  };
  const toggleLanguage = () => setLanguage(language === 'np' ? 'en' : 'np');

  // Get today's BS date for Panchanga information
  const todayBs = getBsDate(currentDate);
  const thithi = language === 'np' ? "प्रतिपदा" : "Pratipada";
  const nakshatra = language === 'np' ? "अश्विनी" : "Ashwini";
  const yoga = language === 'np' ? "विष्कुम्भ" : "Vishkumbh";
  const karana = language === 'np' ? "बव" : "Bav";
  const vaar = language === 'np' ? "सोमबार" : "Monday";

  return (
    <ThemeProvider>
      <div className={cn(
        "min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 nepali-pattern",
        "flex flex-col items-center justify-center p-4"
      )}>
        <div className={cn(
          "w-full max-w-4xl animate-fade-in"
        )}>
          <header className="text-center mb-8">
            <h1 className={cn(
              "text-3xl md:text-4xl font-bold mb-2",
              language === 'np' ? "font-noto text-4xl md:text-5xl" : "font-mukta"
            )}>
              {language === 'np' ? "मेरो पात्रो" : "Mero Patro"}
            </h1>
            <p className={cn(
              "text-gray-600 dark:text-gray-300",
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
            
            {/* Panchanga Section - Added between header and grid */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <h3 className={cn(
                "text-lg font-medium mb-2 text-center text-gray-700 dark:text-gray-300",
                language === 'np' ? "font-noto" : "font-mukta"
              )}>
                {language === 'np' ? "पञ्चाङ्ग" : "Panchanga"}
              </h3>
              <Panchanga 
                thithi={thithi}
                nakshatra={nakshatra}
                yoga={yoga}
                karana={karana}
                vaar={vaar}
                language={language}
              />
            </div>
            
            <CalendarGrid
              currentDate={currentDate}
              language={language}
              onAutoRefresh={handleAutoRefresh}
            />
          </div>
          <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {language === 'np' ? "मेरो पात्रो" : "Mero Patro"}</p>
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
