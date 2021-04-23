import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFlightPageComponent } from './book-flight-page.component';
import { HttpClientModule } from '@angular/common/http';
import {
  NgbNav,
  NgbNavItem,
  NgbNavLink,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { PaymentFormData } from '../../components/book-flight/payment-form/payment-form.component';
import { PassengersFormData } from '../../components/book-flight/passengers-form/passengers-form.component';
import { NavigationExtras, Router, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BookingService } from '../../services/booking.service';
import { UserInfo, UserService } from '../../services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Booking } from '../../models/Booking';
import { CreateGuestBookingDto } from '../../dto/CreateGuestBookingDto';
import { CreateUserBookingDto } from '../../dto/CreateUserBookingDto';
import { CreateAgentBookingDto } from '../../dto/CreateAgentBookingDto';
import { By } from '@angular/platform-browser';

class RouterStub {
  navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
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

const booking = new Booking(1, true, '1234', [], [], {}, {}, {}, {});

class BookingServiceStub {
  createGuestBooking(
    createGuestBookingDto: CreateGuestBookingDto
  ): Observable<Booking> {
    return of(booking);
  }
  createUserBooking(
    createUserBookingDto: CreateUserBookingDto
  ): Observable<Booking> {
    return of(booking);
  }
  createAgentBooking(
    createAgentBoookingDto: CreateAgentBookingDto
  ): Observable<Booking> {
    return of(booking);
  }
}

describe('BookFlightPageComponent', () => {
  let component: BookFlightPageComponent;
  let fixture: ComponentFixture<BookFlightPageComponent>;
  let cartService: CartService;
  let bookingService: BookingServiceStub;
  let router: RouterStub;
  let userService: UserServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFlightPageComponent, NgbNav, NgbNavItem, NgbNavLink],
      providers: [
        CartService,
        {
          provide: BookingService,
          useClass: BookingServiceStub,
        },
        {
          provide: Router,
          useClass: RouterStub,
        },
        {
          provide: UserService,
          useClass: UserServiceStub,
        },
      ],
      imports: [HttpClientModule, RouterModule.forRoot([]), NgbNavModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFlightPageComponent);
    component = fixture.componentInstance;
    cartService = TestBed.get(CartService);
    bookingService = TestBed.get(BookingService);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
  });

  it('should display guest if checking out as a guest', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Guest');
  });

  it('should display user if checking out as a user', () => {
    userService.setUserInfo({ role: 'ROLE_USER' });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('User');
  });

  it('should display agent if checking out as an agent', () => {
    userService.setUserInfo({ role: 'ROLE_AGENT' });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Agent');
  });

  it('should display GuestBookingFormComponent if checking out as a guest', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('app-guest-booking-form'));
    expect(de).toBeTruthy();
  });

  it('should display UserBookingFormComponent if checking out as a user', () => {
    userService.setUserInfo({ role: 'ROLE_USER' });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('app-user-booking-form'));
    expect(de).toBeTruthy();
  });

  it('should display AgentBookingFormComponent if checking out as an agent', () => {
    userService.setUserInfo({ role: 'ROLE_AGENT' });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('app-agent-booking-form'));
    expect(de).toBeTruthy();
  });

  it('should disable steps two and three by default', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('li > a'));
    const step2 = de[1];
    const step3 = de[2];
    const el1: HTMLElement = step2.nativeElement;
    const el2: HTMLElement = step3.nativeElement;
    expect(el1.attributes.getNamedItem('aria-disabled')).toBeTruthy();
    expect(el2.attributes.getNamedItem('aria-disabled')).toBeTruthy();
  });

  it('should change the page when clicking on the page buttons', () => {
    component.activePage = 2;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('li > a'));
    const el: HTMLElement = de.nativeElement;
    el.click();
    expect(component.activePage).toBe(1);
  });

  it('can handle GuestBookingForm event', () => {
    fixture.detectChanges();
    component.handleGuestBookingForm({
      guestEmail: 'example@example.com',
      guestPhone: '281-292-1451',
    });
    fixture.detectChanges();
    expect(component.stepOneCompleted).toBeTrue();
    expect(component.activePage).toBe(2);
    expect(component.guestBookingData).toEqual({
      guestEmail: 'example@example.com',
      guestPhone: '281-292-1451',
    });
  });

  it('can handle UserBookingForm event', () => {
    fixture.detectChanges();
    component.handleUserBookingForm(true);
    fixture.detectChanges();
    expect(component.stepOneCompleted).toBeTrue();
    expect(component.activePage).toBe(2);
  });

  // it('can handle AgentBookingForm event', () => {
  //   fixture.detectChanges();
  //   // TODO
  //   // component.handleAgentBookingForm(true);
  //   fixture.detectChanges();
  //   expect(component.stepOneCompleted).toBeTrue();
  //   expect(component.activePage).toBe(2);
  // });

  it('can handle PassengersForm event', () => {
    fixture.detectChanges();
    const passengers: PassengersFormData = {
      passengers: [
        {
          givenName: 'John',
          familyName: 'Smith',
          dob: '1996-10-08',
          gender: 'Male',
          address: 'Texas',
        },
      ],
    };
    component.handlePassengersForm(passengers);
    fixture.detectChanges();
    expect(component.stepTwoCompleted).toBeTrue();
    expect(component.activePage).toBe(3);
    expect(component.passengersData).toEqual(passengers);
  });

  it('can handle PaymentForm event', () => {
    fixture.detectChanges();
    cartService.cartItems = [{ id: 1 }];
    component.guestBookingData = {
      guestEmail: 'example@example.com',
      guestPhone: '281-292-1451',
    };
    component.passengersData = {
      passengers: [
        {
          givenName: 'John',
          familyName: 'Smith',
          dob: '1996-10-08',
          gender: 'Male',
          address: 'Texas',
        },
      ],
    };
    const paymentFormData: PaymentFormData = {
      name: 'John Smith',
      stripeToken: 'TOKEN',
    };
    const submitGuestBookingSpy = spyOn<any>(
      component,
      'submitGuestBooking'
    ).and.callThrough();
    const createGuestBookingSpy = spyOn(
      bookingService,
      'createGuestBooking'
    ).and.callThrough();
    const finishBookingSpy = spyOn<any>(
      component,
      'finishBooking'
    ).and.callThrough();
    const routerSpy = spyOn(router, 'navigate').and.callThrough();
    component.handlePaymentForm(paymentFormData);
    expect(submitGuestBookingSpy).toHaveBeenCalledWith([1]);
    expect(createGuestBookingSpy).toHaveBeenCalled();
    expect(finishBookingSpy).toHaveBeenCalledWith(booking);
    expect(routerSpy).toHaveBeenCalledWith(['/bookings'], {
      queryParams: {
        confirmationCode: booking.confirmationCode,
        checkedOut: true,
      },
    });
  });

  it('can handle user PaymentForm event', () => {
    userService.setUserInfo({
      id: 2,
      role: 'ROLE_USER',
    });
    fixture.detectChanges();
    cartService.cartItems = [{ id: 1 }];
    component.passengersData = {
      passengers: [
        {
          givenName: 'John',
          familyName: 'Smith',
          dob: '1996-10-08',
          gender: 'Male',
          address: 'Texas',
        },
      ],
    };
    const paymentFormData: PaymentFormData = {
      name: 'John Smith',
      stripeToken: 'TOKEN',
    };
    const spy = spyOn<any>(component, 'submitUserBooking');
    component.handlePaymentForm(paymentFormData);
    expect(spy).toHaveBeenCalled();
  });

  it('can handle agentPaymentForm event', () => {
    userService.setUserInfo({
      id: 3,
      role: 'ROLE_AGENT',
    });
    fixture.detectChanges();
    cartService.cartItems = [{ id: 1 }];
    component.passengersData = {
      passengers: [
        {
          givenName: 'John',
          familyName: 'Smith',
          dob: '1996-10-08',
          gender: 'Male',
          address: 'Texas',
        },
      ],
    };
    const paymentFormData: PaymentFormData = {
      name: 'John Smith',
      stripeToken: 'TOKEN',
    };
    const spy = spyOn<any>(component, 'submitAgentBooking');
    component.handlePaymentForm(paymentFormData);
    expect(spy).toHaveBeenCalled();
  });
});
