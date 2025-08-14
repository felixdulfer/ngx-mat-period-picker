import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeriodPickerComponent } from '../../../ngx-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthFieldComponent } from '../../../ngx-mat-period-picker/src/lib/components/year-month-field.component';
import { Period } from '../../../ngx-mat-period-picker/src/lib/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PeriodPickerComponent,
    YearMonthFieldComponent,
  ],
  template: `
    <h1>ngx-mat-period-picker Demo</h1>
    <div class="locale-info">
      <p><strong>Current Locale:</strong> Using Angular's configured locale</p>
      <p><em>The library automatically uses Angular's LOCALE_ID or $localize.locale. Month names and date formatting will be displayed in the configured language.</em></p>
    </div>
    <form [formGroup]="form">
      <h2>Year/Month Picker (Original)</h2>
      <ngx-mat-year-month-picker formControlName="yearMonth" [width]="250" />
      <pre>{{ form.value.yearMonth | json }}</pre>

      <h2>Year/Month Field (New Text Field)</h2>
      <ngx-mat-year-month-picker
        formControlName="yearMonthField"
        [width]="250"
      />
      <pre>{{ form.value.yearMonthField | json }}</pre>

      <h2>Period Picker (Default Labels)</h2>
      <ngx-mat-period-picker formControlName="period" [width]="400" />
      <pre>{{ form.value.period | json }}</pre>

      <h2>Period Picker (Employment Example)</h2>
      <ngx-mat-period-picker
        formControlName="customPeriod"
        startLabel="Employment Start"
        endLabel="Employment End"
        presentLabel="Currently Employed"
        startPlaceholder="When did you start?"
        endPlaceholder="When did you end?"
        presentPlaceholder="Still working here"
        [showPresentToggle]="true"
        [width]="400"
      />
      <pre>{{ form.value.customPeriod | json }}</pre>

      <h2>Period Picker (Education Example)</h2>
      <ngx-mat-period-picker
        formControlName="educationPeriod"
        startLabel="Study Start Date"
        endLabel="Graduation Date"
        presentLabel="Currently Studying"
        startPlaceholder="Select start date"
        endPlaceholder="Select graduation date"
        presentPlaceholder="Still studying"
        [showPresentToggle]="false"
        [width]="400"
      />
      <pre>{{ form.value.educationPeriod | json }}</pre>

      <h2>Period Picker with Translated Buttons (German)</h2>
      <ngx-mat-period-picker
        formControlName="germanPeriod"
        startLabel="Startdatum"
        endLabel="Enddatum"
        presentLabel="Gegenwärtig"
        startPlaceholder="Wann haben Sie angefangen?"
        endPlaceholder="Wann haben Sie aufgehört?"
        presentPlaceholder="Arbeiten Sie noch hier?"
        [okLabel]="'Bestätigen'"
        [clearLabel]="'Löschen'"
        [showPresentToggle]="true"
        [width]="400"
      />
      <pre>{{ form.value.germanPeriod | json }}</pre>

      <h2>Period Picker with Translated Buttons (Spanish)</h2>
      <ngx-mat-period-picker
        formControlName="spanishPeriod"
        startLabel="Fecha de Inicio"
        endLabel="Fecha de Fin"
        presentLabel="Actualmente"
        startPlaceholder="¿Cuándo comenzó?"
        endPlaceholder="¿Cuándo terminó?"
        presentPlaceholder="¿Todavía trabaja aquí?"
        [okLabel]="'Confirmar'"
        [clearLabel]="'Borrar'"
        [showPresentToggle]="true"
        [width]="400"
      />
      <pre>{{ form.value.spanishPeriod | json }}</pre>

      <h2>Pre-filled Examples</h2>

      <h3>Complete Period (Start + End)</h3>
      <ngx-mat-period-picker
        formControlName="completePeriod"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [width]="400"
      />
      <pre>{{ form.value.completePeriod | json }}</pre>

      <h3>Current Period (Start + Present)</h3>
      <ngx-mat-period-picker
        formControlName="currentPeriod"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [width]="400"
      />
      <pre>{{ form.value.currentPeriod | json }}</pre>

      <h3>Year Only Period (Start Year + End Year)</h3>
      <ngx-mat-period-picker
        formControlName="yearOnlyPeriod"
        startLabel="Start Year"
        endLabel="End Year"
        presentLabel="Present"
        [width]="400"
      />
      <pre>{{ form.value.yearOnlyPeriod | json }}</pre>

      <h3>Mixed Period (Start Year/Month + End Year Only)</h3>
      <ngx-mat-period-picker
        formControlName="mixedPeriod"
        startLabel="Start Date"
        endLabel="End Year"
        presentLabel="Present"
        [width]="400"
      />
      <pre>{{ form.value.mixedPeriod | json }}</pre>

      <h2>Base Year Configuration Examples</h2>

      <h3>Period Picker with Base Year 2010</h3>
      <ngx-mat-period-picker
        formControlName="baseYear2010"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [baseYearStart]="2010"
        [baseYearEnd]="2010"
        [width]="400"
      />
      <pre>{{ form.value.baseYear2010 | json }}</pre>
      <p>
        <small
          >When you click on empty fields above, the year picker will show an
          interval containing 2010.</small
        >
      </p>

      <h3>Period Picker with Base Year 2035</h3>
      <ngx-mat-period-picker
        formControlName="baseYear2035"
        startLabel="Start Date"
        endLabel="End Date"
        presentLabel="Present"
        [baseYearStart]="2035"
        [baseYearEnd]="2035"
        [width]="400"
      />
      <pre>{{ form.value.baseYear2035 | json }}</pre>
      <p>
        <small
          >When you click on empty fields above, the year picker will show an
          interval containing 2035.</small
        >
      </p>

      <h3>Period Picker with Different Base Years</h3>
      <ngx-mat-period-picker
        formControlName="differentBaseYears"
        startLabel="Birth Year"
        endLabel="Retirement Year"
        presentLabel="Still Working"
        [baseYearStart]="1990"
        [baseYearEnd]="2070"
        [width]="400"
      />
      <pre>{{ form.value.differentBaseYears | json }}</pre>
      <p>
        <small
          >Start field shows 1984-1995 interval (for birth years), End field
          shows 2068-2079 interval (for retirement years).</small
        >
      </p>

      <h3>Single Year/Month Field with Base Year 1995</h3>
      <ngx-mat-year-month-picker
        formControlName="singleBaseYear1995"
        label="Historical Date"
        placeholder="Select historical year/month"
        [baseYear]="1995"
        [width]="250"
      />
      <pre>{{ form.value.singleBaseYear1995 | json }}</pre>
      <p>
        <small
          >When you click above, the year picker will show an interval
          containing 1995.</small
        >
      </p>

      <h3>Single Year/Month Field with Translated Buttons (French)</h3>
      <ngx-mat-year-month-picker
        formControlName="frenchField"
        label="Date Historique"
        placeholder="Sélectionnez l'année/mois"
        [okLabel]="'Valider'"
        [clearLabel]="'Effacer'"
        [width]="250"
      />
      <pre>{{ form.value.frenchField | json }}</pre>

      <h2>Width and Layout Configuration Examples</h2>

      <h3>Year/Month Field with Custom Width</h3>
      <ngx-mat-year-month-picker
        formControlName="customWidthField"
        label="Custom Width"
        placeholder="300px width"
        [width]="300"
      />
      <pre>{{ form.value.customWidthField | json }}</pre>

      <h3>Year/Month Field with Full Width</h3>
      <ngx-mat-year-month-picker
        formControlName="fullWidthField"
        label="Full Width"
        placeholder="Takes full container width"
        [fullWidth]="true"
      />
      <pre>{{ form.value.fullWidthField | json }}</pre>

      <h3>Period Picker with Full Width and Equal Field Widths (Default)</h3>
      <ngx-mat-period-picker
        formControlName="fullWidthEqual"
        startLabel="Start Date"
        endLabel="End Date"
      />
      <pre>{{ form.value.fullWidthEqual | json }}</pre>
    </form>
  `,
  styles: `
    :host {
      display: block;
      padding: 2rem;
      max-width: 720px;
      margin: 0 auto;
    }

    .locale-info {
      background: #e3f2fd;
      border: 1px solid #2196f3;
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 2rem;
    }

    .locale-info p {
      margin: 0.5rem 0;
    }
  `,
})
export class AppComponent {
  form = new FormGroup({
    yearMonth: new FormControl(null),
    yearMonthField: new FormControl(null),
    period: new FormControl(null),
    customPeriod: new FormControl(null),
    educationPeriod: new FormControl(null),
    germanPeriod: new FormControl(null),
    spanishPeriod: new FormControl(null),
    completePeriod: new FormControl<Period>({
      start: { year: 2020, month: 3 },
      end: { year: 2023, month: 12 },
      isPresent: false,
    }),
    currentPeriod: new FormControl<Period>({
      start: { year: 2022, month: 6 },
      end: null,
      isPresent: true,
    }),
    yearOnlyPeriod: new FormControl<Period>({
      start: { year: 2018, month: null },
      end: { year: 2022, month: null },
      isPresent: false,
    }),
    mixedPeriod: new FormControl<Period>({
      start: { year: 2021, month: 9 },
      end: { year: 2024, month: null },
      isPresent: false,
    }),
    baseYear2010: new FormControl(null),
    baseYear2035: new FormControl(null),
    differentBaseYears: new FormControl(null),
    singleBaseYear1995: new FormControl(null),
    frenchField: new FormControl(null),
    customWidthField: new FormControl(null),
    fullWidthField: new FormControl(null),
    fixedWidthFlex: new FormControl(null),
    fullWidthEqual: new FormControl(null),
    fixedWidthOverride: new FormControl(null),
  });
}
