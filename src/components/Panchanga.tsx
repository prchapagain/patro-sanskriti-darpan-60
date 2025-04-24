
import React from "react";
import { cn } from "@/lib/utils";
import { 
  Moon, 
  Star, 
  BookOpen, 
  Diamond, 
  CalendarDays
} from "lucide-react";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";

interface PanchangaProps {
  thithi: string | null;
  nakshatra?: string | null;
  yoga?: string | null;
  karana?: string | null;
  vaar?: string | null;
  language: 'np' | 'en';
}

const Panchanga: React.FC<PanchangaProps> = ({
  thithi,
  nakshatra,
  yoga,
  karana,
  vaar,
  language
}) => {
  if (!thithi && !nakshatra && !yoga && !karana && !vaar) return null;

  const items = [
    { name: language === 'np' ? "तिथि" : "Tithi", value: thithi, icon: <Moon className="h-4 w-4" /> },
    { name: language === 'np' ? "नक्षत्र" : "Nakshatra", value: nakshatra, icon: <Star className="h-4 w-4" /> },
    { name: language === 'np' ? "योग" : "Yoga", value: yoga, icon: <BookOpen className="h-4 w-4" /> },
    { name: language === 'np' ? "करण" : "Karana", value: karana, icon: <Diamond className="h-4 w-4" /> },
    { name: language === 'np' ? "वार" : "Weekday", value: vaar, icon: <CalendarDays className="h-4 w-4" /> }
  ].filter(item => item.value);

  return (
    <div className="w-full my-2">
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2",
        language === 'np' ? "font-noto" : "font-mukta"
      )}>
        {items.map((item, index) => (
          item.value && (
            <Card key={index} className={cn(
              "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm",
              "border border-gray-200 dark:border-gray-800",
              "hover:shadow-md transition-all"
            )}>
              <CardContent className="p-3 flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <span className="text-nepali-purple dark:text-nepali-gold mr-2">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.name}:
                  </span>
                </div>
                <span className={cn(
                  "text-sm font-medium text-nepali-purple dark:text-nepali-gold",
                  "truncate max-w-[120px]"
                )}>
                  {item.value}
                </span>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>
  );
};

export default Panchanga;
