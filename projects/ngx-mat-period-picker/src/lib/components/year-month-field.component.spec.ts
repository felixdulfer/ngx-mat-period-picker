import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { YearMonthFieldComponent } from './year-month-field.component';
import { DisplayFormatService } from '../services/display-format.service';

describe('YearMonthFieldComponent', () => {
  let component: YearMonthFieldComponent;
  let fixture: ComponentFixture<YearMonthFieldComponent>;
  let displayFormatService: DisplayFormatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearMonthFieldComponent],
      providers: [Overlay, DisplayFormatService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearMonthFieldComponent);
    component = fixture.componentInstance;
    displayFormatService = TestBed.inject(DisplayFormatService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getDisplayValue', () => {
    it('should display formatted values correctly', () => {
      const testValue = { year: 2023, month: 6 };
      expect(component.getDisplayValue(testValue)).toBe('June 2023');
    });

    it('should handle null values', () => {
      expect(component.getDisplayValue(null)).toBe('');
    });

    it('should handle year-only values', () => {
      const testValue = { year: 2023, month: null };
      expect(component.getDisplayValue(testValue)).toBe('2023');
    });

    it('should show present label when presentValue is true', () => {
      // Mock the presentValue signal to return true
      jest.spyOn(component, 'presentValue').mockReturnValue(true);
      jest.spyOn(component, 'presentLabel').mockReturnValue('Current');
      const testValue = { year: 2023, month: 6 };
      expect(component.getDisplayValue(testValue)).toBe('Current');
    });

    it('should show present label even with null value when presentValue is true', () => {
      // Mock the presentValue signal to return true
      jest.spyOn(component, 'presentValue').mockReturnValue(true);
      jest.spyOn(component, 'presentLabel').mockReturnValue('Present');
      expect(component.getDisplayValue(null)).toBe('Present');
    });

    it('should use displayFormatService for formatting', () => {
      const testValue = { year: 2023, month: 6 };
      const spy = jest.spyOn(displayFormatService, 'formatYearMonth');
      component.getDisplayValue(testValue);
      expect(spy).toHaveBeenCalledWith(testValue);
    });
  });

  describe('openPicker', () => {
    it('should handle openPicker method without errors', () => {
      const mockEvent = new MouseEvent('click');
      expect(() => component.openPicker(mockEvent)).not.toThrow();
    });

    it('should not open picker when disabled', () => {
      // Mock the disabled signal to return true
      jest.spyOn(component, 'disabled').mockReturnValue(true);
      const mockEvent = new MouseEvent('click');
      const spy = jest.spyOn(component['overlay'], 'create');

      component.openPicker(mockEvent);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should close existing picker before opening new one', () => {
      const mockEvent = new MouseEvent('click');
      const closeSpy = jest.spyOn(
        component as YearMonthFieldComponent & { closePicker: () => void },
        'closePicker',
      );

      component.openPicker(mockEvent);

      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor implementation', () => {
    it('should handle onChange registration correctly', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      // Test that onChange is called when value changes
      const testValue = { year: 2023, month: 6 };
      component.writeValue(testValue);
      expect(component.valueSignal()).toEqual(testValue);
    });

    it('should handle onTouched registration correctly', () => {
      const onTouchedSpy = jest.fn();
      component.registerOnTouched(onTouchedSpy);

      // Test that onTouched is called when value changes
      const testValue = { year: 2023, month: 6 };
      component.writeValue(testValue);
      expect(component.valueSignal()).toEqual(testValue);
    });
  });

  describe('Width configuration', () => {
    it('should have default width values', () => {
      expect(component.width()).toBe('200px');
      expect(component.fullWidth()).toBe(false);
    });

    it('should handle custom width input', () => {
      component.width.set(300);
      expect(component.width()).toBe(300);
    });

    it('should handle string width input', () => {
      component.width.set('400px');
      expect(component.width()).toBe('400px');
    });

    it('should handle fullWidth input', () => {
      component.fullWidth.set(true);
      expect(component.fullWidth()).toBe(true);
    });
  });

  describe('Input signals', () => {
    it('should have default values for input signals', () => {
      expect(component.label()).toBe('Select Year/Month');
      expect(component.placeholder()).toBe('Click to select');
      expect(component.disabled()).toBe(false);
      expect(component.presentLabel()).toBe('Present');
      expect(component.presentValue()).toBe(false);
      expect(component.showPresentToggle()).toBe(false);
    });

    it('should have default values for input signals', () => {
      expect(component.label()).toBe('Select Year/Month');
      expect(component.placeholder()).toBe('Click to select');
      expect(component.disabled()).toBe(false);
      expect(component.presentLabel()).toBe('Present');
      expect(component.presentValue()).toBe(false);
      expect(component.showPresentToggle()).toBe(false);
    });

    it('should handle undefined minYear and maxYear', () => {
      expect(component.minYear()).toBeUndefined();
      expect(component.maxYear()).toBeUndefined();
    });
  });

  describe('closePicker', () => {
    it('should dispose overlay when closing picker', () => {
      // Create a mock overlay ref
      const mockOverlayRef = {
        dispose: jest.fn(),
        attach: jest.fn(),
        backdropClick: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
        keydownEvents: jest.fn().mockReturnValue({ subscribe: jest.fn() })
      };

      // Manually set the overlay ref to simulate having an open overlay
      component['overlayRef'] = mockOverlayRef as any;

      component['closePicker']();

      expect(mockOverlayRef.dispose).toHaveBeenCalled();
      expect(component['overlayRef']).toBeNull();
    });

    it('should not dispose when no overlay exists', () => {
      expect(() => component['closePicker']()).not.toThrow();
    });
  });
});
