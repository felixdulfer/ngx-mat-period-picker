# ngx-mat-period-picker

A flexible Angular Material period picker component that allows users to select start and end periods with support for "present" periods.

## Features

- **Year/Month Selection**: Pick specific years and months or just years
- **Period Picker**: Select start and end periods with optional "present" toggle
- **Flexible Layouts**: Support for both flex and grid layouts
- **Configurable Widths**: Fixed width, full width, or custom width options
- **Base Year Configuration**: Set default year ranges for better UX
- **Responsive Design**: Mobile-friendly with responsive breakpoints
- **Angular Material Integration**: Built with Angular Material components
- **Standalone Components**: Modern Angular standalone component architecture

## Installation

```bash
npm install ngx-mat-period-picker
```

## Usage

### Basic Period Picker

```typescript
import { PeriodPickerComponent } from 'ngx-mat-period-picker';

@Component({
  selector: 'app-example',
  template: `
    <ngx-mat-period-picker
      [(ngModel)]="period"
      startLabel="Start Date"
      endLabel="End Date"
      presentLabel="Present"
    />
  `
})
export class ExampleComponent {
  period = {
    start: { year: 2020, month: 3 },
    end: { year: 2023, month: 12 },
    isPresent: false
  };
}
```

### Year/Month Field

```typescript
import { YearMonthFieldComponent } from 'ngx-mat-period-picker';

@Component({
  selector: 'app-example',
  template: `
    <ngx-mat-year-month-picker
      [(ngModel)]="date"
      label="Select Date"
      placeholder="Choose a date"
    />
  `
})
export class ExampleComponent {
  date = { year: 2023, month: 6 };
}
```

## Configuration Options

### Period Picker Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `startLabel` | `string` | `'Start Period'` | Label for the start field |
| `endLabel` | `string` | `'End Period'` | Label for the end field |
| `presentLabel` | `string` | `'Present'` | Label for the present toggle |
| `startPlaceholder` | `string` | `'Select start period'` | Placeholder for start field |
| `endPlaceholder` | `string` | `'Select end period'` | Placeholder for end field |
| `presentPlaceholder` | `string` | `'Present'` | Placeholder when present is selected |
| `baseYearStart` | `number \| undefined` | `undefined` | Base year for start field year picker |
| `baseYearEnd` | `number \| undefined` | `undefined` | Base year for end field year picker |
| `showPresentToggle` | `boolean` | `true` | Whether to show the present toggle |
| `width` | `string \| number` | `'auto'` | Fixed width of the period picker container |
| `fullWidth` | `boolean` | `true` | Whether to take full container width (automatically false when width is set) |
| `fieldWidth` | `string \| number` | `'200px'` | Width of individual fields |
| `fieldFullWidth` | `boolean` | `true` | Whether fields should take full width |

### Year/Month Field Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | `'Select Year/Month'` | Field label |
| `placeholder` | `string` | `'Click to select'` | Field placeholder |
| `minYear` | `number \| undefined` | `undefined` | Minimum selectable year |
| `maxYear` | `number \| undefined` | `undefined` | Maximum selectable year |
| `baseYear` | `number \| undefined` | `undefined` | Base year for year picker |
| `disabled` | `boolean` | `false` | Whether the field is disabled |
| `presentLabel` | `string` | `'Present'` | Label for present value |
| `presentValue` | `boolean` | `false` | Whether present is selected |
| `showPresentToggle` | `boolean` | `false` | Whether to show the present toggle |
| `width` | `string \| number` | `'200px'` | Fixed width of the field |
| `fullWidth` | `boolean` | `true` | Whether to take full container width (automatically false when width is set) |

## Width Configuration

### Automatic Behavior

When you set a `width` value (either as a number or string), the component automatically sets `fullWidth` to `false`. This ensures that:

- **Fixed Width**: When you specify a width, the component respects that exact width
- **Full Width**: When width is `'auto'` (default), the component uses the `fullWidth` setting
- **Smart Defaults**: No need to manually coordinate width and fullWidth settings

### Examples

**Default Full Width Behavior**:
```typescript
<ngx-mat-period-picker
  startLabel="Start Date"
  endLabel="End Date"
/>
```

**Fixed Width (Automatically Overrides fullWidth)**:
```typescript
<ngx-mat-period-picker
  startLabel="Start"
  endLabel="End"
  [width]="500"
  // fullWidth automatically becomes false
/>
```

**Explicit Override**:
```typescript
<ngx-mat-period-picker
  startLabel="Start"
  endLabel="End"
  [width]="500"
  [fullWidth]="true" // This will be ignored when width is set
/>
```

## Layout Examples

### Flex Layout (Default)

```typescript
<ngx-mat-period-picker
  [layout]="'flex'"
  [fieldWidth]="250"
  startLabel="Start"
  endLabel="End"
/>
```

Fields are displayed side by side with equal flex distribution. Each field has a minimum width of 200px and will grow to fill available space.

### Full Width Configuration

```typescript
<ngx-mat-period-picker
  [fullWidth]="true"
  [fieldFullWidth]="true"
  startLabel="Start Date"
  endLabel="End Date"
/>
```

The period picker takes the full width of its container, and both fields expand to fill the available space equally.

### Fixed Width Configuration

```typescript
<ngx-mat-period-picker
  [width]="600"
  [fieldWidth]="250"
  startLabel="Start"
  endLabel="End"
/>
```

The period picker has a fixed width of 600px, and each field has a fixed width of 250px.

## Data Types

### YearMonth

```typescript
interface YearMonth {
  year: number;
  month: number | null; // null for year-only selection
}
```

### Period

```typescript
interface Period {
  start: YearMonth | null;
  end: YearMonth | null;
  isPresent: boolean;
}
```

## Styling

The components use CSS custom properties and can be customized with your own styles. Key CSS classes:

- `.period-picker-container` - Main container
- `.period-fields` - Container for start/end fields
- `.year-month-field` - Individual year/month field
- `.full-width` - Applied when fullWidth is true
- `.layout-flex` - Applied when layout is 'flex'
- `.layout-grid` - Applied when layout is 'grid'

## Browser Support

- Angular 17+
- Modern browsers with CSS Grid and Flexbox support
- Mobile-responsive design

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and contribution guidelines.

## License

MIT License
