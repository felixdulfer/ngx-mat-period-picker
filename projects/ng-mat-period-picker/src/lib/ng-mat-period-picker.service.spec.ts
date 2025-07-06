import { TestBed } from '@angular/core/testing';

import { NgMatPeriodPickerService } from './ng-mat-period-picker.service';

describe('NgMatPeriodPickerService', () => {
  let service: NgMatPeriodPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgMatPeriodPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
