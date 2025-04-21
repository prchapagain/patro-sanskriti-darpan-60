
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrintCalendarProps {
  language: 'np' | 'en';
}

const PrintCalendar: React.FC<PrintCalendarProps> = ({ language }) => {
  const handlePrint = () => {
    // First prepare the page for printing
    const originalTitle = document.title;
    document.title = language === 'np' ? "मेरो पात्रो प्रिन्ट" : "Mero Patro Print";
    
    // Create a print-specific stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .calendar-container, .calendar-container * {
          visibility: visible;
        }
        .calendar-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          box-shadow: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Print the document
    window.print();
    
    // Clean up
    document.head.removeChild(style);
    document.title = originalTitle;
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handlePrint}
      className="bg-white/10 hover:bg-white/20 border-white/20 text-white no-print"
    >
      <Printer className="h-4 w-4 mr-1" />
      {language === 'np' ? 'प्रिन्ट' : 'Print'}
    </Button>
  );
};

export default PrintCalendar;
