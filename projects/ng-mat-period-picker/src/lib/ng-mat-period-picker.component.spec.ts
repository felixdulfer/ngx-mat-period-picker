import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMatPeriodPickerComponent } from './ng-mat-period-picker.component';

describe('NgMatPeriodPickerComponent', () => {
  let component: NgMatPeriodPickerComponent;
  let fixture: ComponentFixture<NgMatPeriodPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgMatPeriodPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgMatPeriodPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
