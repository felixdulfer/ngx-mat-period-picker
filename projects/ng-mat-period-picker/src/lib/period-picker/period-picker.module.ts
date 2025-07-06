import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from './period-picker.component';

@NgModule({
  imports: [CommonModule, PeriodPickerComponent],
  exports: [PeriodPickerComponent],
})
export class PeriodPickerModule {}
