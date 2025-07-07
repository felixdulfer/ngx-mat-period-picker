import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { YearMonthFieldComponent } from './year-month-field.component';

describe('YearMonthFieldComponent', () => {
  let component: YearMonthFieldComponent;
  let fixture: ComponentFixture<YearMonthFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearMonthFieldComponent],
      providers: [Overlay],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearMonthFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should handle openPicker method', () => {
    // Create a mock mouse event
    const mockEvent = new MouseEvent('click');

    // Test that the method can be called without errors
    expect(() => component.openPicker(mockEvent)).not.toThrow();
  });

  it('should handle onChange registration correctly', () => {
    // Spy on the onChange function
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    // Test that the onChange function is properly registered
    expect(component['onChange']).toBe(onChangeSpy);
  });

  it('should handle value updates correctly', () => {
    // Spy on the onChange function
    const onChangeSpy = jest.fn();
    component.registerOnChange(onChangeSpy);

    // Test setting a value
    const testValue = { year: 2023, month: 6 };
    component.writeValue(testValue);

    // Verify the value is set correctly
    expect(component.value).toEqual(testValue);
  });
});
