import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurCreateDialogComponent } from './joueur-create-dialog.component';

describe('JoueurCreateDialogComponent', () => {
  let component: JoueurCreateDialogComponent;
  let fixture: ComponentFixture<JoueurCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoueurCreateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoueurCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
