import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { PeriodPickerComponent } from './period-picker.component';

describe('PeriodPickerComponent', () => {
  let component: PeriodPickerComponent;
  let fixture: ComponentFixture<PeriodPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeriodPickerComponent],
      providers: [Overlay],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form value changes', () => {
    const testValue = {
      start: { year: 2023, month: 6 },
      end: { year: 2024, month: 12 },
      isPresent: false,
    };
    component.writeValue(testValue);
    expect(component.form.get('start')?.value).toEqual({
      year: 2023,
      month: 6,
    });
    expect(component.form.get('end')?.value).toEqual({ year: 2024, month: 12 });
    expect(component.form.get('present')?.value).toBe(false);
  });

  it('should handle present value', () => {
    const testValue = {
      start: { year: 2023, month: 6 },
      end: null,
      isPresent: true,
    };
    component.writeValue(testValue);
    expect(component.form.get('present')?.value).toBe(true);
    expect(component.form.get('end')?.value).toBeNull();
  });
});
