# ng-mat-period-picker

A modern Angular Material period picker component built with standalone components.

## Features

- **Standalone Components**: Built using Angular's modern standalone component architecture
- **Type Safety**: Full TypeScript support with proper interfaces
- **Material Design**: Built on Angular Material components
- **Flexible**: Supports custom date ranges and "present" end dates
- **Accessible**: Implements ControlValueAccessor for form integration
- **Responsive**: Clean, modern UI with proper styling

## Installation

```bash
npm install ng-mat-period-picker
```

## Usage

### Basic Usage

```typescript
import { PeriodPickerComponent } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [PeriodPickerComponent],
  template: ` <lib-ng-mat-period-picker /> `,
})
export class MyComponent {}
```

### Advanced Usage with Form Control

```typescript
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PeriodPickerComponent, Period } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [PeriodPickerComponent, ReactiveFormsModule],
  template: ` <lib-ng-mat-period-picker [formControl]="periodControl" /> `,
})
export class MyComponent {
  periodControl = new FormControl<Period | null>(null);
}
```

### Individual Components

You can also use the individual components directly:

```typescript
import { YearMonthPickerComponent, YearMonth } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthPickerComponent],
  template: ` <lib-year-month-picker [formControl]="yearMonthControl" /> `,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

### Year-Month Picker with Constraints

```typescript
import { YearMonthPickerComponent } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthPickerComponent],
  template: ` <lib-year-month-picker [formControl]="yearMonthControl" [minYear]="2020" [maxYear]="2030" /> `,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

## API Reference

### Period Interface

```typescript
interface Period {
  start: YearMonth | null;
  end: YearMonth | "present" | null;
}
```

### YearMonth Interface

```typescript
interface YearMonth {
  year: number;
  month: number | null;
}
```

### Components

#### PeriodPickerComponent

- **Selector**: `lib-ng-mat-period-picker`
- **Features**:
  - Start and end date selection
  - "Present" toggle for end date
  - Form control integration
  - Automatic end date disabling when "present" is selected

#### YearMonthPickerComponent

- **Selector**: `lib-year-month-picker`
- **Inputs**:
  - `minYear?: number` - Minimum allowed year
  - `maxYear?: number` - Maximum allowed year
  - `disabled?: boolean` - Disable the component
- **Features**:
  - Year range navigation (12 years per page)
  - Month selection
  - Visual feedback for selected values
  - Responsive grid layout

## Project Structure

```text
src/lib/
├── components/
│   ├── period-picker.component.ts       # Period picker component
│   ├── year-month-picker.component.ts   # Year/month picker component
│   └── index.ts                         # Component exports
└── types/
    └── index.ts                         # Type definitions
```

## Development

This library is built using:

- Angular 19+ standalone components
- Angular Material for UI components
- TypeScript for type safety
- Modern Angular best practices
- ControlValueAccessor for form integration

## Dependencies

- **Peer Dependencies**: Angular Common and Core (^19.2.0)
- **Dependencies**: tslib (^2.3.0)
- **UI Components**: Angular Material (Button, Card, Icon, Divider, SlideToggle)
