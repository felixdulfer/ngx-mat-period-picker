import { Component, forwardRef, input, signal, effect } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormGroup,
  FormControl,
  FormsModule,
} from '@angular/forms';
import { YearMonthFieldComponent } from './year-month-field.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Period } from '../types';

@Component({
  selector: 'ngx-mat-period-picker',
  standalone: true,
  template: `
    <div class="period-picker-container" [formGroup]="form">
      <div class="period-fields">
        <lib-year-month-field
          formControlName="start"
          [label]="startLabel()"
          [placeholder]="startPlaceholder()"
          [presentLabel]="presentLabel()"
          [presentValue]="false"
          [showPresentToggle]="false"
          [baseYear]="baseYear()"
        />

        <lib-year-month-field
          formControlName="end"
          [label]="endLabel()"
          [placeholder]="
            form.get('present')?.value ? presentPlaceholder() : endPlaceholder()
          "
          [disabled]="false"
          [presentLabel]="presentLabel()"
          [presentValue]="form.get('present')?.value"
          [showPresentToggle]="true"
          [baseYear]="baseYear()"
          (presentValueChange)="onPresentValueChange($event)"
        />
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
  baseYear = input<number | undefined>();

  form: FormGroup;
  private valueSignal = signal<Period | null>(null);

  constructor() {
    this.form = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
      present: new FormControl(false),
    });

    // Use effect for form value changes in zoneless environment
    effect(() => {
      const currentValue = this.valueSignal();
      if (currentValue !== null) {
        this.emitChange();
      }
    });

    this.form.valueChanges.subscribe(() => {
      this.valueSignal.set({
        start: this.form.get('start')?.value,
        end: this.form.get('present')?.value
          ? null
          : this.form.get('end')?.value,
        isPresent: this.form.get('present')?.value,
      });
    });

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
          end: value.isPresent ? null : value.end,
          present: value.isPresent,
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

  // eslint-disable-next-line no-unused-vars
  private onChange: (value: Period | null) => void = () => {};
  private onTouched: () => void = () => {};

  // eslint-disable-next-line no-unused-vars
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
      end: present ? null : end,
      isPresent: present,
    });
    this.onTouched();
  }

  onPresentValueChange(present: boolean) {
    this.form.get('present')?.setValue(present, { emitEvent: false });
    this.emitChange();
  }
}
