import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricUserListComponent } from './fabric-user-list.component';

describe('FabricUserListComponent', () => {
  let component: FabricUserListComponent;
  let fixture: ComponentFixture<FabricUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FabricUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
