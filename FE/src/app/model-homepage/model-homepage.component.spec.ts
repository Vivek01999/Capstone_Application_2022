import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelHomepageComponent } from './model-homepage.component';

describe('ModelHomepageComponent', () => {
  let component: ModelHomepageComponent;
  let fixture: ComponentFixture<ModelHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
