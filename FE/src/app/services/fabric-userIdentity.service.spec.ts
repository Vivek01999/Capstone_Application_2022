import { TestBed } from '@angular/core/testing';

import { FabricUserIdentityService } from './fabric-userIdentity.service';

describe('FabricUserIdentityService', () => {
  let service: FabricUserIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FabricUserIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
