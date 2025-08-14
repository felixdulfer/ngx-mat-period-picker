import { TestBed } from '@angular/core/testing';
import { DisplayFormatService } from './display-format.service';
import { YearMonth } from '../types';
import { LocaleService } from './locale.service';

describe('DisplayFormatService', () => {
  let service: DisplayFormatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DisplayFormatService,
        {
          provide: LocaleService,
          useValue: {
            getEffectiveLocale: () => undefined // Use browser default for tests
          }
        }
      ],
    });
    service = TestBed.inject(DisplayFormatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('formatYearMonth', () => {
    it('should return empty string for null value', () => {
      expect(service.formatYearMonth(null)).toBe('');
    });

    it('should return empty string for undefined value', () => {
      expect(service.formatYearMonth(undefined as any)).toBe('');
    });

    it('should return empty string for empty object', () => {
      expect(service.formatYearMonth({} as YearMonth)).toBe('');
    });

    it('should return year only when month is null', () => {
      const value: YearMonth = { year: 2023, month: null };
      expect(service.formatYearMonth(value)).toBe('2023');
    });

    it('should return year only when month is undefined', () => {
      const value: YearMonth = { year: 2023, month: undefined as any };
      expect(service.formatYearMonth(value)).toBe('2023');
    });

    it('should format year and month correctly', () => {
      const value: YearMonth = { year: 2023, month: 6 };
      const result = service.formatYearMonth(value);
      expect(result).toContain('2023');
      expect(result).toContain('June');
    });

    it('should handle different months correctly', () => {
      const testCases = [
        { year: 2023, month: 1, expectedMonth: 'January' },
        { year: 2023, month: 2, expectedMonth: 'February' },
        { year: 2023, month: 12, expectedMonth: 'December' },
      ];

      testCases.forEach(({ year, month, expectedMonth }) => {
        const value: YearMonth = { year, month };
        const result = service.formatYearMonth(value);
        expect(result).toContain(year.toString());
        expect(result).toContain(expectedMonth);
      });
    });
  });

  describe('formatYearMonthDisplay', () => {
    it('should format year and month correctly', () => {
      const result = service.formatYearMonthDisplay(2023, 6);
      expect(result).toContain('2023');
      expect(result).toContain('June');
    });

    it('should throw error for invalid month (0)', () => {
      expect(() => service.formatYearMonthDisplay(2023, 0)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should throw error for invalid month (13)', () => {
      expect(() => service.formatYearMonthDisplay(2023, 13)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should handle all valid months', () => {
      for (let month = 1; month <= 12; month++) {
        expect(() => service.formatYearMonthDisplay(2023, month)).not.toThrow();
        const result = service.formatYearMonthDisplay(2023, month);
        expect(result).toContain('2023');
        expect(result).toBeTruthy();
      }
    });

    it('should handle different years', () => {
      const years = [2000, 2020, 2030, 2100];
      years.forEach((year) => {
        const result = service.formatYearMonthDisplay(year, 6);
        expect(result).toContain(year.toString());
        expect(result).toContain('June');
      });
    });
  });

  describe('formatYearDisplay', () => {
    it('should return year as string', () => {
      expect(service.formatYearDisplay(2023)).toBe('2023');
    });

    it('should handle different years', () => {
      const years = [2000, 2020, 2030, 2100];
      years.forEach((year) => {
        expect(service.formatYearDisplay(year)).toBe(year.toString());
      });
    });

    it('should handle zero year', () => {
      expect(service.formatYearDisplay(0)).toBe('0');
    });

    it('should handle negative year', () => {
      expect(service.formatYearDisplay(-2023)).toBe('-2023');
    });
  });
});
