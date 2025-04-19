
export interface BsMonth {
  np: string;
  en: string;
}

export interface BsDay {
  np: string;
  en: string;
}

export const bsMonths: BsMonth[] = [
  { np: "बैशाख", en: "Baisakh" },
  { np: "जेठ", en: "Jestha" },
  { np: "असार", en: "Ashar" },
  { np: "श्रावण", en: "Shrawan" },
  { np: "भदौ", en: "Bhadra" },
  { np: "आश्विन", en: "Ashwin" },
  { np: "कार्तिक", en: "Kartik" },
  { np: "मंसिर", en: "Mangsir" },
  { np: "पुष", en: "Poush" },
  { np: "माघ", en: "Magh" },
  { np: "फाल्गुन", en: "Falgun" },
  { np: "चैत्र", en: "Chaitra" }
];

export const bsDays: BsDay[] = [
  { np: "आइत", en: "Sun" },
  { np: "सोम", en: "Mon" },
  { np: "मंगल", en: "Tue" },
  { np: "बुध", en: "Wed" },
  { np: "बिही", en: "Thu" },
  { np: "शुक्र", en: "Fri" },
  { np: "शनि", en: "Sat" }
];
