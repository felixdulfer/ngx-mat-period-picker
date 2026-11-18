import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

import { PeriodPickerComponent } from '../../../ngx-mat-period-picker/src/lib/components/period-picker.component';
import { YearMonthFieldComponent } from '../../../ngx-mat-period-picker/src/lib/components/year-month-field.component';
import { Period } from '../../../ngx-mat-period-picker/src/lib/types';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    PeriodPickerComponent,
    YearMonthFieldComponent,
  ],
  template: `
    <!-- ── Top App Bar ──────────────────────────────────────────── -->
    <mat-toolbar class="app-toolbar" color="primary">
      <mat-icon class="toolbar-icon">calendar_month</mat-icon>
      <span class="toolbar-title">ngx-mat-period-picker</span>
      <span class="toolbar-subtitle">Live Demo</span>
      <span class="spacer"></span>

      <!-- Theme mode toggle: light / system / dark -->
      <mat-button-toggle-group
        class="theme-toggle"
        [value]="theme.mode()"
        (change)="theme.setMode($event.value)"
        aria-label="Theme mode"
      >
        <mat-button-toggle value="light" matTooltip="Light mode">
          <mat-icon>light_mode</mat-icon>
        </mat-button-toggle>
        <mat-button-toggle value="system" matTooltip="System preference">
          <mat-icon>brightness_auto</mat-icon>
        </mat-button-toggle>
        <mat-button-toggle value="dark" matTooltip="Dark mode">
          <mat-icon>dark_mode</mat-icon>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </mat-toolbar>

    <!-- ── Hero ─────────────────────────────────────────────────── -->
    <header class="hero">
      <div class="hero-inner">
        <mat-chip-set aria-label="Library highlights">
          <mat-chip>Angular Material 3</mat-chip>
          <mat-chip>Standalone</mat-chip>
          <mat-chip>Reactive Forms</mat-chip>
          <mat-chip>i18n-ready</mat-chip>
        </mat-chip-set>
        <h1 class="hero-title mat-headline-2">
          A Material 3 period picker for Angular
        </h1>
        <p class="hero-subtitle mat-body-1">
          Pick date ranges with year/month granularity, "present" toggles, custom
          labels, and full locale support — all built on Angular Material.
        </p>
        <div class="hero-actions">
          <a
            mat-flat-button
            color="primary"
            href="https://github.com/felixdulfer/ngx-mat-period-picker"
            target="_blank"
            rel="noopener"
          >
            <mat-icon>code</mat-icon>
            View on GitHub
          </a>
          <button mat-stroked-button color="primary" (click)="scrollToDemos()">
            <mat-icon>arrow_downward</mat-icon>
            Explore demos
          </button>
        </div>
      </div>
    </header>

    <!-- ── Demo sections ────────────────────────────────────────── -->
    <main class="content" #demos>
      <form [formGroup]="form" class="demo-form">

        <!-- Locale info banner -->
        <mat-card appearance="outlined" class="info-card">
          <mat-card-content>
            <div class="info-card-row">
              <mat-icon color="primary">translate</mat-icon>
              <div>
                <strong>Locale-aware by default.</strong>
                Month names and date formatting follow Angular's configured
                <code>LOCALE_ID</code>. Override per-instance with custom labels
                and button text (see German, Spanish &amp; French examples below).
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- ── Basic pickers ──────────────────────────────────── -->
        <section class="demo-section">
          <h2 class="section-title mat-headline-5">Basic Pickers</h2>
          <p class="section-desc mat-body-2">
            The original year/month picker and the newer text-field variant.
          </p>

          <div class="card-grid">
            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Year/Month Picker</mat-card-title>
                <mat-card-subtitle>Original component</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker formControlName="yearMonth" [width]="250" />
                <pre class="code-output">{{ form.value.yearMonth | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Year/Month Field</mat-card-title>
                <mat-card-subtitle>Text-field variant</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker formControlName="yearMonthField" [width]="250" />
                <pre class="code-output">{{ form.value.yearMonthField | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- ── Period picker variants ─────────────────────────── -->
        <section class="demo-section">
          <h2 class="section-title mat-headline-5">Period Picker Variants</h2>
          <p class="section-desc mat-body-2">
            Custom labels, present toggles, and internationalised buttons.
          </p>

          <div class="card-grid card-grid-wide">
            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Default Labels</mat-card-title>
                <mat-card-subtitle>Out of the box</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker formControlName="period"  />
                <pre class="code-output">{{ form.value.period | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Employment</mat-card-title>
                <mat-card-subtitle>Custom labels + present toggle</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="customPeriod"
                  startLabel="Employment Start"
                  endLabel="Employment End"
                  presentLabel="Currently Employed"
                  startPlaceholder="When did you start?"
                  endPlaceholder="When did you end?"
                  presentPlaceholder="Still working here"
                  [showPresentToggle]="true"
                  
                />
                <pre class="code-output">{{ form.value.customPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Education</mat-card-title>
                <mat-card-subtitle>No present toggle</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="educationPeriod"
                  startLabel="Study Start Date"
                  endLabel="Graduation Date"
                  presentLabel="Currently Studying"
                  startPlaceholder="Select start date"
                  endPlaceholder="Select graduation date"
                  presentPlaceholder="Still studying"
                  [showPresentToggle]="false"
                  
                />
                <pre class="code-output">{{ form.value.educationPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Deutsch 🇩🇪</mat-card-title>
                <mat-card-subtitle>German labels &amp; buttons</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
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
                  
                />
                <pre class="code-output">{{ form.value.germanPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Español 🇪🇸</mat-card-title>
                <mat-card-subtitle>Spanish labels &amp; buttons</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
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
                  
                />
                <pre class="code-output">{{ form.value.spanishPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Français 🇫🇷</mat-card-title>
                <mat-card-subtitle>French single-field buttons</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker
                  formControlName="frenchField"
                  label="Date Historique"
                  placeholder="Sélectionnez l'année/mois"
                  [okLabel]="'Valider'"
                  [clearLabel]="'Effacer'"
                  [width]="250"
                />
                <pre class="code-output">{{ form.value.frenchField | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- ── Pre-filled examples ────────────────────────────── -->
        <section class="demo-section">
          <h2 class="section-title mat-headline-5">Pre-filled Examples</h2>
          <p class="section-desc mat-body-2">
            Different period shapes: complete, ongoing, year-only, and mixed granularity.
          </p>

          <div class="card-grid card-grid-wide">
            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Complete Period</mat-card-title>
                <mat-card-subtitle>Start + End</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="completePeriod"
                  startLabel="Start Date"
                  endLabel="End Date"
                  presentLabel="Present"
                  
                />
                <pre class="code-output">{{ form.value.completePeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Current Period</mat-card-title>
                <mat-card-subtitle>Start + Present</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="currentPeriod"
                  startLabel="Start Date"
                  endLabel="End Date"
                  presentLabel="Present"
                  
                />
                <pre class="code-output">{{ form.value.currentPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Year-Only Period</mat-card-title>
                <mat-card-subtitle>Start year + End year</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="yearOnlyPeriod"
                  startLabel="Start Year"
                  endLabel="End Year"
                  presentLabel="Present"
                  
                />
                <pre class="code-output">{{ form.value.yearOnlyPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Mixed Granularity</mat-card-title>
                <mat-card-subtitle>Year/Month start + Year-only end</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="mixedPeriod"
                  startLabel="Start Date"
                  endLabel="End Year"
                  presentLabel="Present"
                  
                />
                <pre class="code-output">{{ form.value.mixedPeriod | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- ── Base year configuration ────────────────────────── -->
        <section class="demo-section">
          <h2 class="section-title mat-headline-5">Base Year Configuration</h2>
          <p class="section-desc mat-body-2">
            Control which year interval the picker opens on when a field is empty.
          </p>

          <div class="card-grid card-grid-wide">
            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Base Year 2010</mat-card-title>
                <mat-card-subtitle>Opens near 2010</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="baseYear2010"
                  startLabel="Start Date"
                  endLabel="End Date"
                  presentLabel="Present"
                  [baseYearStart]="2010"
                  [baseYearEnd]="2010"
                  
                />
                <pre class="code-output">{{ form.value.baseYear2010 | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Base Year 2035</mat-card-title>
                <mat-card-subtitle>Opens near 2035</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="baseYear2035"
                  startLabel="Start Date"
                  endLabel="End Date"
                  presentLabel="Present"
                  [baseYearStart]="2035"
                  [baseYearEnd]="2035"
                  
                />
                <pre class="code-output">{{ form.value.baseYear2035 | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Different Base Years</mat-card-title>
                <mat-card-subtitle>Birth 1990 / Retirement 2070</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="differentBaseYears"
                  startLabel="Birth Year"
                  endLabel="Retirement Year"
                  presentLabel="Still Working"
                  [baseYearStart]="1990"
                  [baseYearEnd]="2070"
                  
                />
                <pre class="code-output">{{ form.value.differentBaseYears | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Single Field, Base 1995</mat-card-title>
                <mat-card-subtitle>Historical date picker</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker
                  formControlName="singleBaseYear1995"
                  label="Historical Date"
                  placeholder="Select historical year/month"
                  [baseYear]="1995"
                  [width]="250"
                />
                <pre class="code-output">{{ form.value.singleBaseYear1995 | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

        <!-- ── Width & layout ─────────────────────────────────── -->
        <section class="demo-section">
          <h2 class="section-title mat-headline-5">Width &amp; Layout</h2>
          <p class="section-desc mat-body-2">
            Fixed pixel widths, custom widths, and full-width layouts.
          </p>

          <div class="card-grid">
            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Custom Width (300px)</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker
                  formControlName="customWidthField"
                  label="Custom Width"
                  placeholder="300px width"
                  [width]="300"
                />
                <pre class="code-output">{{ form.value.customWidthField | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Full Width Field</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-year-month-picker
                  formControlName="fullWidthField"
                  label="Full Width"
                  placeholder="Takes full container width"
                  [fullWidth]="true"
                />
                <pre class="code-output">{{ form.value.fullWidthField | json }}</pre>
              </mat-card-content>
            </mat-card>

            <mat-card appearance="outlined" class="demo-card demo-card-wide">
              <mat-card-header>
                <mat-card-title class="mat-title-medium">Full-Width Period Picker</mat-card-title>
                <mat-card-subtitle>Equal field widths, fills the card</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <ngx-mat-period-picker
                  formControlName="fullWidthEqual"
                  startLabel="Start Date"
                  endLabel="End Date"
                />
                <pre class="code-output">{{ form.value.fullWidthEqual | json }}</pre>
              </mat-card-content>
            </mat-card>
          </div>
        </section>

      </form>
    </main>

    <!-- ── Footer ───────────────────────────────────────────────── -->
    <footer class="footer">
      <mat-divider></mat-divider>
      <div class="footer-inner">
        <span class="mat-body-2">ngx-mat-period-picker — MIT License</span>
        <span class="mat-body-2 footer-dim">
          Built with Angular {{ ngVersion }} &amp; Material 3
        </span>
      </div>
    </footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    /* ── Toolbar ─────────────────────────────────────────── */
    .app-toolbar {
      position: sticky;
      top: 0;
      z-index: 100;
      gap: 0.5rem;
    }

    .toolbar-icon {
      margin-right: 0.25rem;
    }

    .toolbar-title {
      font-weight: 600;
      font-size: 1.125rem;
      letter-spacing: -0.01em;
    }

    .toolbar-subtitle {
      font-size: 0.75rem;
      opacity: 0.75;
      font-weight: 400;
      margin-left: 0.25rem;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.15);
    }

    .spacer {
      flex: 1 1 auto;
    }

    .theme-toggle {
      --mat-standard-button-toggle-height: 36px;
    }

    .theme-toggle mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    /* ── Hero ────────────────────────────────────────────── */
    .hero {
      background:
        radial-gradient(ellipse 80% 50% at 50% -20%, var(--mat-sys-primary-container) 0%, transparent 70%),
        var(--mat-sys-surface);
      padding: 4rem 1.5rem 3rem;
      text-align: center;
    }

    .hero-inner {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
    }

    .hero-title {
      margin: 0;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
      background: linear-gradient(135deg, var(--mat-sys-primary), var(--mat-sys-tertiary));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle {
      margin: 0;
      max-width: 560px;
      color: var(--mat-sys-on-surface-variant);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 0.5rem;
    }

    .hero-actions mat-icon {
      margin-right: 0.25rem;
    }

    /* ── Content ─────────────────────────────────────────── */
    .content {
      flex: 1;
      width: 100%;
      max-width: 1100px;
      margin: 0 auto;
      padding: 2rem 1.5rem 3rem;
      box-sizing: border-box;
    }

    .demo-form {
      display: flex;
      flex-direction: column;
      gap: 2.5rem;
    }

    /* ── Info card ───────────────────────────────────────── */
    .info-card {
      border-left: 4px solid var(--mat-sys-primary);
    }

    .info-card-row {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      line-height: 1.6;
    }

    .info-card-row mat-icon {
      flex-shrink: 0;
      margin-top: 0.125rem;
    }

    .info-card-row code {
      font-family: 'Roboto Mono', monospace;
      font-size: 0.85em;
      background: var(--mat-sys-surface-container-highest);
      padding: 0.1em 0.4em;
      border-radius: 4px;
    }

    /* ── Sections ────────────────────────────────────────── */
    .demo-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .section-title {
      margin: 0;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .section-desc {
      margin: 0;
      color: var(--mat-sys-on-surface-variant);
    }

    /* ── Card grid ───────────────────────────────────────── */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1rem;
    }

    /* Wider 2-column grid for period pickers (two fields side-by-side) */
    .card-grid-wide {
      grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
    }

    .demo-card {
      overflow: hidden;
      transition: box-shadow 0.2s ease, transform 0.2s ease;
    }

    .demo-card:hover {
      box-shadow: var(--mat-sys-elevation-2, 0 3px 6px rgba(0,0,0,0.1));
    }

    .demo-card-wide {
      grid-column: 1 / -1;
    }

    .demo-card mat-card-content {
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    /* ── Footer ──────────────────────────────────────────── */
    .footer {
      margin-top: auto;
    }

    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .footer-dim {
      color: var(--mat-sys-on-surface-variant);
    }

    /* ── Responsive ──────────────────────────────────────── */
    @media (max-width: 600px) {
      .hero {
        padding: 2.5rem 1rem 2rem;
      }

      .toolbar-subtitle {
        display: none;
      }

      .card-grid,
      .card-grid-wide {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class AppComponent {
  readonly theme = inject(ThemeService);
  readonly ngVersion = '22';

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
    fullWidthEqual: new FormControl(null),
  });

  scrollToDemos(): void {
    document.querySelector('.content')?.scrollIntoView({ behavior: 'smooth' });
  }
}
