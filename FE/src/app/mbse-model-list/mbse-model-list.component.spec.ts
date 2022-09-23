import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseModelListComponent } from './mbse-model-list.component';

describe('MbseModelListComponent', () => {
  let component: MbseModelListComponent;
  let fixture: ComponentFixture<MbseModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseModelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
