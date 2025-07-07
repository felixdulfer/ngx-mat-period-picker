import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from '../../../ng-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthPickerComponent } from '../../../ng-mat-period-picker/src/lib/components/year-month-picker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PeriodPickerComponent,
    YearMonthPickerComponent,
  ],
  template: `
    <h1>ng-mat-period-picker Demo</h1>
    <form [formGroup]="form">
      <h2>Year/Month Picker</h2>
      <ngmp-year-month-picker
        formControlName="yearMonth"
      ></ngmp-year-month-picker>
      <pre>{{ form.value.yearMonth | json }}</pre>

      <h2>Period Picker</h2>
      <ngmp-period-picker formControlName="period"></ngmp-period-picker>
      <pre>{{ form.value.period | json }}</pre>
    </form>
  `,
})
export class AppComponent {
  form = new FormGroup({
    yearMonth: new FormControl(null),
    period: new FormControl(null),
  });
}
