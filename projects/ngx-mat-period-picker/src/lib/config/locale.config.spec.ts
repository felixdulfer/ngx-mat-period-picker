import { provideLocaleConfig } from './locale.config';
import { provideNgxMatPeriodPicker } from './ngx-mat-period-picker.config';
import { LOCALE_CONFIG } from './locale.config';

describe('Locale Configuration Providers', () => {
  describe('provideLocaleConfig', () => {
    it('should provide LOCALE_CONFIG with the given configuration', () => {
      const config = {
        locale: 'de-DE',
        useConfiguredLocale: true,
      };

      const provider = provideLocaleConfig(config);

      expect(provider.provide).toBe(LOCALE_CONFIG);
      expect(provider.useValue).toEqual(config);
    });

        it('should handle partial configuration', () => {
      const partialConfig = {
        locale: 'fr-FR',
        useConfiguredLocale: true,
      };

      const provider = provideLocaleConfig(partialConfig);

      expect(provider.provide).toBe(LOCALE_CONFIG);
      expect(provider.useValue).toEqual(partialConfig);
    });
  });

  describe('provideNgxMatPeriodPicker', () => {
    it('should provide locale configuration with default values', () => {
      const providers = provideNgxMatPeriodPicker({});

      expect(providers.length).toBe(1);
      expect(providers[0].provide).toBe(LOCALE_CONFIG);
      expect(providers[0].useValue).toEqual({
        useConfiguredLocale: true,
      });
    });

    it('should use provided locale', () => {
      const providers = provideNgxMatPeriodPicker({
        locale: 'es-ES',
      });

      expect(providers[0].useValue).toEqual({
        locale: 'es-ES',
        useConfiguredLocale: true,
      });
    });

    it('should use provided useConfiguredLocale', () => {
      const providers = provideNgxMatPeriodPicker({
        useConfiguredLocale: false,
      });

      expect(providers[0].useValue).toEqual({
        useConfiguredLocale: false,
      });
    });

    it('should handle both locale and useConfiguredLocale', () => {
      const providers = provideNgxMatPeriodPicker({
        locale: 'it-IT',
        useConfiguredLocale: false,
      });

      expect(providers[0].useValue).toEqual({
        locale: 'it-IT',
        useConfiguredLocale: false,
      });
    });

    it('should handle useConfiguredLocale as false explicitly', () => {
      const providers = provideNgxMatPeriodPicker({
        locale: 'ja-JP',
        useConfiguredLocale: false,
      });

      expect(providers[0].useValue).toEqual({
        locale: 'ja-JP',
        useConfiguredLocale: false,
      });
    });
  });
});
