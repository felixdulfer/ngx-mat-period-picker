# ng-mat-period-picker

A modern Angular Material period picker component built with standalone components.

## Features

- **Standalone Components**: Built using Angular's modern standalone component architecture
- **Type Safety**: Full TypeScript support with proper interfaces
- **Material Design**: Built on Angular Material components with text field display
- **Overlay Picker**: Click-to-open picker interface similar to native date pickers
- **Flexible**: Supports custom date ranges and "present" end dates
- **Accessible**: Implements ControlValueAccessor for form integration
- **Responsive**: Clean, modern UI with proper styling
- **Modular**: Individual components can be used separately
- **Composable**: Period picker is built using year/month field components

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

You can use the individual components directly:

#### Year/Month Field (Text Field with Overlay)

```typescript
import { YearMonthFieldComponent, YearMonth } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthFieldComponent],
  template: ` <lib-year-month-field [formControl]="yearMonthControl" /> `,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

#### Year/Month Field with Custom Configuration

```typescript
import { YearMonthFieldComponent, YearMonth } from "ng-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthFieldComponent],
  template: ` <lib-year-month-field [formControl]="yearMonthControl" label="Custom Label" placeholder="Custom placeholder" [minYear]="2020" [maxYear]="2030" /> `,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

#### Year/Month Picker (Direct Picker)

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
  - Built using YearMonthFieldComponent for start and end fields
  - "Present" toggle for end date
  - Form control integration
  - Automatic end date disabling when "present" is selected
  - Modular architecture - no code duplication

#### YearMonthFieldComponent

- **Selector**: `lib-year-month-field`
- **Inputs**:
  - `label?: string` - Field label (default: "Select Year/Month")
  - `placeholder?: string` - Field placeholder (default: "Click to select")
  - `minYear?: number` - Minimum allowed year
  - `maxYear?: number` - Maximum allowed year
  - `disabled?: boolean` - Disable the component
- **Features**:
  - Material text field displaying selected value
  - Click-to-open overlay picker interface
  - Form control integration
  - Calendar icon for visual indication
  - Can be used standalone or within other components
  - Configurable label and placeholder

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
  - Can be used standalone or within overlay

## Project Structure

```text
src/lib/
├── components/
│   ├── period-picker.component.ts       # Period picker (uses YearMonthFieldComponent)
│   ├── year-month-picker.component.ts   # Year/month picker (direct picker)
│   ├── year-month-field.component.ts    # Text field wrapper (used by period picker)
│   └── index.ts                         # Component exports
└── types/
    └── index.ts                         # Type definitions
```

## Architecture

The library follows a modular, composable architecture:

1. **YearMonthPickerComponent**: The core picker component with year/month selection
2. **YearMonthFieldComponent**: A wrapper that adds text field + overlay functionality
3. **PeriodPickerComponent**: Built using two YearMonthFieldComponent instances

This approach ensures:

- **No Code Duplication**: Overlay logic is only in YearMonthFieldComponent
- **Modularity**: Each component can be used independently
- **Maintainability**: Changes to overlay behavior only need to be made in one place
- **Flexibility**: Users can choose the level of abstraction they need

## Development

This library is built using:

- Angular 19+ standalone components
- Angular Material for UI components
- Angular CDK Overlay for popup functionality
- TypeScript for type safety
- Modern Angular best practices
- ControlValueAccessor for form integration

## Dependencies

- **Peer Dependencies**: Angular Common and Core (^19.2.0)
- **Dependencies**: tslib (^2.3.0)
- **UI Components**: Angular Material (Button, Card, Icon, Divider, SlideToggle, FormField, Input)
- **CDK**: Angular CDK (Overlay, Portal)
