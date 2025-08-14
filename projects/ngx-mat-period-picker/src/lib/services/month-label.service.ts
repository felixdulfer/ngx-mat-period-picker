import { Injectable, inject } from '@angular/core';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class MonthLabelService {
  private localeService = inject(LocaleService);

  /**
   * Get short month names for the picker component
   * @returns Array of short month names (e.g., ['Jan', 'Feb', ...])
   */
  getShortMonthLabels(): string[] {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2000, i, 1);
      return date.toLocaleDateString(this.localeService.getEffectiveLocale(), { month: 'short' });
    });
  }

  /**
   * Get a specific short month label by month number (1-12)
   * @param monthNumber Month number (1-12)
   * @returns Short month name
   */
  getShortMonthLabel(monthNumber: number): string {
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error('Month number must be between 1 and 12');
    }
    const date = new Date(2000, monthNumber - 1, 1);
    return date.toLocaleDateString(this.localeService.getEffectiveLocale(), { month: 'short' });
  }
}
