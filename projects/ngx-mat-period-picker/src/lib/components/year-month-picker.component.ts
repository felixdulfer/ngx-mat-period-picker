import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { YearMonth } from '../types';
import { MonthLabelService } from '../services/month-label.service';

@Component({
  selector: 'ngx-mat-year-month-picker-dialog',
  standalone: true,
  template: `
    <mat-card class="ymp-card">
      @if (showPresentToggle()) {
        <div class="ymp-present-toggle">
          <mat-slide-toggle
            [checked]="presentValue()"
            (change)="togglePresent($event.checked)"
            [disabled]="disabled()"
          >
            {{ presentLabel() }}
          </mat-slide-toggle>
        </div>
      }
      <div class="ymp-header">
        <button
          matIconButton
          (click)="prevRange()"
          [disabled]="!canGoPrev() || presentValue()"
        >
          <mat-icon>chevron_left</mat-icon>
        </button>
        <span class="ymp-range" [class.ymp-range-disabled]="presentValue()">{{
          rangeLabel
        }}</span>
        <button
          matIconButton
          (click)="nextRange()"
          [disabled]="!canGoNext() || presentValue()"
        >
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      <mat-divider />
      <div class="ymp-years">
        @for (year of years; track year) {
          <button
            [matButton]="
              presentValue()
                ? 'text'
                : valueSignal()?.year === year
                  ? 'outlined'
                  : 'text'
            "
            [disabled]="disabled() || presentValue()"
            (click)="selectYear(year)"
            class="ymp-button"
          >
            {{ year }}
          </button>
        }
      </div>
      <mat-divider />
      <div class="ymp-months">
        @for (month of months; let i = $index; track month) {
          <button
            [matButton]="
              presentValue()
                ? 'text'
                : valueSignal()?.month === i + 1
                  ? 'outlined'
                  : 'text'
            "
            [disabled]="valueSignal()?.year == null || presentValue()"
            (click)="selectMonth(i + 1)"
            class="ymp-button"
          >
            {{ month }}
          </button>
        }
      </div>
      <mat-divider />
      <div class="ymp-actions">
        @if (hasValue()) {
          <button matButton="text" (click)="clear()" [disabled]="disabled()">
            Clear
          </button>
        } @else {
          <div></div>
        }
        <button
          matButton="filled"
          (click)="ok()"
          [disabled]="disabled() || !hasValidSelection()"
        >
          OK
        </button>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .ymp-card {
        padding: 16px;
        max-width: 320px;
        margin: 0 auto;
        background: var(
          --mat-year-month-picker-card-background-color,
          var(--mat-sys-surface-container-high)
        );
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        animation: slideInOut 200ms cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
      }

      @keyframes slideInOut {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      .ymp-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      .ymp-range {
        font-weight: 600;
        font-size: var(--mat-sys-title-small-size);
        letter-spacing: 1px;
      }

      .ymp-range-disabled {
        opacity: 0.5;
      }
      .ymp-years,
      .ymp-months {
        display: grid;
        gap: 4px;
        margin: 8px 0;
      }
      .ymp-years {
        grid-template-columns: repeat(4, 1fr);
      }
      .ymp-months {
        grid-template-columns: repeat(4, 1fr);
      }

      .mdc-button.ymp-button {
        --mat-button-outlined-horizontal-padding: 6px;
        --mat-button-filled-horizontal-padding: 6px;
        --mat-button-text-horizontal-padding: 6px;
      }

      .ymp-present-toggle {
        padding: 8px 0 16px 0;
        display: flex;
        justify-content: center;
      }

      .ymp-present-toggle .mat-slide-toggle {
        transform: scale(0.8);
        margin: 0;
      }

      .ymp-actions {
        display: flex;
        justify-content: space-between;
        padding: 8px 0 0 0;
        gap: 8px;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearMonthPickerComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
})
export class YearMonthPickerComponent implements ControlValueAccessor {
  minYear = input<number | undefined>();
  maxYear = input<number | undefined>();
  disabled = input<boolean>(false);
  baseYear = input<number | undefined>();
  private _showPresentToggle = signal<boolean>(false);
  showPresentToggle = this._showPresentToggle.asReadonly();

  // Present label as a signal for dynamic configuration
  private _presentLabel = signal<string>('Present');
  presentLabel = this._presentLabel.asReadonly();

  yearsPerPage = 12;
  currentStartYear = 2000;
  private _baseYear: number | undefined = undefined;
  private _presentValue = signal<boolean>(false);
  presentValue = this._presentValue.asReadonly();

  // Event outputs
  cancelClicked = output<void>();
  okClicked = output<void>();
  presentValueChange = output<boolean>();

  valueSignal = signal<YearMonth | null>(null);
  originalValue: YearMonth | null = null;

  private monthLabelService = inject(MonthLabelService);
  constructor() {
    // Initialize currentStartYear based on baseYear or current year
    this.initializeCurrentStartYear();
  }

  /**
   * Initializes currentStartYear based on baseYear input or current year
   */
  private initializeCurrentStartYear(): void {
    const targetYear = this._baseYear || this.baseYear() || new Date().getFullYear();
    this.setCurrentStartYearForYear(targetYear);
  }

  get months(): string[] {
    return this.monthLabelService.getShortMonthLabels();
  }

  get years(): number[] {
    const years: number[] = [];
    for (let i = 0; i < this.yearsPerPage; i++) {
      years.push(this.currentStartYear + i);
    }
    return years;
  }

  get rangeLabel(): string {
    return `${this.currentStartYear} - ${this.currentStartYear + this.yearsPerPage - 1}`;
  }

  canGoPrev(): boolean {
    return this.currentStartYear > (this.minYear() || 1900);
  }

  canGoNext(): boolean {
    const maxYear = this.maxYear() || 2100;
    return this.currentStartYear + this.yearsPerPage <= maxYear;
  }

  prevRange() {
    if (this.canGoPrev()) {
      this.currentStartYear -= this.yearsPerPage;
    }
  }

  nextRange() {
    if (this.canGoNext()) {
      this.currentStartYear += this.yearsPerPage;
    }
  }

  writeValue(_value: YearMonth | null): void {
    this.valueSignal.set(_value);
    this.originalValue = _value;

    // If a year is selected/pre-filled, set the currentStartYear to show the interval containing that year
    if (_value?.year) {
      this.setCurrentStartYearForYear(_value.year);
    } else {
      // If no value is provided, initialize based on baseYear or current year
      this.initializeCurrentStartYear();
    }
  }

  /**
   * Sets the currentStartYear to show the interval containing the specified year
   */
  private setCurrentStartYearForYear(year: number): void {
    // Calculate which interval this year belongs to
    // We want to find the start year of the interval that contains the target year
    // For example: year 2030 should be in interval 2028-2039, so currentStartYear should be 2028
    const minYear = this.minYear() || 1900;

    // Find the interval that contains the target year
    // We want the year to be within the interval [startYear, startYear + yearsPerPage - 1]
    // Let's find the correct interval by checking which interval contains the year
    let newStartYear = minYear;

    // Find the interval that contains the target year
    while (newStartYear + this.yearsPerPage <= year) {
      newStartYear += this.yearsPerPage;
    }

    // Ensure the new start year is within valid bounds
    const maxYear = this.maxYear() || 2100;
    if (newStartYear + this.yearsPerPage <= maxYear) {
      this.currentStartYear = newStartYear;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  private onChange: (_value: YearMonth | null) => void = () => {};
  private onTouched: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  registerOnChange(fn: (_value: YearMonth | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectYear(year: number) {
    if (this.presentValue()) return;

    const currentValue = this.valueSignal();

    // If clicking the same year, deselect it
    if (currentValue?.year === year) {
      this.valueSignal.set(null);
    } else {
      this.valueSignal.set({ year, month: null });
      // Set the current interval to show the selected year
      this.setCurrentStartYearForYear(year);
    }

    this.onChange(this.valueSignal());
    this.onTouched();
  }

  selectMonth(month: number) {
    if (this.presentValue()) return;

    const currentValue = this.valueSignal();
    if (currentValue?.year) {
      // If clicking the same month, deselect it
      if (currentValue.month === month) {
        this.valueSignal.set({ year: currentValue.year, month: null });
      } else {
        this.valueSignal.set({ ...currentValue, month });
      }

      this.onChange(this.valueSignal());
      this.onTouched();
    }
  }

  getCurrentValue(): YearMonth | null {
    return this.valueSignal();
  }

  togglePresent(checked: boolean): void {
    this._presentValue.set(checked);
    this.presentValueChange.emit(checked);

    if (checked) {
      // Clear the value when present is selected
      this.valueSignal.set(null);
      this.onChange(null);
      this.onTouched();
    }
  }

  setPresentValue(value: boolean): void {
    this._presentValue.set(value);
  }

  setShowPresentToggle(show: boolean): void {
    this._showPresentToggle.set(show);
  }

  setBaseYear(year: number | undefined): void {
    // Update the baseYear and reinitialize if needed
    this._baseYear = year;
    this.initializeCurrentStartYear();
  }

  setPresentLabel(label: string): void {
    this._presentLabel.set(label);
  }

  hasValidSelection(): boolean {
    const value = this.valueSignal();
    return !!(value && value.year) || this.presentValue();
  }

  hasValue(): boolean {
    const value = this.valueSignal();
    return !!(value && value.year) || this.presentValue();
  }

  hasChanges(): boolean {
    const currentValue = this.valueSignal();
    const original = this.originalValue;

    if (!currentValue && !original) return false;
    if (!currentValue || !original) return true;

    return (
      currentValue.year !== original.year ||
      currentValue.month !== original.month
    );
  }

  clear(): void {
    this.valueSignal.set(null);
    this._presentValue.set(false);
    this.presentValueChange.emit(false);
    this.onChange(null);
    this.onTouched();
    this.cancelClicked.emit();
  }

  ok(): void {
    const currentValue = this.valueSignal();
    if ((currentValue && currentValue.year) || this.presentValue()) {
      this.okClicked.emit();
    }
  }
}
