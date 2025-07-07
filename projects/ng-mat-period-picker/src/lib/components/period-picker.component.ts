import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { YearMonthPickerComponent } from './year-month-picker.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Period, YearMonth } from '../types';

@Component({
  selector: 'ngmp-period-picker',
  standalone: true,
  template: `
    <mat-card>
      <form
        [formGroup]="form"
        style="display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap;"
      >
        <div>
          <label>Start</label>
          <ngmp-year-month-picker formControlName="start" />
        </div>
        <div>
          <label>End</label>
          <ng-container *ngIf="!form.get('present')?.value; else presentLabel">
            <ngmp-year-month-picker formControlName="end" />
          </ng-container>
          <ng-template #presentLabel>
            <div style="margin-top: 2.5rem; font-weight: bold;">Present</div>
          </ng-template>
        </div>
        <div style="flex-basis: 100%; margin-top: 1rem;">
          <mat-slide-toggle formControlName="present">Present</mat-slide-toggle>
        </div>
      </form>
    </mat-card>
  `,
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodPickerComponent),
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSlideToggleModule,
    YearMonthPickerComponent,
  ],
})
export class PeriodPickerComponent implements ControlValueAccessor {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      start: [null],
      end: [null],
      present: [false],
    });

    this.form.valueChanges.subscribe(() => this.emitChange());

    // Subscribe to present changes and enable/disable end control
    this.form.get('present')!.valueChanges.subscribe((present: boolean) => {
      const endControl = this.form.get('end');
      if (present) {
        endControl?.disable({ emitEvent: false });
      } else {
        endControl?.enable({ emitEvent: false });
      }
    });
  }

  writeValue(value: Period | null): void {
    if (value) {
      this.form.patchValue(
        {
          start: value.start,
          end: value.end === 'present' ? null : value.end,
          present: value.end === 'present',
        },
        { emitEvent: false }
      );
    } else {
      this.form.reset(
        { start: null, end: null, present: false },
        { emitEvent: false }
      );
    }
  }

  private onChange: (value: Period | null) => void = () => {};
  private onTouched: () => void = () => {};

  registerOnChange(fn: (value: Period | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable({ emitEvent: false });
    } else {
      this.form.enable({ emitEvent: false });
    }
  }

  emitChange() {
    const { start, end, present } = this.form.value;
    this.onChange({
      start,
      end: present ? 'present' : end,
    });
    this.onTouched();
  }
}
