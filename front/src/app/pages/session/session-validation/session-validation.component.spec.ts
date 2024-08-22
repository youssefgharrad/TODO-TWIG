import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionValidationComponent } from './session-validation.component';

describe('SessionValidationComponent', () => {
  let component: SessionValidationComponent;
  let fixture: ComponentFixture<SessionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
