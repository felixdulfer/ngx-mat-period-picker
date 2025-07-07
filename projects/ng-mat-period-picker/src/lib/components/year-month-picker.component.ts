import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { YearMonth } from '../types';
import { MonthLabelService } from '../services/month-label.service';

@Component({
  selector: 'lib-year-month-picker',
  standalone: true,
  template: `
    <mat-card class="ymp-card">
      <div class="ymp-header">
        <button matIconButton (click)="prevRange()" [disabled]="!canGoPrev()">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <span class="ymp-range">{{ rangeLabel }}</span>
        <button matIconButton (click)="nextRange()" [disabled]="!canGoNext()">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      <mat-divider />
      <div class="ymp-years">
        @for (year of years; track year) {
          <button
            [matButton]="value?.year === year ? 'filled' : 'text'"
            [disabled]="disabled()"
            (click)="selectYear(year)"
            class="ymp-button"
          >
            {{ year }}
            @if (value?.year === year) {
              <mat-icon class="ymp-x">close</mat-icon>
            }
          </button>
        }
      </div>
      <mat-divider />
      <div class="ymp-months">
        @for (month of months; let i = $index; track month) {
          <button
            [matButton]="value?.month === i + 1 ? 'filled' : 'text'"
            [disabled]="value?.year == null"
            (click)="selectMonth(i + 1)"
            class="ymp-button"
          >
            {{ month }}
            @if (value?.month === i + 1 && value?.year) {
              <mat-icon class="ymp-x">close</mat-icon>
            }
          </button>
        }
      </div>
    </mat-card>
  `,
  styles: [
    `
      .ymp-card {
        padding: 16px;
        max-width: 400px;
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
        font-size: 1.1em;
        letter-spacing: 1px;
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
        grid-template-columns: repeat(3, 1fr);
        margin-bottom: 0;
      }
      .mat-icon.ymp-x {
        font-size: 16px;
        vertical-align: middle;
        position: absolute;
        right: 0;
        top: 50%;
        opacity: 0.7;
        pointer-events: none;
        translate: 5px -50%;
      }
      .mdc-button.ymp-button {
        --mat-button-filled-horizontal-padding: 6px;
        --mat-button-text-horizontal-padding: 6px;
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
  ],
})
export class YearMonthPickerComponent implements ControlValueAccessor {
  minYear = input<number | undefined>();
  maxYear = input<number | undefined>();
  disabled = input<boolean>(false);

  yearsPerPage = 12;
  currentStartYear = 2000;

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
    this.onChange(this.value);
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
    this.onChange(this.value);
    this.onTouched();
  }
}
