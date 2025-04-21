
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Calendar, Clock } from "lucide-react";

interface PanchangaTodayProps {
  language: 'np' | 'en';
}

/**
 * Specialized "today" Panchanga data for ८ वैशाख २०८२ (April 21, 2025)
 * Derived from https://github.com/khumnath/nepdate/blob/main/panchanga.h
 */
const todayPanchangaNp = {
  date: "८ वैशाख २०८२, सोमवार",
  tithi: "वैशाख शुक्ल प्रतिपदा",
  panchanga: "विषकुम्भ बव अश्विनी",
  time: "रात्रिको ०८ : ५३",
  ad: "Apr 21, 2025"
};

const todayPanchangaEn = {
  date: "8 Baishakh 2082, Monday",
  tithi: "Baishakh Shukla Pratipada",
  panchanga: "Vishkumbha Bava Ashwini",
  time: "20:53 Night",
  ad: "Apr 21, 2025"
};

const PanchangaToday: React.FC<PanchangaTodayProps> = ({ language }) => {
  const data = language === 'np' ? todayPanchangaNp : todayPanchangaEn;
  
  return (
    <Card className="my-6 mx-auto p-2 glass-morphism dark:bg-gray-900/60 border-nepali-purple/10 rounded-2xl w-full max-w-lg shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="font-semibold text-xl md:text-2xl text-nepali-purple">
            {data.date}
          </div>
          
          <div className="flex items-center text-sm md:text-base text-nepali-deepRed font-medium">
            <Moon className="h-4 w-4 mr-1.5 text-nepali-deepRed" />
            {data.tithi}
          </div>
          
          <div className="flex items-center text-[15px] font-medium text-primary mt-2">
            <Calendar className="h-4 w-4 mr-1.5 text-primary" />
            {language === "np" ? "पञ्चाङ्ग" : "Panchanga"}: {data.panchanga}
          </div>
          
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-200">
            <Clock className="h-4 w-4 mr-1.5 text-gray-600 dark:text-gray-300" />
            {data.time}
          </div>
          
          <div className="text-xs text-gray-500 mt-1 bg-gray-100 dark:bg-gray-800/50 px-2 py-0.5 rounded-full">
            {data.ad}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanchangaToday;
