export interface YearMonth {
  year: number;
  month: number | null;
}

export interface Period {
  start: YearMonth | null;
  end: YearMonth | null;
  isPresent: boolean;
}
