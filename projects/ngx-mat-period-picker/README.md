# @felixdulfer/ngx-mat-period-picker

Angular Material period picker component built with standalone components.

## Installation

```bash
npm install @felixdulfer/ngx-mat-period-picker
```

## Usage

### Basic Period Picker

```typescript
import { PeriodPickerComponent } from "@felixdulfer/ngx-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [PeriodPickerComponent],
  template: `<ngx-mat-period-picker />`,
})
export class MyComponent {}
```

### With Form Control

```typescript
import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PeriodPickerComponent, Period } from "@felixdulfer/ngx-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [PeriodPickerComponent, ReactiveFormsModule],
  template: `<ngx-mat-period-picker [formControl]="periodControl" />`,
})
export class MyComponent {
  periodControl = new FormControl<Period | null>(null);
}
```

### Individual Components

#### Year/Month Field (Text Field with Overlay)

```typescript
import { YearMonthFieldComponent } from "@felixdulfer/ngx-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthFieldComponent],
  template: `<ngx-mat-year-month-field [formControl]="yearMonthControl" />`,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

#### Year/Month Picker (Direct Picker)

```typescript
import { YearMonthPickerComponent } from "@felixdulfer/ngx-mat-period-picker";

@Component({
  selector: "app-my-component",
  standalone: true,
  imports: [YearMonthPickerComponent],
  template: `<ngx-mat-year-month-picker [formControl]="yearMonthControl" />`,
})
export class MyComponent {
  yearMonthControl = new FormControl<YearMonth | null>(null);
}
```

## API

### Types

```typescript
interface Period {
  start: YearMonth | null;
  end: YearMonth | "present" | null;
}

interface YearMonth {
  year: number;
  month: number | null;
}
```

### Components

#### PeriodPickerComponent
- **Selector**: `ngx-mat-period-picker`
- **Features**: Start/end date selection with "present" toggle option

#### YearMonthFieldComponent
- **Selector**: `ngx-mat-year-month-field`
- **Inputs**:
  - `label?: string` - Field label
  - `placeholder?: string` - Field placeholder
  - `minYear?: number` - Minimum allowed year
  - `maxYear?: number` - Maximum allowed year
  - `disabled?: boolean` - Disable the component

#### YearMonthPickerComponent
- **Selector**: `ngx-mat-year-month-picker`
- **Inputs**:
  - `minYear?: number` - Minimum allowed year
  - `maxYear?: number` - Maximum allowed year
  - `disabled?: boolean` - Disable the component

## Dependencies

- Angular 19+
- Angular Material
- Angular CDK
