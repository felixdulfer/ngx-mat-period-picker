export interface YearMonth {
  year: number;
  month: number | null;
}

export interface Period {
  start: YearMonth | null;
  end: YearMonth | null;
  isPresent: boolean;
}

export interface LocaleConfig {
  /**
   * The locale string (e.g., 'en-US', 'de-DE', 'es-ES', 'fr-FR')
   * If not provided, will use Angular's LOCALE_ID or $localize.locale
   */
  locale?: string;

  /**
   * Whether to use the configured locale or fall back to browser default
   * @default true
   */
  useConfiguredLocale: boolean;
}
