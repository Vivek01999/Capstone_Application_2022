import { TestBed } from '@angular/core/testing';

import { Projectservice } from '../services/project-service.service';

describe('Projectservice', () => {
  let service: Projectservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Projectservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

