import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YearMonthPickerComponent } from './year-month-picker.component';
import { MonthLabelService } from '../services/month-label.service';

describe('YearMonthPickerComponent', () => {
  let component: YearMonthPickerComponent;
  let fixture: ComponentFixture<YearMonthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearMonthPickerComponent],
      providers: [MonthLabelService],
    }).compileComponents();

    fixture = TestBed.createComponent(YearMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ControlValueAccessor implementation', () => {
    it('should handle writeValue', () => {
      const testValue = { year: 2023, month: 6 };
      component.writeValue(testValue);
      expect(component.valueSignal()).toEqual(testValue);
      expect(component.originalValue).toEqual(testValue);
    });

    it('should handle writeValue with null', () => {
      component.writeValue(null);
      expect(component.valueSignal()).toBeNull();
      expect(component.originalValue).toBeNull();
    });

    it('should register onChange and onTouched', () => {
      const onChangeSpy = jest.fn();
      const onTouchedSpy = jest.fn();

      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);

      // Trigger a value change by calling selectYear (which calls onChange and onTouched)
      component.selectYear(2023);

      expect(onChangeSpy).toHaveBeenCalled();
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('Year and month selection', () => {
    it('should select year', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      component.selectYear(2024);

      expect(component.valueSignal()).toEqual({ year: 2024, month: null });
      expect(onChangeSpy).toHaveBeenCalledWith({ year: 2024, month: null });
    });

    it('should select year and enable OK button', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      // Initially no selection
      expect(component.hasValidSelection()).toBe(false);

      // Select a year
      component.selectYear(2024);

      // Should now have valid selection (year only)
      expect(component.hasValidSelection()).toBe(true);
      expect(component.valueSignal()).toEqual({ year: 2024, month: null });
    });

    it('should deselect year when clicking same year', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      component.valueSignal.set({ year: 2024, month: null });

      component.selectYear(2024);

      expect(component.valueSignal()).toBeNull();
      expect(component.hasValidSelection()).toBe(false);
      expect(onChangeSpy).toHaveBeenCalledWith(null);
    });

    it('should select month', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      component.valueSignal.set({ year: 2023, month: null });

      component.selectMonth(8);

      expect(component.valueSignal()).toEqual({ year: 2023, month: 8 });
      expect(onChangeSpy).toHaveBeenCalledWith({ year: 2023, month: 8 });
    });

    it('should not select month when no year is selected', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      component.selectMonth(8);

      expect(component.valueSignal()).toBeNull();
      expect(onChangeSpy).not.toHaveBeenCalled();
    });

    it('should deselect month when clicking same month', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      component.valueSignal.set({ year: 2023, month: 8 });

      component.selectMonth(8);

      expect(component.valueSignal()).toEqual({ year: 2023, month: null });
      expect(component.hasValidSelection()).toBe(true); // Still valid because year is selected
      expect(onChangeSpy).toHaveBeenCalledWith({ year: 2023, month: null });
    });
  });

  describe('Navigation', () => {
    it('should check if can go previous', () => {
      // Test with default values
      expect(component.canGoPrev()).toBe(true);
    });

    it('should check if can go next', () => {
      // Test with default values
      expect(component.canGoNext()).toBe(true);
    });

    it('should navigate to previous range', () => {
      const initialYear = component.currentStartYear;
      component.prevRange();
      expect(component.currentStartYear).toBe(
        initialYear - component.yearsPerPage,
      );
    });

    it('should navigate to next range', () => {
      const initialYear = component.currentStartYear;
      component.nextRange();
      expect(component.currentStartYear).toBe(
        initialYear + component.yearsPerPage,
      );
    });
  });

  describe('Present value handling', () => {
    it('should toggle present value', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);

      component.togglePresent(true);

      expect(component.presentValue()).toBe(true);
      expect(onChangeSpy).toHaveBeenCalledWith(null);
    });

    it('should set present value', () => {
      component.setPresentValue(true);
      expect(component.presentValue()).toBe(true);
    });

    it('should set present label', () => {
      component.setPresentLabel('Current');
      expect(component.presentLabel()).toBe('Current');
    });

    it('should set show present toggle', () => {
      component.setShowPresentToggle(true);
      expect(component.showPresentToggle()).toBe(true);
    });
  });

  describe('Validation and state', () => {
    it('should check if has valid selection with year and month', () => {
      component.writeValue({ year: 2023, month: 6 });
      expect(component.hasValidSelection()).toBe(true);
    });

    it('should check if has valid selection with year only (month null)', () => {
      component.writeValue({ year: 2023, month: null });
      expect(component.hasValidSelection()).toBe(true);
    });

    it('should check if has valid selection with year only (month undefined)', () => {
      component.writeValue({ year: 2023, month: undefined as any });
      expect(component.hasValidSelection()).toBe(true);
    });

    it('should not have valid selection when no value is set', () => {
      component.writeValue(null);
      expect(component.hasValidSelection()).toBe(false);
    });

    it('should not have valid selection when year is null', () => {
      component.writeValue({ year: null as any, month: 6 });
      expect(component.hasValidSelection()).toBe(false);
    });

    it('should not have valid selection when year is undefined', () => {
      component.writeValue({ year: undefined as any, month: 6 });
      expect(component.hasValidSelection()).toBe(false);
    });

    it('should check if has changes', () => {
      const originalValue = { year: 2023, month: 6 };
      component.writeValue(originalValue);

      // No changes initially
      expect(component.hasChanges()).toBe(false);

      // Make a change
      component.valueSignal.set({ year: 2024, month: 6 });
      expect(component.hasChanges()).toBe(true);
    });
  });

  describe('Actions', () => {
    it('should handle cancel action', () => {
      const cancelSpy = jest.fn();
      component.cancelClicked.subscribe(cancelSpy);
      const originalValue = { year: 2024, month: null };
      component.writeValue(originalValue);
      component.valueSignal.set({ year: 2023, month: 6 });

      component.cancel();

      expect(component.valueSignal()).toEqual(originalValue);
      expect(cancelSpy).toHaveBeenCalled();
    });

    it('should handle ok action with year and month', () => {
      const okSpy = jest.fn();
      const onChangeSpy = jest.fn();
      component.okClicked.subscribe(okSpy);
      component.registerOnChange(onChangeSpy);
      component.valueSignal.set({ year: 2023, month: 6 });

      component.ok();

      expect(okSpy).toHaveBeenCalled();
    });

    it('should handle ok action with year only (month null)', () => {
      const okSpy = jest.fn();
      const onChangeSpy = jest.fn();
      component.okClicked.subscribe(okSpy);
      component.registerOnChange(onChangeSpy);
      component.valueSignal.set({ year: 2023, month: null });

      component.ok();

      expect(okSpy).toHaveBeenCalled();
    });

    it('should not emit ok when no valid selection', () => {
      const okSpy = jest.fn();
      component.okClicked.subscribe(okSpy);

      component.ok();

      expect(okSpy).not.toHaveBeenCalled();
    });

    it('should not emit ok when no year is selected', () => {
      const okSpy = jest.fn();
      component.okClicked.subscribe(okSpy);
      component.valueSignal.set(null);

      component.ok();

      expect(okSpy).not.toHaveBeenCalled();
    });
  });

  describe('Computed properties', () => {
    it('should return years array', () => {
      const years = component.years;
      expect(years.length).toBe(component.yearsPerPage);
      expect(years[0]).toBe(component.currentStartYear);
    });

    it('should return months array', () => {
      const months = component.months;
      expect(months.length).toBe(12);
    });

    it('should return range label', () => {
      const rangeLabel = component.rangeLabel;
      const years = component.years;
      expect(rangeLabel).toBe(`${years[0]} - ${years[years.length - 1]}`);
    });
  });
});
