import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivateDialogComponent } from './user-activate-dialog.component';

describe('UserActivateDialogComponent', () => {
  let component: UserActivateDialogComponent;
  let fixture: ComponentFixture<UserActivateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserActivateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
