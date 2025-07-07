import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from '../../../ng-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthFieldComponent } from '../../../ng-mat-period-picker/src/lib/components/year-month-field.component';

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
    <h1>ng-mat-period-picker Demo</h1>
    <form [formGroup]="form">
      <h2>Year/Month Picker (Original)</h2>
      <lib-year-month-field formControlName="yearMonth" />
      <pre>{{ form.value.yearMonth | json }}</pre>

      <h2>Year/Month Field (New Text Field)</h2>
      <lib-year-month-field formControlName="yearMonthField" />
      <pre>{{ form.value.yearMonthField | json }}</pre>

      <h2>Period Picker (Default Labels)</h2>
      <lib-ng-mat-period-picker formControlName="period" />
      <pre>{{ form.value.period | json }}</pre>

      <h2>Period Picker (Custom Labels)</h2>
      <lib-ng-mat-period-picker 
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
      <lib-ng-mat-period-picker 
        formControlName="educationPeriod"
        startLabel="Study Start Date"
        endLabel="Graduation Date"
        presentLabel="Currently Studying"
        startPlaceholder="Select start date"
        endPlaceholder="Select graduation date"
        presentPlaceholder="Still studying"
      />
      <pre>{{ form.value.educationPeriod | json }}</pre>
    </form>
  `,
})
export class AppComponent {
  form = new FormGroup({
    yearMonth: new FormControl(null),
    yearMonthField: new FormControl(null),
    period: new FormControl(null),
    customPeriod: new FormControl(null),
    educationPeriod: new FormControl(null),
  });
}
