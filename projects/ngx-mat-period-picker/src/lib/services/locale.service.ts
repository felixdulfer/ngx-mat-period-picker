import { Injectable, inject } from '@angular/core';
import { LocaleConfig } from '../types';
import { LOCALE_CONFIG } from '../config/locale.config';
import { LOCALE_ID } from '@angular/core';

/**
 * Service that provides locale configuration for the ngx-mat-period-picker library.
 * This service can be configured globally through dependency injection.
 */
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly defaultConfig: Required<LocaleConfig>;

  private config: Required<LocaleConfig>;

  constructor() {
    // Get the default locale from Angular's locale system
    const angularLocale = inject(LOCALE_ID, { optional: true });
    const localizeLocale = (globalThis as any).$localize?.locale;

    // Use Angular's LOCALE_ID, then $localize.locale, then fallback to 'en-US'
    const defaultLocale = angularLocale || localizeLocale || 'en-US';

    this.defaultConfig = {
      locale: defaultLocale,
      useConfiguredLocale: true,
    };

    // Try to get the configured locale from the injection token
    const injectedConfig = inject(LOCALE_CONFIG, { optional: true });

    if (injectedConfig) {
      // Merge injected config with defaults, but only override locale if explicitly provided
      this.config = {
        ...this.defaultConfig,
        ...injectedConfig,
        locale: injectedConfig.locale ?? this.defaultConfig.locale,
      };
    } else {
      this.config = this.defaultConfig;
    }
  }

  /**
   * Set the locale configuration
   * @param config The locale configuration to use
   */
  setLocaleConfig(config: Partial<LocaleConfig>): void {
    this.config = { ...this.defaultConfig, ...config };
  }

  /**
   * Get the current locale configuration
   * @returns The current locale configuration
   */
  getLocaleConfig(): LocaleConfig {
    return { ...this.config };
  }

  /**
   * Get the current locale string
   * @returns The current locale string
   */
  getLocale(): string {
    return this.config.locale;
  }

  /**
   * Check if the configured locale should be used
   * @returns True if the configured locale should be used, false to fall back to browser default
   */
  shouldUseConfiguredLocale(): boolean {
    return this.config.useConfiguredLocale;
  }

  /**
   * Get the effective locale for date formatting
   * @returns The locale to use for date formatting, or undefined for browser default
   */
  getEffectiveLocale(): string | undefined {
    return this.shouldUseConfiguredLocale() ? this.getLocale() : undefined;
  }
}
