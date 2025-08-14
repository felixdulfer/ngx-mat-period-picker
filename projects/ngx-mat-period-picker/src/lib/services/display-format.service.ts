import { Injectable, inject } from '@angular/core';
import { YearMonth } from '../types';
import { LocaleService } from './locale.service';

@Injectable({
  providedIn: 'root',
})
export class DisplayFormatService {
  private localeService = inject(LocaleService);

  /**
   * Format YearMonth value for display in text fields
   * @param value YearMonth value or null
   * @returns Formatted string for display
   */
  formatYearMonth(value: YearMonth | null): string {
    if (!value) return '';
    if (!value.year) return '';
    if (!value.month) return `${value.year}`;

    const date = new Date(value.year, value.month - 1, 1);
    return date.toLocaleDateString(this.localeService.getEffectiveLocale(), {
      year: 'numeric',
      month: 'long',
    });
  }

  /**
   * Format a specific year and month for display
   * @param year Year number
   * @param month Month number (1-12)
   */
  formatYearMonthDisplay(year: number, month: number): string {
    if (month < 1 || month > 12) {
      throw new Error('Month number must be between 1 and 12');
    }

    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString(this.localeService.getEffectiveLocale(), {
      year: 'numeric',
      month: 'long',
    });
  }

  /**
   * Format year only for display
   * @param year Year number
   * @returns Formatted year string
   */
  formatYearDisplay(year: number): string {
    return year.toString();
  }
}
