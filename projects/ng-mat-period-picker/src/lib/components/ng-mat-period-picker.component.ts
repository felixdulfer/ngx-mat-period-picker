import { Component } from '@angular/core';
import { PeriodPickerComponent } from './period-picker.component';

@Component({
  selector: 'lib-ng-mat-period-picker',
  standalone: true,
  imports: [PeriodPickerComponent],
  template: `<ngmp-period-picker />`,
})
export class NgMatPeriodPickerComponent {}
