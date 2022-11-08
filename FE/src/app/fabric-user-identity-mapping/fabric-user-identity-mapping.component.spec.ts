import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricUserIdentityMappingComponent } from './fabric-user-identity-mapping.component';

describe('FabricUserIdentityMappingComponent', () => {
  let component: FabricUserIdentityMappingComponent;
  let fixture: ComponentFixture<FabricUserIdentityMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricUserIdentityMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricUserIdentityMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
