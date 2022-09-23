import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseModelVarientComponent } from './mbse-model-varient.component';

describe('MbseModelVarientComponent', () => {
  let component: MbseModelVarientComponent;
  let fixture: ComponentFixture<MbseModelVarientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseModelVarientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseModelVarientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
