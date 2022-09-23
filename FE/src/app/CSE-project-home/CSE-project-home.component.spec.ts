import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectHomeComponent } from './CSE-project-home.component';

describe('ManagerProjectHomeComponent', () => {
  let component: ManagerProjectHomeComponent;
  let fixture: ComponentFixture<ManagerProjectHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerProjectHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProjectHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
