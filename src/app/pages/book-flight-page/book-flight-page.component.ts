import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flight } from '../../models/Flight';
import { CartService } from '../../services/cart.service';
import { FlightService } from '../../services/flight.service';
import { PassengersFormData } from '../../components/book-flight/passengers-form/passengers-form.component';
import { PaymentFormData } from '../../components/book-flight/payment-form/payment-form.component';
import { GuestBookingFormData } from '../../components/book-flight/guest-booking-form/guest-booking-form.component';
import { BookingService } from '../../services/booking.service';
import { CreateGuestBookingDto } from '../../dto/CreateGuestBookingDto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-flight-page',
  templateUrl: './book-flight-page.component.html',
  styleUrls: ['./book-flight-page.component.scss'],
})
export class BookFlightPageComponent {
  activePage = 1;
  stepOneCompleted = false;
  stepTwoCompleted = false;
  stepThreeCompleted = false;

  guestBookingData: GuestBookingFormData | null = null;
  passengersData: PassengersFormData | null = null;
  paymentData: PaymentFormData | null = null;

  constructor(
    private cartService: CartService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  pageChanged(id: number): void {
    if (id === 1) {
      this.stepOneCompleted = false;
      this.stepTwoCompleted = false;
      this.stepThreeCompleted = false;
    }
    if (id === 2) {
      this.stepTwoCompleted = false;
      this.stepThreeCompleted = false;
    }
  }

  handleGuestBookingForm(data: GuestBookingFormData): void {
    this.guestBookingData = data;
    this.stepOneCompleted = true;
    this.activePage = 2;
  }

  handlePassengersForm(data: PassengersFormData): void {
    console.log(data);
    this.passengersData = data;
    this.stepTwoCompleted = true;
    this.activePage = 3;
  }

  handlePaymentForm(data: PaymentFormData): void {
    this.paymentData = data;
    this.stepThreeCompleted = true;
    const flightIds = this.cartService.cartItems.map((cartItem) => {
      return cartItem.id;
    });
    if (this.guestBookingData && this.passengersData && this.paymentData) {
      const createGuestBookingDto: CreateGuestBookingDto = {
        stripeToken: this.paymentData.stripeToken,
        guestEmail: this.guestBookingData.guestEmail,
        guestPhone: this.guestBookingData.guestPhone,
        flightIds,
        passengers: this.passengersData.passengers,
      };
      this.bookingService
        .createGuestBooking(createGuestBookingDto)
        .subscribe((booking) => {
          console.log(booking);
          this.cartService.emptyCart();
          this.router.navigate(['/']);
        });
    }
  }

  get passengerCount(): number {
    if (this.passengersData) {
      return this.passengersData.passengers.length;
    } else {
      return 0;
    }
  }
}
