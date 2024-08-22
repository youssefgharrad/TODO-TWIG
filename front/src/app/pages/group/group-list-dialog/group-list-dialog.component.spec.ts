import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListDialogComponent } from './group-list-dialog.component';

describe('GroupListDialogComponent', () => {
  let component: GroupListDialogComponent;
  let fixture: ComponentFixture<GroupListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
