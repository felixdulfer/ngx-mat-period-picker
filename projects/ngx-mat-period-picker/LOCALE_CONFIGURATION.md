# Locale Configuration

The ngx-mat-period-picker library automatically uses Angular's configured locale (`LOCALE_ID` or `$localize.locale`) by default. You can also override this with custom locale configuration if needed.

## Basic Usage

### Automatic Locale Detection (Recommended)

The library automatically detects and uses Angular's configured locale:

```typescript
// In your app.config.ts or main.ts
import { LOCALE_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: LOCALE_ID, useValue: 'de-DE' }  // German locale
  ]
});
```

### Using the Main Configuration Provider (Override)

You can override the automatic detection with custom locale configuration:

```typescript
import { provideNgxMatPeriodPicker } from 'ngx-mat-period-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxMatPeriodPicker({
      locale: 'de-DE',
      useConfiguredLocale: true
    })
  ]
});
```

### Using Individual Providers

```typescript
import { provideLocaleConfig } from 'ngx-mat-period-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideLocaleConfig({
      locale: 'de-DE',
      useConfiguredLocale: true
    })
  ]
});
```

## Automatic Locale Detection

The library automatically detects the locale in the following order:

1. **Angular's LOCALE_ID** - The locale configured in your Angular application
2. **$localize.locale** - The locale from Angular's i18n system
3. **Fallback** - 'en-US' if no locale is detected

This means you don't need to configure anything if you're already using Angular's locale system!

## Configuration Options

### LocaleConfig Interface

```typescript
interface LocaleConfig {
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
```

## Supported Locales

The library supports all locales that the browser's `Intl` API supports. Common examples include:

- `en-US` - English (United States)
- `de-DE` - German (Germany)
- `es-ES` - Spanish (Spain)
- `fr-FR` - French (France)
- `it-IT` - Italian (Italy)
- `pt-BR` - Portuguese (Brazil)
- `ja-JP` - Japanese (Japan)
- `zh-CN` - Chinese (Simplified)
- `ar-SA` - Arabic (Saudi Arabia)

## Examples

### German Locale

```typescript
import { provideNgxMatPeriodPicker } from 'ngx-mat-period-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxMatPeriodPicker({
      locale: 'de-DE'
    })
  ]
});
```

This will display month names in German (Jan, Feb, Mär, Apr, Mai, Jun, Jul, Aug, Sep, Okt, Nov, Dez).

### Spanish Locale

```typescript
import { provideNgxMatPeriodPicker } from 'ngx-mat-period-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxMatPeriodPicker({
      locale: 'es-ES'
    })
  ]
});
```

This will display month names in Spanish (ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic).

### Fallback to Browser Default

```typescript
import { provideNgxMatPeriodPicker } from 'ngx-mat-period-picker';

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxMatPeriodPicker({
      locale: 'en-US',
      useConfiguredLocale: false
    })
  ]
});
```

This will use the browser's default locale instead of the configured one.

## What Gets Localized

When you configure a locale, the following elements will be displayed in the selected language:

1. **Month names** in the year/month picker dialogs
2. **Date formatting** in the display fields
3. **Month labels** throughout the components

## Runtime Configuration Changes

You can also change the locale at runtime by injecting the `LocaleService`:

```typescript
import { LocaleService } from 'ngx-mat-period-picker';

@Component({...})
export class MyComponent {
  constructor(private localeService: LocaleService) {}
  
  changeToGerman() {
    this.localeService.setLocaleConfig({
      locale: 'de-DE',
      useConfiguredLocale: true
    });
  }
  
  changeToSpanish() {
    this.localeService.setLocaleConfig({
      locale: 'es-ES',
      useConfiguredLocale: true
    });
  }
}
```

## Migration from Previous Versions

If you're upgrading from a previous version of the library:

1. **No breaking changes** - existing code will continue to work
2. **Improved default behavior** - the library now automatically uses Angular's configured locale instead of browser default
3. **Optional configuration** - you only need to add locale configuration if you want to override the automatic detection
4. **Better integration** - the library now seamlessly integrates with Angular's built-in locale system

## Troubleshooting

### Locale Not Working

1. **Check the locale string** - ensure it's a valid locale identifier
2. **Verify browser support** - some older browsers may not support all locales
3. **Check configuration** - ensure `useConfiguredLocale` is set to `true`

### Fallback to Browser Default

If you want to use the browser's default locale instead of a configured one:

```typescript
provideNgxMatPeriodPicker({
  locale: 'en-US',
  useConfiguredLocale: false
})
```

This will ignore the configured locale and use whatever the browser provides. 
