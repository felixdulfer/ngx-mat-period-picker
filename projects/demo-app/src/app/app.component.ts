import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from '../../../ngx-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthFieldComponent } from '../../../ngx-mat-period-picker/src/lib/components/year-month-field.component';
import { Period } from '../../../ngx-mat-period-picker/src/lib/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PeriodPickerComponent,
    YearMonthFieldComponent,
  ],
  template: `
    <h1>ngx-mat-period-picker Demo</h1>
    <form [formGroup]="form">
      <h2>Year/Month Picker (Original)</h2>
      <lib-year-month-field formControlName="yearMonth" />
      <pre>{{ form.value.yearMonth | json }}</pre>

      <h2>Year/Month Field (New Text Field)</h2>
      <lib-year-month-field formControlName="yearMonthField" />
      <pre>{{ form.value.yearMonthField | json }}</pre>

      <h2>Period Picker (Default Labels)</h2>
      <ngx-mat-period-picker formControlName="period" />
      <pre>{{ form.value.period | json }}</pre>

      <h2>Period Picker (Custom Labels)</h2>
      <ngx-mat-period-picker
        formControlName="customPeriod"
        startLabel="Employment Start"
        endLabel="Employment End"
        presentLabel="Currently Employed"
        startPlaceholder="When did you start?"
        endPlaceholder="When did you end?"
        presentPlaceholder="Still working here"
      />
      <pre>{{ form.value.customPeriod | json }}</pre>

      <h2>Period Picker (Education Example)</h2>
      <ngx-mat-period-picker
        formControlName="educationPeriod"
        startLabel="Study Start Date"
        endLabel="Graduation Date"
        presentLabel="Currently Studying"
        startPlaceholder="Select start date"
        endPlaceholder="Select graduation date"
        presentPlaceholder="Still studying"
      />
      <pre>{{ form.value.educationPeriod | json }}</pre>

      <h2>Pre-filled Examples</h2>

      <h3>Complete Period (Start + End)</h3>
      <ngx-mat-period-picker
        formControlName="completePeriod"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
      />
      <pre>{{ form.value.completePeriod | json }}</pre>

      <h3>Current Period (Start + Present)</h3>
      <ngx-mat-period-picker
        formControlName="currentPeriod"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
      />
      <pre>{{ form.value.currentPeriod | json }}</pre>

      <h3>Year Only Period (Start Year + End Year)</h3>
      <ngx-mat-period-picker
        formControlName="yearOnlyPeriod"
        startLabel="Start Year"
        endLabel="End Year"
        presentLabel="Present"
      />
      <pre>{{ form.value.yearOnlyPeriod | json }}</pre>

      <h3>Mixed Period (Start Year/Month + End Year Only)</h3>
      <ngx-mat-period-picker
        formControlName="mixedPeriod"
        startLabel="Start Date"
        endLabel="End Year"
        presentLabel="Present"
      />
      <pre>{{ form.value.mixedPeriod | json }}</pre>
    </form>
  `,
  styles: `
    :host {
      display: block;
      padding: 2rem;
    }
  `,
})
export class AppComponent {
  form = new FormGroup({
    yearMonth: new FormControl(null),
    yearMonthField: new FormControl(null),
    period: new FormControl(null),
    customPeriod: new FormControl(null),
    educationPeriod: new FormControl(null),
    completePeriod: new FormControl<Period>({
      start: { year: 2020, month: 3 },
      end: { year: 2023, month: 12 },
      isPresent: false,
    }),
    currentPeriod: new FormControl<Period>({
      start: { year: 2022, month: 6 },
      end: null,
      isPresent: true,
    }),
    yearOnlyPeriod: new FormControl<Period>({
      start: { year: 2018, month: null },
      end: { year: 2022, month: null },
      isPresent: false,
    }),
    mixedPeriod: new FormControl<Period>({
      start: { year: 2021, month: 9 },
      end: { year: 2024, month: null },
      isPresent: false,
    }),
  });
}
