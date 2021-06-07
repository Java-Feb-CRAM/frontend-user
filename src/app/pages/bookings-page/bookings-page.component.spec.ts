import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsPageComponent } from './bookings-page.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { PaymentService } from '../../services/payment.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserInfo, UserService } from '../../services/user.service';
import {
  NgbAccordion,
  NgbAccordionModule,
  NgbModal,
  NgbPanel,
  NgbPanelContent,
} from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { Booking } from '../../models/Booking';
import { PaymentInfo } from '../../models/PaymentInfo';
import { By } from '@angular/platform-browser';
import { Flight } from '../../models/Flight';
import { Route } from '../../models/Route';
import { Airport } from '../../models/Airport';
import { Airplane } from '../../models/Airplane';
import { AirplaneType } from '../../models/AirplaneType';
import { DatePipe } from '@angular/common';
import { LoadingButtonComponent } from '../../components/loading-button/loading-button.component';

const flight = new Flight(
  1,
  new Route(
    2,
    new Airport('SFO', 'San Francisco', [], []),
    new Airport('LAX', 'Los Angeles', [], []),
    []
  ),
  new Airplane(3, new AirplaneType(2, 200, []), []),
  new Date(),
  4,
  19.99,
  [],
  2
);

const booking = new Booking(
  1,
  true,
  'f2748220-7fbf-4712-9c93-c433e668b497',
  [flight],
  [
    {
      givenName: 'John',
      familyName: 'Smith',
      dob: '1996-10-08',
      gender: 'Male',
      address: 'Texas',
    },
  ],
  {},
  {},
  null,
  null
);

class ActivatedRouteStub {
  private params = {};
  get queryParams(): Observable<Params> {
    return of(this.params);
  }

  setParams(params: any): void {
    this.params = params;
  }
}

class UserServiceStub {
  private userInfo: UserInfo | null = null;
  fetchUser(): Observable<UserInfo | null> {
    return of(this.userInfo);
  }
  setUserInfo(userInfo: UserInfo): void {
    this.userInfo = userInfo;
  }
}

class BookingServiceStub {
  getBookingByConfirmationCode(confirmationCode: string): Observable<Booking> {
    return of(booking);
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return of([booking]);
  }
}

const bookingPayment: PaymentInfo = {
  amount: 19.99 * 100,
  created: 1619189532,
  currency: 'USD',
  cardBrand: 'VISA',
  lastFour: '1234',
};

class PaymentServiceStub {
  getPayment(stripeId: string): Observable<PaymentInfo> {
    return of(bookingPayment);
  }
}

