import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseBaseModelListComponent } from './mbse-base-model-list.component';

describe('MbseBaseModelListComponent', () => {
  let component: MbseBaseModelListComponent;
  let fixture: ComponentFixture<MbseBaseModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseBaseModelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseBaseModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
