
// Astronomical calculations for tithi (lunar day)
// Matching the logic from https://github.com/khumnath/nepdate

const PI = Math.PI;
const d2r = PI / 180;
const r2d = 180 / PI;

// Single source of truth for tithi names - matching nepdate library
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

// Convert Gregorian date to Julian date - matching the C++ implementation
export function gregorianToJulian(year: number, month: number, day: number): number {
  // Same logic as nepdate C++ implementation
  if (month <= 2) {
    year--;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716))
    + Math.floor(30.6001 * (month + 1))
    + day + B - 1524.5;
}

// Get moon's longitude - directly mapped from nepdate C++ implementation
function getMoonLongitude(t: number): number {
  // Coefficients from nepdate C++ library
  const L1 = 218.316 + 481267.8813 * t;
  const D = 297.8502 + 445267.1115 * t;
  const M1 = 134.963 + 477198.8671 * t;

  // Same formula as in nepdate C++ version
  const lon = L1
    + 6.289 * Math.sin(d2r * M1)
    - 1.274 * Math.sin(d2r * (2 * D - M1))
    - 0.658 * Math.sin(d2r * 2 * D)
    - 0.214 * Math.sin(d2r * 2 * M1)
    + 0.11 * Math.sin(d2r * D);

  return lon % 360;
}

// Get sun's longitude - directly mapped from nepdate C++ implementation
function getSunLongitude(t: number): number {
  // Coefficients from nepdate C++ library
  const l0 = 280.4665 + 36000.7698 * t;
  const m = 357.5291 + 35999.0503 * t;

  // Same formula as in nepdate C++ version
  const c = (1.9146 - 0.004817 * t - 0.000014 * t * t) * Math.sin(d2r * m)
    + (0.019993 - 0.000101 * t) * Math.sin(d2r * 2 * m)
    + 0.000289 * Math.sin(d2r * 3 * m);

  return (l0 + c) % 360;
}

// Get tithi (lunar day) information - matching nepdate C++ implementation
export function getPanchangaTithi(year: number, month: number, day: number) {
  // Convert to Julian date - same approach as nepdate
  const julianDate = gregorianToJulian(year, month + 1, day);
  const tdays = julianDate - 2451545.0;
  const t = tdays / 36525.0;

  // Calculate sun and moon longitudes - same formula as nepdate
  const moonLongitude = getMoonLongitude(t);
  const sunLongitude = getSunLongitude(t);

  // Apply Nepal timezone offset (5:45) - matching nepdate C++ implementation
  const nepalOffsetDegrees = 5.75 * 15 / 360;
  let moon = moonLongitude + nepalOffsetDegrees;
  if (moon >= 360) moon -= 360;
  
  let sun = sunLongitude + nepalOffsetDegrees;
  if (sun >= 360) sun -= 360;

  // Calculate the difference between moon and sun longitudes
  let diff = moon - sun;
  if (diff < 0) diff += 360;

  // Calculate tithi index (0-29) based on the angle - exact nepdate algorithm
  const tithiIndex = Math.floor(diff / 12) % 30;
  const paksha = tithiIndex < 15 ? "शुक्ल पक्ष" : "कृष्ण पक्ष";

  return {
    tithiNumber: tithiIndex + 1,
    tithiNameNp: tithiNames.np[tithiIndex],
    tithiNameEn: tithiNames.en[tithiIndex],
    paksha
  };
}

// Get tithi name for a given Gregorian date and language
export function getTithiNameFromGregorian(date: Date, language: 'np' | 'en' = 'np'): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // Keep 0-based for JavaScript Date
  const day = date.getDate();
  
  const tithiInfo = getPanchangaTithi(year, month, day);
  return language === 'np' ? tithiInfo.tithiNameNp : tithiInfo.tithiNameEn;
}

// Get tithi number for a given Gregorian date
export function getTithiNumberFromGregorian(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth(); // Keep 0-based for JavaScript Date
  const day = date.getDate();
  
  const tithiInfo = getPanchangaTithi(year, month, day);
  return tithiInfo.tithiNumber;
}
