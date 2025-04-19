
export interface Festival {
  np: string;
  en: string;
  type: 'festival' | 'thithi' | 'special';
}

export interface DayInfo {
  festivals: Festival[];
  thithi?: {
    np: string;
    en: string;
  };
}

export interface FestivalData {
  [key: string]: {
    [key: string]: {
      [key: string]: DayInfo;
    };
  };
}
