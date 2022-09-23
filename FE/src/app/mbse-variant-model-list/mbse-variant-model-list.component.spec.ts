import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbseVariantModelListComponent } from './mbse-variant-model-list.component';

describe('MbseVariantModelListComponent', () => {
  let component: MbseVariantModelListComponent;
  let fixture: ComponentFixture<MbseVariantModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbseVariantModelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbseVariantModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
