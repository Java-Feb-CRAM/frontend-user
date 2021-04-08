import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingFormComponent } from './guest-booking-form.component';

describe('GuestBookingFormComponent', () => {
  let component: GuestBookingFormComponent;
  let fixture: ComponentFixture<GuestBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuestBookingFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestBookingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
