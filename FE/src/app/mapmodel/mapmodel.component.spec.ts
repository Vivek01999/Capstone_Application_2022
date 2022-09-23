import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapmodelComponent } from './mapmodel.component';

describe('MapmodelComponent', () => {
  let component: MapmodelComponent;
  let fixture: ComponentFixture<MapmodelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapmodelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
