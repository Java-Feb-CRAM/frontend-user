import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { PassengersFormData } from '../../components/book-flight/passengers-form/passengers-form.component';
import {
  PaymentFormComponent,
  PaymentFormData,
} from '../../components/book-flight/payment-form/payment-form.component';
import { GuestBookingFormData } from '../../components/book-flight/guest-booking-form/guest-booking-form.component';
import { BookingService } from '../../services/booking.service';
import { CreateGuestBookingDto } from '../../dto/CreateGuestBookingDto';
import { Router } from '@angular/router';
import { UserInfo, UserService } from '../../services/user.service';
import { Booking } from '../../models/Booking';
import { CreateUserBookingDto } from '../../dto/CreateUserBookingDto';
import { CreateAgentBookingDto } from '../../dto/CreateAgentBookingDto';

@Component({
  selector: 'app-book-flight-page',
  templateUrl: './book-flight-page.component.html',
  styleUrls: ['./book-flight-page.component.scss'],
})
export class BookFlightPageComponent implements OnInit {
  // @ts-ignore
  @ViewChild(PaymentFormComponent) paymentComp: PaymentFormComponent;
  activePage = 1;
  stepOneCompleted = false;
  stepTwoCompleted = false;
  stepThreeCompleted = false;
  user: UserInfo | undefined;

  guestBookingData: GuestBookingFormData | null = null;
  passengersData: PassengersFormData | null = null;
  paymentData: PaymentFormData | null = null;
  flightIds: number[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly bookingService: BookingService,
    private readonly router: Router,
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.fetchUser().subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.flightIds = this.cartService.cartItems.map((cartItem) => {
      return cartItem.id;
    });
  }

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
    if (id === 3) {
      this.stepThreeCompleted = false;
    }
  }

  handleGuestBookingForm(data: GuestBookingFormData): void {
    this.guestBookingData = data;
    this.stepOneCompleted = true;
    this.activePage = 2;
  }

  handleUserBookingForm(data: boolean): void {
    if (data) {
      this.stepOneCompleted = true;
      this.activePage = 2;
    }
  }

  handlePassengersForm(data: PassengersFormData): void {
    this.passengersData = data;
    this.stepTwoCompleted = true;
    this.activePage = 3;
  }

  handleChooseSeatsForm(data: any): void {
    this.stepThreeCompleted = true;
    this.activePage = 4;
  }

  handlePaymentForm(data: PaymentFormData): void {
    this.paymentData = data;
    this.stepThreeCompleted = true;
    const flightIds = this.cartService.cartItems.map((cartItem) => {
      return cartItem.id;
    });
    if (this.user && this.user.role === 'ROLE_USER') {
      this.submitUserBooking(flightIds);
    } else if (this.user && this.user.role === 'ROLE_AGENT') {
      this.submitAgentBooking(flightIds);
    } else {
      this.submitGuestBooking(flightIds);
    }
  }

  private submitGuestBooking(flightIds: number[]): void {
    if (this.guestBookingData && this.passengersData && this.paymentData) {
      const createGuestBookingDto: CreateGuestBookingDto = {
        stripeToken: this.paymentData.stripeToken,
        guestEmail: this.guestBookingData.guestEmail,
        guestPhone: this.guestBookingData.guestPhone,
        flightIds,
        passengers: this.passengersData.passengers,
      };
      this.bookingService.createGuestBooking(createGuestBookingDto).subscribe(
        (booking) => {
          this.finishBooking(booking);
        },
        (err) => {
          this.paymentComp.stopLoading();
          this.paymentComp.setErrorMessage(
            err.error.message || 'An error occurred, please try again later.'
          );
        }
      );
    }
  }

  private submitUserBooking(flightIds: number[]): void {
    if (this.user && this.user.id && this.passengersData && this.paymentData) {
      const createUserBookingDto: CreateUserBookingDto = {
        stripeToken: this.paymentData.stripeToken,
        userId: this.user.id,
        flightIds,
        passengers: this.passengersData.passengers,
      };
      this.bookingService.createUserBooking(createUserBookingDto).subscribe(
        (booking) => {
          this.finishBooking(booking);
        },
        (err) => {
          this.paymentComp.stopLoading();
          this.paymentComp.setErrorMessage(
            err.error.message || 'An error occurred, please try again later.'
          );
        }
      );
    }
  }

  private submitAgentBooking(flightIds: number[]): void {
    if (this.user && this.user.id && this.passengersData && this.paymentData) {
      const createAgentBookingDto: CreateAgentBookingDto = {
        stripeToken: this.paymentData.stripeToken,
        agentId: this.user.id,
        flightIds,
        passengers: this.passengersData.passengers,
      };
      this.bookingService.createAgentBooking(createAgentBookingDto).subscribe(
        (booking) => {
          this.finishBooking(booking);
        },
        (err) => {
          this.paymentComp.stopLoading();
          this.paymentComp.setErrorMessage(
            err.error.message || 'An error occurred, please try again later.'
          );
        }
      );
    }
  }

  private finishBooking(booking: Booking): void {
    this.cartService.emptyCart();
    this.router.navigate(['/bookings'], {
      queryParams: {
        confirmationCode: booking.confirmationCode,
        checkedOut: true,
      },
      fragment: 'CheckoutComplete',
    });
  }

  get passengerCount(): number {
    if (this.passengersData) {
      return this.passengersData.passengers.length;
    } else {
      return 0;
    }
  }
}
