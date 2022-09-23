import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgProjectComponent } from './org-project.component';

describe('OrgProjectComponent', () => {
  let component: OrgProjectComponent;
  let fixture: ComponentFixture<OrgProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
