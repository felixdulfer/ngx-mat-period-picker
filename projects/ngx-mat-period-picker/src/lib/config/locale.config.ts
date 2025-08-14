import { InjectionToken } from '@angular/core';
import { LocaleConfig } from '../types';

/**
 * Injection token for configuring the locale globally.
 * Use this in your app.config.ts or module providers to set the locale.
 *
 * @example
 * ```typescript
 * import { provideLocaleConfig } from 'ngx-mat-period-picker';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideLocaleConfig({
 *       locale: 'de-DE',
 *       useConfiguredLocale: true
 *     })
 *   ]
 * });
 * ```
 */
export const LOCALE_CONFIG = new InjectionToken<LocaleConfig>('ngx-mat-period-picker.locale-config');

/**
 * Provider function to configure the locale globally.
 *
 * @param config The locale configuration
 * @returns Provider configuration for the locale
 *
 * @example
 * ```typescript
 * import { provideLocaleConfig } from 'ngx-mat-period-picker';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideLocaleConfig({
 *       locale: 'de-DE',
 *       useConfiguredLocale: true
 *     })
 *   ]
 * });
 * ```
 */
export function provideLocaleConfig(config: LocaleConfig) {
  return {
    provide: LOCALE_CONFIG,
    useValue: config,
  };
}
