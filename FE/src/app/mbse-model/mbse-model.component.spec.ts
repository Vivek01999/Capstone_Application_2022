import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseModelComponent } from './mbse-model.component';

describe('MbseModelComponent', () => {
  let component: MbseModelComponent;
  let fixture: ComponentFixture<MbseModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
