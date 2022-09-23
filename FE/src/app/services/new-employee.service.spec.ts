import { TestBed } from '@angular/core/testing';

import { NewEmployeeService } from './new-employee.service';

describe('NewEmployeeService', () => {
  let service: NewEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
