import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // Configure Material Icons to use Material Symbols Outlined
    {
      provide: MAT_ICON_DEFAULT_OPTIONS,
      useValue: {
        fontSet: 'material-symbols-outlined'
      }
    },
    // The library will automatically use Angular's configured locale
    // You can override this by providing a specific locale:
    // provideNgxMatPeriodPicker({ locale: 'de-DE' })
  ],
};
