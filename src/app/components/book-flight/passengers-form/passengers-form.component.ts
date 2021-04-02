import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentFormData } from '../payment-form/payment-form.component';

export interface PassengerData {
  givenName: string;
  familyName: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
}

export interface PassengersFormData {
  passengers: PassengerData[];
}

@Component({
  selector: 'app-passengers-form',
  templateUrl: './passengers-form.component.html',
  styleUrls: ['./passengers-form.component.scss'],
})
export class PassengersFormComponent {
  @Output() passengersFormSubmitEvent = new EventEmitter<PassengersFormData>();
  passengersForm: FormGroup;
  validationErrors = {
    givenName: { required: 'First name is required' },
    familyName: { required: 'Last name is required' },
    dob: { required: 'Birthday is required' },
    gender: { required: 'Gender is required', pattern: 'Select your gender' },
    address: { required: 'Address is required' },
  };

  constructor(private fb: FormBuilder) {
    this.passengersForm = this.fb.group({
      passengers: this.fb.array([]),
    });
    this.addPassenger();
  }

  get passengers(): FormArray {
    return this.passengersForm.get('passengers') as FormArray;
  }

  newPassenger(): FormGroup {
    return this.fb.group({
      givenName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: [
        '---Select Gender---',
        [Validators.required, Validators.pattern(/Male|Female|Other/)],
      ],
      address: ['', [Validators.required]],
    });
  }

  addPassenger(): void {
    this.passengers.push(this.newPassenger());
  }

  removePassenger(i: number): void {
    this.passengers.removeAt(i);
  }

  isFieldInvalid(control: AbstractControl, controlName: string): boolean {
    return Boolean(
      control.get(controlName)?.invalid &&
        (control.get(controlName)?.dirty || control.get(controlName)?.touched)
    );
  }

  isFieldValid(control: AbstractControl, controlName: string): boolean {
    return Boolean(control.get(controlName)?.valid);
  }

  validationClass(control: AbstractControl, controlName: string): any {
    return {
      'is-invalid': this.isFieldInvalid(control, controlName),
      'is-valid': this.isFieldValid(control, controlName),
    };
  }

  hasErrors(control: AbstractControl, controlName: string): boolean {
    return Boolean(control.get(controlName)?.errors);
  }

  allErrors(control: AbstractControl, controlName: string): string[] {
    // tslint:disable-next-line:no-non-null-assertion
    return Object.keys(control.get(controlName)!.errors!);
  }

  getError(controlName: string, error: string): string {
    // @ts-ignore
    return this.validationErrors[controlName][error];
  }

  onSubmit(): void {
    this.passengersFormSubmitEvent.emit({
      passengers: this.passengersForm.controls.passengers.value,
    });
  }
}