import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { PaymentInfo } from '../../models/PaymentInfo';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.scss'],
})
export class BookingsPageComponent implements OnInit {
  booking: Booking | null = null;
  bookingPayment: PaymentInfo | null = null;
  bookingPaymentDate = new Date();
  bookingSearchForm: FormGroup;
  checkedOut = false;
  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {
    this.bookingSearchForm = this.fb.group({
      confirmationCode: [
        'f2748220-7fbf-4712-9c93-c433e668b497',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          ),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.confirmationCode) {
        this.bookingSearchForm.setValue({
          confirmationCode: params.confirmationCode,
        });
        this.onSubmit();
      }
      if (params.checkedOut) {
        this.checkedOut = true;
      }
    });
  }

  onSubmit(): void {
    const confirmationCode = this.bookingSearchForm.controls.confirmationCode
      .value;
    this.bookingService
      .getBookingByConfirmationCode(confirmationCode)
      .subscribe((booking) => {
        this.booking = booking;
        this.paymentService
          .getPayment(this.booking.bookingPayment.stripeId)
          .subscribe((paymentInfo) => {
            this.bookingPayment = paymentInfo;
            this.bookingPaymentDate = new Date(paymentInfo.created * 1000);
          });
      });
  }
}
