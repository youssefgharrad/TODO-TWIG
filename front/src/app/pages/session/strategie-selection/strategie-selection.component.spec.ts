import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategieSelectionComponent } from './strategie-selection.component';

describe('StrategieSelectionComponent', () => {
  let component: StrategieSelectionComponent;
  let fixture: ComponentFixture<StrategieSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategieSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategieSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
