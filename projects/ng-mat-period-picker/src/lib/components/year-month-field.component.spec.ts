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
    expect(component.getDisplayValue(testValue)).toBe('Jun 2023');
  });

  it('should handle null values', () => {
    expect(component.getDisplayValue(null)).toBe('');
  });

  it('should handle year-only values', () => {
    const testValue = { year: 2023, month: null };
    expect(component.getDisplayValue(testValue)).toBe('2023');
  });

  it('should not open picker when disabled', () => {
    component.disabled = true;
    component.openPicker();
    // The picker should not open when disabled
    expect(component['overlayRef']).toBeNull();
  });
});
