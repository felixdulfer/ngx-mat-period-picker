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

      <h2>Period Picker (Employment Example)</h2>
      <ngx-mat-period-picker
        formControlName="customPeriod"
        startLabel="Employment Start"
        endLabel="Employment End"
        presentLabel="Currently Employed"
        startPlaceholder="When did you start?"
        endPlaceholder="When did you end?"
        presentPlaceholder="Still working here"
        [showPresentToggle]="true"
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
        [showPresentToggle]="false"
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

      <h2>Base Year Configuration Examples</h2>

      <h3>Period Picker with Base Year 2010</h3>
      <ngx-mat-period-picker
        formControlName="baseYear2010"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [baseYearStart]="2010"
        [baseYearEnd]="2010"
      />
      <pre>{{ form.value.baseYear2010 | json }}</pre>
      <p><small>When you click on empty fields above, the year picker will show an interval containing 2010.</small></p>

      <h3>Period Picker with Base Year 2035</h3>
      <ngx-mat-period-picker
        formControlName="baseYear2035"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [baseYearStart]="2035"
        [baseYearEnd]="2035"
      />
      <pre>{{ form.value.baseYear2035 | json }}</pre>
      <p><small>When you click on empty fields above, the year picker will show an interval containing 2035.</small></p>

      <h3>Period Picker with Different Base Years</h3>
      <ngx-mat-period-picker
        formControlName="differentBaseYears"
        startLabel="Birth Year"
        endLabel="Retirement Year"
        presentLabel="Still Working"
        [baseYearStart]="1990"
        [baseYearEnd]="2070"
      />
      <pre>{{ form.value.differentBaseYears | json }}</pre>
      <p><small>Start field shows 1984-1995 interval (for birth years), End field shows 2068-2079 interval (for retirement years).</small></p>

      <h3>Single Year/Month Field with Base Year 1995</h3>
      <lib-year-month-field
        formControlName="singleBaseYear1995"
        label="Historical Date"
        placeholder="Select historical year/month"
        [baseYear]="1995"
      />
      <pre>{{ form.value.singleBaseYear1995 | json }}</pre>
      <p><small>When you click above, the year picker will show an interval containing 1995.</small></p>
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
    baseYear2010: new FormControl(null),
    baseYear2035: new FormControl(null),
    differentBaseYears: new FormControl(null),
    singleBaseYear1995: new FormControl(null),
  });
}
