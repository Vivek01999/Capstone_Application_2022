import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFabricUserComponent } from './delete-fabric-user.component';

describe('DeleteFabricUserComponent', () => {
  let component: DeleteFabricUserComponent;
  let fixture: ComponentFixture<DeleteFabricUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFabricUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFabricUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
