import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassengersFormData } from '../passengers-form/passengers-form.component';

export interface GuestBookingFormData {
  guestEmail: string;
  guestPhone: string;
}

@Component({
  selector: 'app-guest-booking-form',
  templateUrl: './guest-booking-form.component.html',
  styleUrls: ['./guest-booking-form.component.scss'],
})
export class GuestBookingFormComponent {
  @Output()
  guestBookingFormSubmitEvent = new EventEmitter<GuestBookingFormData>();
  guestBookingForm: FormGroup;
  validationErrors = {
    guestEmail: {
      required: 'Email is required',
      email: 'Email must be a valid email',
    },
    guestPhone: {
      required: 'Phone number is required',
      pattern: 'Phone number must follow this pattern: 000-111-2222',
    },
  };

  constructor(private fb: FormBuilder) {
    this.guestBookingForm = this.fb.group({
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: [
        '',
        [Validators.required, Validators.pattern("^\\d{3}-\\d{3}-\\d{4}$")],
      ],
    });
  }

  isFieldInvalid(controlName: string): boolean {
    return Boolean(
      this.guestBookingForm.get(controlName)?.invalid &&
        (this.guestBookingForm.get(controlName)?.dirty ||
          this.guestBookingForm.get(controlName)?.touched)
    );
  }

  isFieldValid(controlName: string): boolean {
    return Boolean(this.guestBookingForm.get(controlName)?.valid);
  }

  validationClass(controlName: string): any {
    return {
      'is-invalid': this.isFieldInvalid(controlName),
      'is-valid': this.isFieldValid(controlName),
    };
  }

  hasErrors(controlName: string): boolean {
    return Boolean(this.guestBookingForm.get(controlName)?.errors);
  }

  allErrors(controlName: string): string[] {
    // tslint:disable-next-line:no-non-null-assertion
    return Object.keys(this.guestBookingForm.get(controlName)!.errors!);
  }

  getError(controlName: string, error: string): string {
    // @ts-ignore
    return this.validationErrors[controlName][error];
  }

  onSubmit(): void {
    this.guestBookingFormSubmitEvent.emit({
      guestEmail: this.guestBookingForm.controls.guestEmail.value,
      guestPhone: this.guestBookingForm.controls.guestPhone.value,
    });
  }
}
