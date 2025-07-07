import {
  Component,
  forwardRef,
  ViewChild,
  ElementRef,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { YearMonthPickerComponent } from './year-month-picker.component';
import { YearMonth } from '../types';

@Component({
  selector: 'lib-year-month-field',
  standalone: true,
  template: `
    <mat-form-field appearance="outline" class="year-month-field" #fieldRef>
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [value]="getDisplayValue(value)"
        [placeholder]="placeholder()"
        readonly
        (click)="openPicker($event)"
      />
      <mat-icon matSuffix>calendar_today</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      .year-month-field {
        min-width: 200px;
      }
    `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearMonthFieldComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
})
export class YearMonthFieldComponent implements ControlValueAccessor {
  @ViewChild('fieldRef', { static: true }) fieldRef!: ElementRef;

  label = input<string>('Select Year/Month');
  placeholder = input<string>('Click to select');
  minYear = input<number | undefined>();
  maxYear = input<number | undefined>();
  disabled = input<boolean>(false);

  value: YearMonth | null = null;
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  getDisplayValue(value: YearMonth | null): string {
    if (!value) return '';
    if (!value.month) return `${value.year}`;

    const date = new Date(value.year, value.month - 1, 1);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
    });
  }

  openPicker(event: MouseEvent): void {
    if (this.disabled()) return;

    this.closePicker();

    // Get the element that was clicked (the input field)
    const targetElement = event.currentTarget as HTMLElement;

    // Create overlay positioned relative to the text field
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(targetElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -8,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Create picker component
    const pickerPortal = new ComponentPortal(YearMonthPickerComponent);
    const pickerRef = this.overlayRef.attach(pickerPortal);

    // Set the current value
    pickerRef.instance.writeValue(this.value);

    // Subscribe to value changes
    pickerRef.instance.registerOnChange((value: YearMonth | null) => {
      this.value = value;
      this.onChange(value);
      this.onTouched();
      this.closePicker();
    });

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.closePicker();
    });
  }

  private closePicker(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  writeValue(value: YearMonth | null): void {
    this.value = value;
  }

  private onChange: (value: YearMonth | null) => void = () => {};
  private onTouched: () => void = () => {};

  registerOnChange(fn: (value: YearMonth | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Note: This is called by Angular forms, but we use the input signal
    // The actual disabled state is handled by the input signal
  }
}
