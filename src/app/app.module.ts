import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { BookingsPageComponent } from './pages/bookings-page/bookings-page.component';
import { HttpClientModule } from '@angular/common/http';
import { BookFlightPageComponent } from './pages/book-flight-page/book-flight-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { GuestBookingFormComponent } from './components/book-flight/guest-booking-form/guest-booking-form.component';
import { AgentBookingFormComponent } from './components/book-flight/agent-booking-form/agent-booking-form.component';
import { UserBookingFormComponent } from './components/book-flight/user-booking-form/user-booking-form.component';
import { PassengersFormComponent } from './components/book-flight/passengers-form/passengers-form.component';
import { PaymentFormComponent } from './components/book-flight/payment-form/payment-form.component';
import { ItemizedBillComponent } from './components/book-flight/itemized-bill/itemized-bill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexPageComponent,
    NotFoundPageComponent,
    FlightsPageComponent,
    BookingsPageComponent,
    BookFlightPageComponent,
    CartPageComponent,
    StripePaymentComponent,
    GuestBookingFormComponent,
    AgentBookingFormComponent,
    UserBookingFormComponent,
    PassengersFormComponent,
    PaymentFormComponent,
    ItemizedBillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot(
      'pk_test_51IbSmqKMAXXjSzaxL3WIYu5kSzambFamCzc2LhMp5AtyOOhwjoh5PJKq2He2N566ECIPpvHYZU7yq5PAt9sMJG4H00MTCuphgp'
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
