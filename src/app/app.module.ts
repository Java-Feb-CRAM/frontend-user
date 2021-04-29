import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbDateAdapter,
  NgbDateNativeAdapter,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { BookingsPageComponent } from './pages/bookings-page/bookings-page.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookFlightPageComponent } from './pages/book-flight-page/book-flight-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { GuestBookingFormComponent } from './components/book-flight/guest-booking-form/guest-booking-form.component';
import { AgentBookingFormComponent } from './components/book-flight/agent-booking-form/agent-booking-form.component';
import { UserBookingFormComponent } from './components/book-flight/user-booking-form/user-booking-form.component';
import { PassengersFormComponent } from './components/book-flight/passengers-form/passengers-form.component';
import { PaymentFormComponent } from './components/book-flight/payment-form/payment-form.component';
import { ItemizedBillComponent } from './components/book-flight/itemized-bill/itemized-bill.component';
import { RegistrationFormComponent } from './components/authentication/registration-form/registration-form.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SearchFlightsComponent } from './components/book-flight/search-flights/search-flights.component';
import { PhonePipe } from './pipes/phone.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { LoadingButtonComponent } from './components/loading-button/loading-button.component';

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
    GuestBookingFormComponent,
    AgentBookingFormComponent,
    UserBookingFormComponent,
    PassengersFormComponent,
    PaymentFormComponent,
    ItemizedBillComponent,
    RegistrationFormComponent,
    RegistrationPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    SearchFlightsComponent,
    PhonePipe,
    ConfirmModalComponent,
    LoadingButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxStripeModule.forRoot(
      'pk_test_51IbSmqKMAXXjSzaxL3WIYu5kSzambFamCzc2LhMp5AtyOOhwjoh5PJKq2He2N566ECIPpvHYZU7yq5PAt9sMJG4H00MTCuphgp'
    ),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
