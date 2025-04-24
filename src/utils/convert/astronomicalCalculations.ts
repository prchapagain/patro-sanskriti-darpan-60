
// Astronomical calculations for tithi (lunar day)
// Direct port of the logic from https://github.com/khumnath/nepdate

const PI = Math.PI;
const d2r = PI / 180;
const r2d = 180 / PI;

// Single source of truth for tithi names - matching nepdate library exactly
export const tithiNames = {
  np: [
    "प्रथमा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी",
    "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रथमा",
    "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
    "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "औंसी"
  ],
  en: [
    "Prathama", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Sasthi", "Saptami", "Astami",
    "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Prathama",
    "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Sasthi", "Saptami", "Astami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Aaunsi"
  ]
};

// Direct port of C++ method from nepdate
export function gregorianToJulian(year: number, month: number, day: number): number {
  let y = year;
  let m = month;
  
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  
  return Math.floor(365.25 * (y + 4716)) + 
         Math.floor(30.6001 * (m + 1)) + 
         day + B - 1524.5;
}

// Direct port of C++ code from nepdate library
export function getMoonPosition(t: number): number {
  const L1 = 218.316 + 481267.8813 * t;
  const D = 297.8502 + 445267.1115 * t;
  const M1 = 134.963 + 477198.8671 * t;
  
  let lon = L1 + 
           6.289 * Math.sin(d2r * M1) - 
           1.274 * Math.sin(d2r * (2 * D - M1)) -
           0.658 * Math.sin(d2r * 2 * D) -
           0.214 * Math.sin(d2r * 2 * M1) +
           0.110 * Math.sin(d2r * D);
  
  lon = lon % 360;
  if (lon < 0) lon += 360;
  
  return lon;
}

// Direct port of C++ code from nepdate library
export function getSunPosition(t: number): number {
  const l0 = 280.4665 + 36000.7698 * t;
  const m = 357.5291 + 35999.0503 * t;
  
  const c = (1.9146 - 0.004817 * t - 0.000014 * t * t) * Math.sin(d2r * m) +
            (0.019993 - 0.000101 * t) * Math.sin(d2r * 2 * m) +
            0.000290 * Math.sin(d2r * 3 * m);
  
  let lon = l0 + c;
  lon = lon % 360;
  if (lon < 0) lon += 360;
  
  return lon;
}

// Exact port of C++ getTithiInfo function from nepdate
export function getPanchangaTithi(year: number, month: number, day: number) {
  // Get Julian date
  const jd = gregorianToJulian(year, month + 1, day);
  
  // Calculate time in Julian centuries
  const t = (jd - 2451545.0) / 36525.0;
  
  // Get positions of moon and sun
  let moon = getMoonPosition(t);
  let sun = getSunPosition(t);
  
  // Apply timezone adjustment for Nepal (UTC+5:45)
  const nepOffset = (5 * 60 + 45) / (24 * 60) * 360; // Convert 5:45 to degrees
  moon += nepOffset / 360;
  if (moon >= 360) moon -= 360;
  
  sun += nepOffset / 360;
  if (sun >= 360) sun -= 360;
  
  // Calculate angle between moon and sun
  let angle = moon - sun;
  if (angle < 0) angle += 360;
  
  // Calculate tithi
  const tithi = Math.floor(angle / 12);
  const paksha = tithi < 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";
  
  return {
    tithiNumber: tithi + 1,
    tithiNameNp: tithiNames.np[tithi],
    tithiNameEn: tithiNames.en[tithi],
    paksha
  };
}

// Get tithi name from Gregorian date
export function getTithiNameFromGregorian(date: Date, language: 'np' | 'en' = 'np'): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const tithiInfo = getPanchangaTithi(year, month, day);
  return language === 'np' ? tithiInfo.tithiNameNp : tithiInfo.tithiNameEn;
}

// Get tithi number from Gregorian date
export function getTithiNumberFromGregorian(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  
  const tithiInfo = getPanchangaTithi(year, month, day);
  return tithiInfo.tithiNumber;
}
