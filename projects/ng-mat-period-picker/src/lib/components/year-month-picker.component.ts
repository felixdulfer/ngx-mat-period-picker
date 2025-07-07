import { Component, forwardRef, input, signal } from '@angular/core';
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
  selector: 'lib-year-month-picker',
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
              presentValue() ? 'text' : value?.year === year ? 'filled' : 'text'
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
                : value?.month === i + 1
                  ? 'filled'
                  : 'text'
            "
            [disabled]="value?.year == null || presentValue()"
            (click)="selectMonth(i + 1)"
            class="ymp-button"
          >
            {{ month }}
          </button>
        }
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
        margin-bottom: 0;
      }

      .mdc-button.ymp-button {
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
  private _showPresentToggle = signal<boolean>(false);
  showPresentToggle = this._showPresentToggle.asReadonly();
  private _presentLabel = signal<string>('Present');
  presentLabel = this._presentLabel.asReadonly();

  yearsPerPage = 12;
  currentStartYear = 2000;
  private _presentValue = signal<boolean>(false);
  presentValue = this._presentValue.asReadonly();

  constructor(private monthLabelService: MonthLabelService) {}

  get months(): string[] {
    return this.monthLabelService.getShortMonthLabels();
  }

  value: YearMonth | null = null;

  private onChange: (value: YearMonth | null) => void = () => {};
  private onTouched: () => void = () => {};

  get years(): number[] {
    return Array.from(
      { length: this.yearsPerPage },
      (_, i) => this.currentStartYear + i,
    ).filter(
      (y) =>
        (this.minYear() === undefined || y >= this.minYear()!) &&
        (this.maxYear() === undefined || y <= this.maxYear()!),
    );
  }

  get rangeLabel(): string {
    const years = this.years;
    return years.length ? `${years[0]}–${years[years.length - 1]}` : '';
  }

  canGoPrev(): boolean {
    return (
      this.minYear() === undefined || this.currentStartYear > this.minYear()!
    );
  }

  canGoNext(): boolean {
    return (
      this.maxYear() === undefined ||
      this.currentStartYear + this.yearsPerPage <= this.maxYear()!
    );
  }

  prevRange() {
    if (this.canGoPrev()) {
      this.currentStartYear -= this.yearsPerPage;
      if (
        this.minYear() !== undefined &&
        this.currentStartYear < this.minYear()!
      ) {
        this.currentStartYear = this.minYear()!;
      }
    }
  }

  nextRange() {
    if (this.canGoNext()) {
      this.currentStartYear += this.yearsPerPage;
      if (
        this.maxYear() !== undefined &&
        this.currentStartYear + this.yearsPerPage - 1 > this.maxYear()!
      ) {
        this.currentStartYear = this.maxYear()! - this.yearsPerPage + 1;
      }
    }
  }

  writeValue(value: YearMonth | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: YearMonth | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectYear(year: number) {
    if (this.value?.year === year) {
      // Deselect year (and month)
      this.value = null;
    } else {
      this.value = { year, month: null };
    }
    // Don't call onChange here - let the parent decide when to close
    this.onTouched();
  }

  selectMonth(month: number) {
    if (!this.value?.year) return;
    if (this.value?.month === month) {
      // Deselect month
      this.value = { year: this.value.year, month: null };
    } else {
      this.value = { year: this.value.year, month };
    }
    // Don't call onChange here - let the parent decide when to close
    this.onTouched();
  }

  /**
   * Get the current value without triggering onChange
   */
  getCurrentValue(): YearMonth | null {
    return this.value;
  }

  /**
   * Toggle the present value
   */
  togglePresent(checked: boolean): void {
    this._presentValue.set(checked);
    this.onTouched();
  }

  /**
   * Set the present value
   */
  setPresentValue(value: boolean): void {
    this._presentValue.set(value);
  }

  /**
   * Set the present label
   */
  setPresentLabel(label: string): void {
    this._presentLabel.set(label);
  }

  /**
   * Set the show present toggle flag
   */
  setShowPresentToggle(show: boolean): void {
    this._showPresentToggle.set(show);
  }
}
