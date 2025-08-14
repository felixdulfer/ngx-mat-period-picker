import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // The library will automatically use Angular's configured locale
    // You can override this by providing a specific locale:
    // provideNgxMatPeriodPicker({ locale: 'de-DE' })
  ],
};
