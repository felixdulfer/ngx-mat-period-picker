import {
  Component,
  forwardRef,
  ViewChild,
  ElementRef,
  input,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { YearMonthPickerComponent } from './year-month-picker.component';
import { YearMonth } from '../types';
import { DisplayFormatService } from '../services/display-format.service';

@Component({
  selector: 'lib-year-month-field',
  standalone: true,
  template: `
    <mat-form-field
      appearance="outline"
      class="year-month-field"
      #fieldRef
      (click)="openPicker($event)"
    >
      <mat-label>{{ label() }}</mat-label>
      <input
        matInput
        [value]="getDisplayValue(value)"
        [placeholder]="placeholder()"
        readonly
      />
      <mat-icon matSuffix class="calendar-icon" aria-hidden="true"
        >calendar_today</mat-icon
      >
    </mat-form-field>
  `,
  styles: [
    `
      .year-month-field {
        min-width: 200px;
      }

      .calendar-icon {
        pointer-events: none;
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
  presentLabel = input<string>('Present');
  presentValue = input<boolean>(false);
  showPresentToggle = input<boolean>(false);
  presentValueChange = output<boolean>();

  value: YearMonth | null = null;
  private overlayRef: OverlayRef | null = null;

  constructor(
    private overlay: Overlay,
    private displayFormatService: DisplayFormatService,
  ) {}

  getDisplayValue(value: YearMonth | null): string {
    // If present is true, show "Present" instead of the value
    if (this.presentValue()) {
      return this.presentLabel();
    }
    return this.displayFormatService.formatYearMonth(value);
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

    // Set the current value and present state
    pickerRef.instance.writeValue(this.value);
    pickerRef.instance.setPresentLabel(this.presentLabel());
    pickerRef.instance.setPresentValue(this.presentValue());
    pickerRef.instance.setShowPresentToggle(this.showPresentToggle());

    // Subscribe to onChange to handle value updates and auto-close when complete selection is made
    pickerRef.instance.registerOnChange((value: YearMonth | null) => {
      // Always update the internal value and emit to parent
      this.value = value;
      this.onChange(value);
      this.onTouched();

      // Auto-close when both year and month are selected
      if (value && value.year && value.month) {
        this.closePicker();
      }
    });

    // Subscribe to present value changes
    pickerRef.instance.presentValueChange.subscribe((checked: boolean) => {
      this.presentValueChange.emit(checked);
      this.onTouched();

      // ONLY close when present is set to true
      if (checked) {
        this.closePicker();
      }
    });

    // Subscribe to cancel button
    pickerRef.instance.cancelClicked.subscribe(() => {
      this.closePicker();
    });

    // Subscribe to ok button
    pickerRef.instance.okClicked.subscribe(() => {
      const currentValue = pickerRef.instance.getCurrentValue();
      if (currentValue && currentValue.year) {
        this.value = currentValue;
        this.onChange(currentValue);
        this.onTouched();
      }
      this.closePicker();
    });

    // Close on backdrop click
    this.overlayRef.backdropClick().subscribe(() => {
      this.closePicker();
    });

    // Close on ESC key
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        this.closePicker();
      }
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
