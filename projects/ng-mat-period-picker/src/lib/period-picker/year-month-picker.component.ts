import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

export interface YearMonth {
  year: number;
  month: number | null;
}

@Component({
  selector: 'ngmp-year-month-picker',
  standalone: true,
  template: `
    <mat-card class="ymp-card">
      <div class="ymp-header">
        <button mat-icon-button (click)="prevRange()" [disabled]="!canGoPrev()">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <span class="ymp-range">{{ rangeLabel }}</span>
        <button mat-icon-button (click)="nextRange()" [disabled]="!canGoNext()">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      <mat-divider></mat-divider>
      <div class="ymp-years">
        @for (year of years; track year) {
        <button
          *ngIf="value?.year === year"
          mat-tonal-button
          [disabled]="disabled"
          (click)="selectYear(year)"
          style="margin: 2px; min-width: 48px; min-height: 36px; font-weight: 500; position: relative;"
        >
          {{ year }}
          <mat-icon class="ymp-x">close</mat-icon>
        </button>
        <button
          *ngIf="value?.year !== year"
          mat-button
          [disabled]="disabled"
          (click)="selectYear(year)"
          style="margin: 2px; min-width: 48px; min-height: 36px; font-weight: 500; position: relative;"
        >
          {{ year }}
        </button>
        }
      </div>
      <mat-divider></mat-divider>
      <div class="ymp-months">
        @for (month of months; let i = $index; track month) {
        <button
          *ngIf="value?.month === i + 1 && value?.year"
          mat-tonal-button
          [disabled]="disabled"
          (click)="selectMonth(i + 1)"
          style="margin: 2px; min-width: 48px; min-height: 36px; font-weight: 500; position: relative;"
        >
          {{ month }}
          <mat-icon class="ymp-x">close</mat-icon>
        </button>
        <button
          *ngIf="value?.month !== i + 1 && value?.year"
          mat-button
          [disabled]="disabled"
          (click)="selectMonth(i + 1)"
          style="margin: 2px; min-width: 48px; min-height: 36px; font-weight: 500; position: relative;"
        >
          {{ month }}
        </button>
        <button
          *ngIf="!value?.year"
          mat-button
          disabled
          style="margin: 2px; min-width: 48px; min-height: 36px; font-weight: 500; position: relative;"
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
        max-width: 340px;
        margin: 0 auto;
        background: #fafafa;
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
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        margin: 8px 0;
      }
      .ymp-months {
        margin-bottom: 0;
      }
      .ymp-x {
        font-size: 16px;
        vertical-align: middle;
        position: absolute;
        right: 4px;
        top: 4px;
        opacity: 0.7;
        pointer-events: none;
      }
      button.selected {
        font-weight: bold;
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
  @Input() minYear?: number;
  @Input() maxYear?: number;
  @Input() disabled = false;

  yearsPerPage = 12;
  currentStartYear = 2000;
  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ];

  value: YearMonth | null = null;

  private onChange: (value: YearMonth | null) => void = () => {};
  private onTouched: () => void = () => {};

  get years(): number[] {
    return Array.from(
      { length: this.yearsPerPage },
      (_, i) => this.currentStartYear + i
    ).filter(
      (y) =>
        (this.minYear === undefined || y >= this.minYear) &&
        (this.maxYear === undefined || y <= this.maxYear)
    );
  }

  get rangeLabel(): string {
    const years = this.years;
    return years.length ? `${years[0]}–${years[years.length - 1]}` : '';
  }

  canGoPrev(): boolean {
    return this.minYear === undefined || this.currentStartYear > this.minYear;
  }

  canGoNext(): boolean {
    return (
      this.maxYear === undefined ||
      this.currentStartYear + this.yearsPerPage <= this.maxYear
    );
  }

  prevRange() {
    if (this.canGoPrev()) {
      this.currentStartYear -= this.yearsPerPage;
      if (this.minYear !== undefined && this.currentStartYear < this.minYear) {
        this.currentStartYear = this.minYear;
      }
    }
  }

  nextRange() {
    if (this.canGoNext()) {
      this.currentStartYear += this.yearsPerPage;
      if (
        this.maxYear !== undefined &&
        this.currentStartYear + this.yearsPerPage - 1 > this.maxYear
      ) {
        this.currentStartYear = this.maxYear - this.yearsPerPage + 1;
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
