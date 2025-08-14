import { TestBed } from '@angular/core/testing';
import { MonthLabelService } from './month-label.service';
import { LocaleService } from './locale.service';

describe('MonthLabelService', () => {
  let service: MonthLabelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MonthLabelService,
        {
          provide: LocaleService,
          useValue: {
            getEffectiveLocale: () => undefined // Use browser default for tests
          }
        }
      ],
    });
    service = TestBed.inject(MonthLabelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getShortMonthLabels', () => {
    it('should return array of 12 month labels', () => {
      const labels = service.getShortMonthLabels();
      expect(labels.length).toBe(12);
    });

    it('should return short month names', () => {
      const labels = service.getShortMonthLabels();
      const expectedMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      // Check that all expected months are present (order may vary by locale)
      expectedMonths.forEach((month) => {
        expect(labels).toContain(month);
      });
    });

    it('should return consistent labels on multiple calls', () => {
      const labels1 = service.getShortMonthLabels();
      const labels2 = service.getShortMonthLabels();
      expect(labels1).toEqual(labels2);
    });

    it('should return unique labels', () => {
      const labels = service.getShortMonthLabels();
      const uniqueLabels = new Set(labels);
      expect(uniqueLabels.size).toBe(12);
    });
  });

  describe('getShortMonthLabel', () => {
    it('should return correct label for month 1', () => {
      const label = service.getShortMonthLabel(1);
      expect(label).toBe('Jan');
    });

    it('should return correct label for month 6', () => {
      const label = service.getShortMonthLabel(6);
      expect(label).toBe('Jun');
    });

    it('should return correct label for month 12', () => {
      const label = service.getShortMonthLabel(12);
      expect(label).toBe('Dec');
    });

    it('should handle all valid months', () => {
      const expectedMonths = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      for (let month = 1; month <= 12; month++) {
        const label = service.getShortMonthLabel(month);
        expect(label).toBe(expectedMonths[month - 1]);
      }
    });

    it('should throw error for month 0', () => {
      expect(() => service.getShortMonthLabel(0)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should throw error for month 13', () => {
      expect(() => service.getShortMonthLabel(13)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should throw error for negative month', () => {
      expect(() => service.getShortMonthLabel(-1)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should throw error for large month number', () => {
      expect(() => service.getShortMonthLabel(100)).toThrow(
        'Month number must be between 1 and 12',
      );
    });

    it('should return consistent labels for same month', () => {
      const label1 = service.getShortMonthLabel(6);
      const label2 = service.getShortMonthLabel(6);
      expect(label1).toBe(label2);
    });
  });
});
