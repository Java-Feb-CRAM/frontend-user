import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingFormComponent } from './user-booking-form.component';

describe('UserBookingFormComponent', () => {
  let component: UserBookingFormComponent;
  let fixture: ComponentFixture<UserBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBookingFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
