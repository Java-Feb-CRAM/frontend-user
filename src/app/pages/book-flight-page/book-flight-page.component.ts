import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../../models/Flight';
import { CartService } from '../../services/cart.service';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-book-flight-page',
  templateUrl: './book-flight-page.component.html',
  styleUrls: ['./book-flight-page.component.scss'],
})
export class BookFlightPageComponent implements OnInit {
  bookingForm: FormGroup;
  flights: Flight[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private flightService: FlightService
  ) {
    this.bookingForm = this.fb.group({
      guestEmail: ['', [Validators.required, Validators.email]],
      guestPhone: [
        '',
        [Validators.required, Validators.pattern(/^[2-9]\d{2}-\d{3}-\d{4}$/)],
      ],
      passengers: this.fb.array([]),
    });
    this.addPassenger();
  }

  ngOnInit(): void {
    this.cartService.cartItems.forEach((cartItem) => {
      this.flightService.getFlight(cartItem.id).subscribe((flight) => {
        this.flights.push(flight);
      });
    });
  }

  passengers(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  newPassenger(): FormGroup {
    return this.fb.group({
      givenName: ['', [Validators.required]],
      familyName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  addPassenger(): void {
    this.passengers().push(this.newPassenger());
  }

  removePassenger(i: number): void {
    this.passengers().removeAt(i);
  }

  onSubmit(): void {
    console.log(this.bookingForm.value);
  }

  get total(): number {
    const numPassengers = this.passengers().length;
    let sum = 0;
    this.flights.forEach((flight) => {
      sum += flight.seatPrice * numPassengers;
    });
    return sum;
  }

  get tax(): number {
    return 0.0825 * this.total;
  }

  get grandTotal(): number {
    return this.total + this.tax;
  }
}
