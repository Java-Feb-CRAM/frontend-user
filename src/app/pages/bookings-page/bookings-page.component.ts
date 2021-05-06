import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../models/Booking';
import { PaymentInfo } from '../../models/PaymentInfo';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute } from '@angular/router';
import { UserInfo, UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';
import { UpdateBookingDto } from '../../dto/UpdateBookingDto';
import { EditBookingFormComponent } from '../../components/edit-booking-form/edit-booking-form.component';
import { LoadingButtonComponent } from '../../components/loading-button/loading-button.component';

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrls: ['./bookings-page.component.scss'],
})
export class BookingsPageComponent implements OnInit {
  // @ts-ignore
  @ViewChild(LoadingButtonComponent) loadingButton: LoadingButtonComponent;
  booking: Booking | null = null;
  bookingPayment: PaymentInfo | null = null;
  bookingPaymentDate = new Date();
  bookingSearchForm: FormGroup;
  checkedOut = false;
  user: UserInfo | undefined;
  bookings: Booking[] = [];
  errorMessage: string | null = null;
  cancelError: string | null = null;
  canceled = 0;
  constructor(
    private readonly bookingService: BookingService,
    private readonly fb: FormBuilder,
    private readonly paymentService: PaymentService,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private modalService: NgbModal
  ) {
    this.bookingSearchForm = this.fb.group({
      confirmationCode: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
          ),
        ],
      ],
    });
  }

  lookupBooking(code: string): void {
    this.loadingButton.loading = true;
    this.bookingSearchForm.setValue({
      confirmationCode: code,
    });
    this.onSubmit();
  }

  cancelBooking(bookingId: number): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.message = `Are you sure you want to cancel this booking?
      This action cannot be undone.
      If you do wish to cancel this booking you will recieve a full refund.`;
    this.canceled = 0;
    this.cancelError = null;
    modalRef.closed.subscribe((reason) => {
      if (reason === 'delete') {
        this.bookingService.cancelBooking(bookingId).subscribe(
          () => {
            this.canceled = 2;
            this.onSubmit();
          },
          (err) => {
            this.cancelError =
              err.error.message || 'An error occurred, please try again later.';
          }
        );
      }
    });
  }

  editBooking(bookingId: number): void {
    const modalRef = this.modalService.open(EditBookingFormComponent);
    modalRef.componentInstance.originalPassengers = this.booking?.passengers;
    modalRef.closed.subscribe((reason) => {
      if (reason as UpdateBookingDto) {
        this.bookingService.updateBooking(bookingId, reason).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params.confirmationCode) {
          this.bookingSearchForm.setValue({
            confirmationCode: params.confirmationCode,
          });
          this.onSubmit();
        }
        if (params.checkedOut) {
          this.checkedOut = true;
        }
      },
    });
    this.userService.fetchUser().subscribe((user) => {
      this.user = user;
      if (user && user.id) {
        this.bookingService.getBookingsByUser(user.id).subscribe((bookings) => {
          this.bookings = bookings;
        });
      }
    });
  }

  onSubmit(): void {
    const confirmationCode = this.bookingSearchForm.controls.confirmationCode
      .value;
    this.errorMessage = null;
    if (this.canceled > 0) {
      this.canceled = this.canceled - 1;
    }
    this.bookingService
      .getBookingByConfirmationCode(confirmationCode)
      .subscribe({
        next: (booking) => {
          this.loadingButton.loading = false;
          this.booking = booking;
          this.paymentService
            .getPayment(this.booking.bookingPayment.stripeId)
            .subscribe({
              next: (paymentInfo) => {
                this.bookingPayment = paymentInfo;
                this.bookingPaymentDate = new Date(paymentInfo.created * 1000);
                if (this.checkedOut) {
                  const element = document.querySelector('#CheckoutComplete');
                  if (element) {
                    element.scrollIntoView(true);
                  }
                }
              },
            });
        },
        error: (err) => {
          this.loadingButton.loading = false;
          this.errorMessage =
            err.error.message || 'An error occurred, please try again later.';
        },
      });
  }
}
