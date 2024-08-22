import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAttenetionComponent } from './session-attenetion.component';

describe('SessionAttenetionComponent', () => {
  let component: SessionAttenetionComponent;
  let fixture: ComponentFixture<SessionAttenetionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionAttenetionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionAttenetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
