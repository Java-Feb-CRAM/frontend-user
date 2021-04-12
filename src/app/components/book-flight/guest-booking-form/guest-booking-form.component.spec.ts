import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestBookingFormComponent } from './guest-booking-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('GuestBookingFormComponent', () => {
  let component: GuestBookingFormComponent;
  let fixture: ComponentFixture<GuestBookingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
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
