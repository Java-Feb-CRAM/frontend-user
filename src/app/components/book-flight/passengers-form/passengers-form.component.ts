import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';

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
export class PassengersFormComponent implements OnInit {
  @Output() passengersFormSubmitEvent = new EventEmitter<PassengersFormData>();
  passengersForm: FormGroup;
  validationErrors = {
    givenName: { required: 'First name is required' },
    familyName: { required: 'Last name is required' },
    dob: { required: 'Birthday is required' },
    gender: { required: 'Gender is required', pattern: 'Select your gender' },
    address: { required: 'Address is required' },
  };
  today: any;
  maxPassengers = Number.MAX_SAFE_INTEGER;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cartService: CartService,
    private readonly flightService: FlightService
  ) {
    this.passengersForm = this.fb.group({
      passengers: this.fb.array([]),
    });
    this.addPassenger();
    const date = new Date();
    this.today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    };
  }

  ngOnInit(): void {
    const flightIds = this.cartService.cartItems.map((cartItem) => cartItem.id);
    flightIds.forEach((flightId) => {
      this.flightService.getFlight(flightId).subscribe((flight) => {
        const availableSeats = flight.availableSeats;
        if (availableSeats < this.maxPassengers) {
          this.maxPassengers = availableSeats;
        }
      });
    });
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
    if (this.passengers.length + 1 <= this.maxPassengers) {
      this.passengers.push(this.newPassenger());
    }
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
    if (control.get(controlName)) {
      const ctrl = control.get(controlName);
      if (ctrl?.errors) {
        return Object.keys(ctrl.errors);
      }
    }
    return [];
  }

  getError(controlName: string, error: string): string {
    // @ts-ignore
    return this.validationErrors[controlName][error];
  }

  onSubmit(): void {
    const passengers = this.passengersForm.controls.passengers.value;
    passengers.forEach((passenger: any) => {
      passenger.dob = passenger.dob.toISOString().split('T')[0];
    });
    this.passengersFormSubmitEvent.emit({
      passengers,
    });
  }
}
