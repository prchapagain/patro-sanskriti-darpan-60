
import React from "react";

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
    <div className="my-6 mx-auto p-4 md:p-6 glass-morphism dark:bg-gray-900/60 border-nepali-purple/10 rounded-2xl w-full max-w-lg">
      <div className="flex flex-col items-center gap-1 text-center">
        <div className="font-semibold text-lg md:text-xl text-nepali-purple">{data.date}</div>
        <div className="text-sm md:text-base text-nepali-deepRed">
          {data.tithi}
        </div>
        <div className="text-[15px] font-medium text-primary mt-2 mb-1">
          {language === "np" ? "पञ्चाङ्ग" : "Panchanga"}: {data.panchanga}
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {language === "np" ? "रात्रिको" : "Night"} {data.time}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {data.ad}
        </div>
      </div>
    </div>
  );
};

export default PanchangaToday;
