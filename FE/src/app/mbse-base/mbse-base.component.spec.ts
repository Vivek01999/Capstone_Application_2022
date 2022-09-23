import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseBaseComponent } from './mbse-base.component';

describe('MbseBaseComponent', () => {
  let component: MbseBaseComponent;
  let fixture: ComponentFixture<MbseBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
