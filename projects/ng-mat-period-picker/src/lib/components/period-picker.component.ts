import { Component, forwardRef, input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { YearMonthFieldComponent } from './year-month-field.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Period } from '../types';

@Component({
  selector: 'lib-ng-mat-period-picker',
  standalone: true,
  template: `
    <div class="period-picker-container">
      <div class="period-fields">
        <lib-year-month-field
          formControlName="start"
          [label]="startLabel()"
          [placeholder]="startPlaceholder()"
        />

        <lib-year-month-field
          formControlName="end"
          [label]="endLabel()"
          [placeholder]="
            form.get('present')?.value ? presentPlaceholder() : endPlaceholder()
          "
          [disabled]="form.get('present')?.value"
        />
      </div>

      <div class="present-toggle">
        <mat-slide-toggle formControlName="present">{{ presentLabel() }}</mat-slide-toggle>
      </div>
    </div>
  `,
  styles: [
    `
      .period-picker-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .period-fields {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .present-toggle {
        margin-top: 0.5rem;
      }
    `,
  ],
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
    MatSlideToggleModule,
    YearMonthFieldComponent,
  ],
})
export class PeriodPickerComponent implements ControlValueAccessor {
  // Configurable labels
  startLabel = input<string>('Start Period');
  endLabel = input<string>('End Period');
  presentLabel = input<string>('Present');
  startPlaceholder = input<string>('Select start period');
  endPlaceholder = input<string>('Select end period');
  presentPlaceholder = input<string>('Present');

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
      present: new FormControl(false),
    });

    this.form.valueChanges.subscribe(() => this.emitChange());

    // Subscribe to present changes and enable/disable end control
    this.form.get('present')!.valueChanges.subscribe((present: boolean) => {
      const endControl = this.form.get('end');
      if (present) {
        endControl?.disable({ emitEvent: false });
        endControl?.setValue(null, { emitEvent: false });
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
        { emitEvent: false },
      );
    } else {
      this.form.reset(
        { start: null, end: null, present: false },
        { emitEvent: false },
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
