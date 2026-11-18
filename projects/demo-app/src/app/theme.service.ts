import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'ngx-mat-period-picker-theme-mode';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** Currently selected mode (user preference). */
  readonly mode = signal<ThemeMode>(this.loadInitialMode());

  /** The effective mode actually applied (resolves 'system' to light/dark). */
  readonly effectiveMode = signal<'light' | 'dark'>(this.resolveEffectiveMode());

  constructor() {
    // Apply the theme whenever the mode changes
    effect(() => {
      const mode = this.mode();
      this.applyMode(mode);
      this.persist(mode);
    });

    // React to OS-level theme changes when in system mode
    if (this.isBrowser) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        if (this.mode() === 'system') {
          this.applyMode('system');
        }
      });
    }
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private applyMode(mode: ThemeMode): void {
    if (!this.isBrowser) return;
    const html = document.documentElement;
    const effective = this.resolveEffective(mode);
    this.effectiveMode.set(effective);
    // `color-scheme` drives Angular Material's `light-dark()` tokens
    html.style.colorScheme = mode === 'system' ? 'light dark' : effective;
  }

  private resolveEffective(mode: ThemeMode): 'light' | 'dark' {
    if (mode === 'system') {
      if (this.isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    }
    return mode;
  }

  private resolveEffectiveMode(): 'light' | 'dark' {
    return this.resolveEffective(this.mode());
  }

  private loadInitialMode(): ThemeMode {
    if (this.isBrowser) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored;
      }
    }
    return 'system';
  }

  private persist(mode: ThemeMode): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }
}
