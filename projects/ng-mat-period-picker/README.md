# ng-mat-period-picker

A modern Angular Material period picker component built with standalone components.

## Features

- **Standalone Components**: Built using Angular's modern standalone component architecture
- **Type Safety**: Full TypeScript support with proper interfaces
- **Material Design**: Built on Angular Material components
- **Flexible**: Supports custom date ranges and "present" end dates
- **Accessible**: Implements ControlValueAccessor for form integration

## Installation

```bash
npm install ng-mat-period-picker
```

## Usage

### Basic Usage

```typescript
import { NgMatPeriodPickerComponent } from 'ng-mat-period-picker';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [NgMatPeriodPickerComponent],
  template: `
    <lib-ng-mat-period-picker></lib-ng-mat-period-picker>
  `
})
export class MyComponent {}
```

### Advanced Usage with Form Control

```typescript
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PeriodPickerComponent, Period } from 'ng-mat-period-picker';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [PeriodPickerComponent, ReactiveFormsModule],
  template: `
    <ngmp-period-picker [formControl]="periodControl"></ngmp-period-picker>
  `
})
export class MyComponent {
  periodControl = new FormControl<Period | null>(null);
}
```

### Individual Components

You can also use the individual components directly:

```typescript
import { YearMonthPickerComponent, YearMonth } from 'ng-mat-period-picker';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [YearMonthPickerComponent],
  template: `
    <ngmp-year-month-picker [formControl]="yearMonthControl"></ngmp-year-month-picker>
  `
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
  end: YearMonth | 'present' | null;
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

- `NgMatPeriodPickerComponent`: Main library component
- `PeriodPickerComponent`: Period picker with start/end dates
- `YearMonthPickerComponent`: Individual year/month picker

## Project Structure

```
src/lib/
├── components/
│   ├── ng-mat-period-picker.component.ts    # Main library component
│   └── period-picker/
│       ├── period-picker.component.ts       # Period picker component
│       └── year-month-picker.component.ts   # Year/month picker component
└── types/
    └── index.ts                            # Type definitions
```

## Development

This library is built using:
- Angular standalone components
- Angular Material for UI components
- TypeScript for type safety
- Modern Angular best practices
