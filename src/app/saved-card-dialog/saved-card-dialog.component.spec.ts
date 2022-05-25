import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCardDialogComponent } from './saved-card-dialog.component';

describe('SavedCardDialogComponent', () => {
  let component: SavedCardDialogComponent;
  let fixture: ComponentFixture<SavedCardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
