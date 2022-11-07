import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricUserIdentityListComponent } from './fabric-useridentity-list.component';

describe('FabricUserIdentityListComponent', () => {
  let component: FabricUserIdentityListComponent;
  let fixture: ComponentFixture<FabricUserIdentityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricUserIdentityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricUserIdentityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
