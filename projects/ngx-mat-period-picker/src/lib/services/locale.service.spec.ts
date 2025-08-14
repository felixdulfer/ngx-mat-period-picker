import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';
import { LOCALE_CONFIG } from '../config/locale.config';
import { LOCALE_ID } from '@angular/core';

describe('LocaleService', () => {
  let service: LocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocaleService],
    });
    service = TestBed.inject(LocaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('default configuration', () => {
    it('should use Angular LOCALE_ID when available', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          LocaleService,
          { provide: LOCALE_ID, useValue: 'de-DE' },
        ],
      });

      const configuredService = TestBed.inject(LocaleService);
      expect(configuredService.getLocale()).toBe('de-DE');
    });

    it('should fallback to en-US when no Angular locale is configured', () => {
      expect(service.getLocale()).toBe('en-US');
    });

    it('should use configured locale by default', () => {
      expect(service.shouldUseConfiguredLocale()).toBe(true);
    });

    it('should return effective locale as configured locale by default', () => {
      expect(service.getEffectiveLocale()).toBe(service.getLocale());
    });
  });

  describe('configuration injection', () => {
    it('should use injected configuration when provided', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          LocaleService,
          {
            provide: LOCALE_CONFIG,
            useValue: {
              locale: 'de-DE',
              useConfiguredLocale: true,
            },
          },
        ],
      });

      const configuredService = TestBed.inject(LocaleService);
      expect(configuredService.getLocale()).toBe('de-DE');
      expect(configuredService.getEffectiveLocale()).toBe('de-DE');
    });

    it('should merge partial configuration with defaults', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          LocaleService,
          {
            provide: LOCALE_CONFIG,
            useValue: {
              locale: 'fr-FR',
            },
          },
        ],
      });

      const configuredService = TestBed.inject(LocaleService);
      expect(configuredService.getLocale()).toBe('fr-FR');
      expect(configuredService.shouldUseConfiguredLocale()).toBe(true); // Default value
    });
  });

  describe('runtime configuration changes', () => {
    it('should allow changing locale configuration at runtime', () => {
      service.setLocaleConfig({
        locale: 'es-ES',
        useConfiguredLocale: false,
      });

      expect(service.getLocale()).toBe('es-ES');
      expect(service.shouldUseConfiguredLocale()).toBe(false);
      expect(service.getEffectiveLocale()).toBeUndefined();
    });

    it('should allow partial configuration updates', () => {
      service.setLocaleConfig({
        locale: 'it-IT',
      });

      expect(service.getLocale()).toBe('it-IT');
      expect(service.shouldUseConfiguredLocale()).toBe(true); // Default unchanged
    });

    it('should return effective locale as undefined when useConfiguredLocale is false', () => {
      service.setLocaleConfig({
        locale: 'ja-JP',
        useConfiguredLocale: false,
      });

      expect(service.getEffectiveLocale()).toBeUndefined();
    });
  });

  describe('getEffectiveLocale', () => {
    it('should return configured locale when useConfiguredLocale is true', () => {
      service.setLocaleConfig({
        locale: 'pt-BR',
        useConfiguredLocale: true,
      });

      expect(service.getEffectiveLocale()).toBe('pt-BR');
    });

    it('should return undefined when useConfiguredLocale is false', () => {
      service.setLocaleConfig({
        locale: 'ar-SA',
        useConfiguredLocale: false,
      });

      expect(service.getEffectiveLocale()).toBeUndefined();
    });
  });

  describe('configuration immutability', () => {
    it('should not allow external modification of configuration', () => {
      const config = service.getLocaleConfig();
      config.locale = 'invalid-locale';

      expect(service.getLocale()).toBe('en-US'); // Should remain unchanged
    });

    it('should return new configuration object on each call', () => {
      const config1 = service.getLocaleConfig();
      const config2 = service.getLocaleConfig();

      expect(config1).not.toBe(config2); // Different objects
      expect(config1).toEqual(config2); // Same values
    });
  });
});
