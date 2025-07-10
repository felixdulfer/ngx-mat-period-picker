import { Injectable } from '@angular/core';
import { YearMonth } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DisplayFormatService {
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
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
    });
  }

  /**
   * Format a specific year and month for display
   * @param year Year number
   * @param month Month number (1-12)
   * @returns Formatted string for display
   */
  formatYearMonthDisplay(year: number, month: number): string {
    if (month < 1 || month > 12) {
      throw new Error('Month number must be between 1 and 12');
    }

    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString(undefined, {
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
