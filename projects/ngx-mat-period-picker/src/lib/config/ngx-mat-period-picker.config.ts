import { provideLocaleConfig } from './locale.config';
import { LocaleConfig } from '../types';

/**
 * Main configuration provider for ngx-mat-period-picker.
 * This provides a convenient way to configure all aspects of the library.
 *
 * @param config Configuration object for the library
 * @returns Array of providers for the library configuration
 *
 * @example
 * ```typescript
 * import { provideNgxMatPeriodPicker } from 'ngx-mat-period-picker';
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideNgxMatPeriodPicker({
 *       locale: 'de-DE',
 *       useConfiguredLocale: true
 *     })
 *   ]
 * });
 * ```
 */
export function provideNgxMatPeriodPicker(config: {
  locale?: string;
  useConfiguredLocale?: boolean;
} = {}) {
  const localeConfig: Partial<LocaleConfig> = {
    useConfiguredLocale: config.useConfiguredLocale !== false,
  };

  // Only set locale if explicitly provided, otherwise let the service use Angular's default
  if (config.locale) {
    localeConfig.locale = config.locale;
  }

  return [
    provideLocaleConfig(localeConfig as LocaleConfig),
  ];
}
