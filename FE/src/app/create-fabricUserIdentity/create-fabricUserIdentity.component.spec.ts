import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFabricUserIdentityComponent } from './create-fabricUserIdentity.component';

describe('CreateFabricUserIdentityComponent', () => {
  let component: CreateFabricUserIdentityComponent;
  let fixture: ComponentFixture<CreateFabricUserIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFabricUserIdentityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFabricUserIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
