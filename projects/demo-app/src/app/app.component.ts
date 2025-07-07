import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from '../../../ng-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthPickerComponent } from '../../../ng-mat-period-picker/src/lib/components/year-month-picker.component';
import { YearMonthFieldComponent } from '../../../ng-mat-period-picker/src/lib/components/year-month-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PeriodPickerComponent,
    YearMonthPickerComponent,
    YearMonthFieldComponent,
  ],
  template: `
    <h1>ng-mat-period-picker Demo</h1>
    <form [formGroup]="form">
      <h2>Year/Month Picker (Original)</h2>
      <lib-year-month-picker formControlName="yearMonth" />
      <pre>{{ form.value.yearMonth | json }}</pre>

      <h2>Year/Month Field (New Text Field)</h2>
      <lib-year-month-field formControlName="yearMonthField" />
      <pre>{{ form.value.yearMonthField | json }}</pre>

      <h2>Period Picker</h2>
      <lib-ng-mat-period-picker formControlName="period" />
      <pre>{{ form.value.period | json }}</pre>
    </form>
  `,
})
export class AppComponent {
  form = new FormGroup({
    yearMonth: new FormControl(null),
    yearMonthField: new FormControl(null),
    period: new FormControl(null),
  });
}
