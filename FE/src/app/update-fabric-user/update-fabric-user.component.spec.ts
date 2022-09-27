import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFabricUserComponent } from './update-fabric-user.component';

describe('UpdateFabricUserComponent', () => {
  let component: UpdateFabricUserComponent;
  let fixture: ComponentFixture<UpdateFabricUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFabricUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFabricUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