describe('BookingsPageComponent', () => {
  let component: BookingsPageComponent;
  let fixture: ComponentFixture<BookingsPageComponent>;
  let bookingService: BookingServiceStub;
  let paymentService: PaymentServiceStub;
  let activatedRoute: ActivatedRouteStub;
  let userService: UserServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BookingsPageComponent,
        NgbAccordion,
        NgbPanel,
        NgbPanelContent,
        LoadingButtonComponent,
      ],
      providers: [
        {
          provide: BookingService,
          useClass: BookingServiceStub,
        },
        FormBuilder,
        {
          provide: PaymentService,
          useClass: PaymentServiceStub,
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub,
        },
        {
          provide: UserService,
          useClass: UserServiceStub,
        },
        NgbModal,
      ],
      imports: [ReactiveFormsModule, NgbAccordionModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingsPageComponent);
    component = fixture.componentInstance;
    bookingService = TestBed.get(BookingService);
    paymentService = TestBed.get(PaymentService);
    activatedRoute = TestBed.get(ActivatedRoute);
    userService = TestBed.get(UserService);
  });

  it('should submit the booking search form', () => {
    fixture.detectChanges();
    const spy = spyOn(component, 'onSubmit');
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(spy).toHaveBeenCalled();
  });

  it('should display an error message for invalid confirmation code', () => {
    fixture.detectChanges();
    component.bookingSearchForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#confirmationCode'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-invalid');
    const de2 = fixture.debugElement.query(By.css('#confirmationCode ~ div'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('required');
  });

  it('should highlight field in green for valid confirmation code', () => {
    fixture.detectChanges();
    component.bookingSearchForm.setValue({
      confirmationCode: 'f2748220-7fbf-4712-9c93-c433e668b497',
    });
    component.bookingSearchForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('#confirmationCode'));
    const el: HTMLElement = de.nativeElement;
    expect(el.classList).toContain('is-valid');
  });

  it('should disable submit button if the form is invalid', () => {
    fixture.detectChanges();
    component.bookingSearchForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-primary'));
    const el = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should show each users booking confirmation code if logged in', () => {
    userService.setUserInfo({
      id: 1,
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('li > code'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(booking.confirmationCode);
  });

  it('should disable lookup button if confirmation code has already been looked up', () => {
    userService.setUserInfo({
      id: 1,
    });
    fixture.detectChanges();
    component.bookingSearchForm.setValue({
      confirmationCode: 'f2748220-7fbf-4712-9c93-c433e668b497',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-secondary'));
    const el = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeTruthy();
  });

  it('should enable lookup button if confirmation code has not been looked up', () => {
    userService.setUserInfo({
      id: 1,
    });
    fixture.detectChanges();
    component.bookingSearchForm.setValue({
      confirmationCode: 'f2748330-7fbf-4712-9c93-c433e668b497',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-secondary'));
    const el = de.nativeElement;
    expect(el.attributes.getNamedItem('disabled')).toBeFalsy();
  });

  it('should look up booking when clicking on lookup button', () => {
    const spy = spyOn(component, 'lookupBooking');
    userService.setUserInfo({
      id: 1,
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-secondary'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith('f2748220-7fbf-4712-9c93-c433e668b497');
  });

  it('should display jumbotron if booking completed', () => {
    activatedRoute.setParams({
      checkedOut: true,
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.jumbotron > .container > .display-4')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('completed');
  });

  it('should display booking details when looking up a valid booking', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.card.mb-5'));
    const el: HTMLElement = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should display active badge if booking is active', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.badge'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Active');
    expect(el.classList).toContain('badge-success');
  });

  it('should display canceled badge if booking is inactive', () => {
    booking.isActive = false;
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.badge'));
    const el: HTMLElement = de.nativeElement;
    booking.isActive = true;
    expect(el.innerText).toContain('Canceled');
    expect(el.classList).toContain('badge-danger');
  });

  it('should display a cancel button if the booking is active', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    const el: HTMLElement = de.nativeElement;
    expect(el).toBeTruthy();
  });

  it('should ask the user to confirm canceling a booking', () => {
    component.booking = booking;
    fixture.detectChanges();
    const spy = spyOn(component, 'cancelBooking');
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should open the update modal when clicking on the edit button', () => {
    component.booking = booking;
    fixture.detectChanges();
    const spy = spyOn(component, 'editBooking');
    const de = fixture.debugElement.query(By.css('#edit'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should display if the booking was booked by a user', () => {
    booking.bookingUser = {};
    booking.bookingGuest = null;
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('p.text-muted'));
    const el2: HTMLElement = de2.nativeElement;
    booking.bookingUser = null;
    booking.bookingGuest = {};
    expect(el2.innerText).toContain('User');
  });

  it('should display if the booking was booked by a guest', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('p.text-muted'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain('Guest');
  });

  it('should display if the booking was booked by an agent', () => {
    booking.bookingAgent = {};
    booking.bookingGuest = null;
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('p.text-muted'));
    const el2: HTMLElement = de2.nativeElement;
    booking.bookingAgent = null;
    booking.bookingGuest = {};
    expect(el2.innerText).toContain('Agent');
  });

  it('should display booking confirmation code', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('p > code'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(booking.confirmationCode);
  });

  it('should display booking guests email', () => {
    booking.bookingGuest = {
      contactEmail: 'example@example.com',
      contactPhone: '123-456-7890',
    };
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#guestEmail'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain('example@example.com');
  });

  it('should display booking guests phone number', () => {
    booking.bookingGuest = {
      contactEmail: 'example@example.com',
      contactPhone: '123-456-7890',
    };
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[0].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#guestPhone'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain('123-456-7890');
  });

  it('should display booked flights routes', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[1].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('h6'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(flight.route.originAirport.iataId);
    expect(el2.innerText).toContain(flight.route.destinationAirport.iataId);
  });

  it('should display booked flights departure dates', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[1].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('h6 ~ p'));
    const el2: HTMLElement = de2.nativeElement;
    const pipe = new DatePipe('en-US');
    const shortDate =
      pipe.transform(flight.departureTime, 'short') ||
      flight.departureTime.toISOString();
    expect(el2.innerText).toContain(shortDate);
  });

  it('should display passenger names', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[2].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('.pass-name'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(booking.passengers[0].givenName);
    expect(el2.innerText).toContain(booking.passengers[0].familyName);
  });

  it('should display passenger birthdays', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[2].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('.pass-dob'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(booking.passengers[0].dob);
  });

  it('should display passenger genders', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[2].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('.pass-gen'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(booking.passengers[0].gender);
  });

  it('should display passenger addresses', () => {
    component.booking = booking;
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[2].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('.pass-addr'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain(booking.passengers[0].address);
  });

  it('should display payment amount', () => {
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('strong'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerText).toContain((bookingPayment.amount / 100).toFixed(2));
  });

  it('should display paid if not refunded', () => {
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#paymentInfo'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('paid');
  });

  it('should display refunded if refunded', () => {
    booking.bookingPayment = { refunded: true };
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#paymentInfo'));
    const el2: HTMLElement = de2.nativeElement;
    booking.bookingPayment = {};
    expect(el2.innerHTML).toContain('refunded');
  });

  it('should display card brand', () => {
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#paymentInfo'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('VISA');
  });

  it('should display last four digits of card', () => {
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(By.css('#paymentInfo'));
    const el2: HTMLElement = de2.nativeElement;
    expect(el2.innerHTML).toContain('1234');
  });

  it('should display date charged', () => {
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(
      By.css('#paymentInfo ~ .text-muted')
    );
    const el2: HTMLElement = de2.nativeElement;
    const pipe = new DatePipe('en-US');
    const transformed =
      pipe.transform(component.bookingPaymentDate, 'short') ||
      component.bookingPaymentDate.toISOString();
    expect(el2.innerHTML).toContain(transformed);
  });

  it('should not display date charged if refunded', () => {
    booking.bookingPayment = { refunded: true };
    component.booking = booking;
    component.bookingPayment = bookingPayment;
    component.bookingPaymentDate = new Date(bookingPayment.created * 1000);
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.collapsed'));
    const el: HTMLElement = de[3].nativeElement;
    el.click();
    fixture.detectChanges();
    const de2 = fixture.debugElement.query(
      By.css('#paymentInfo ~ .text-muted')
    );
    booking.bookingPayment = {};
    expect(de2).toBeFalsy();
  });
});
