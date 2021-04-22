import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { CartService } from '../../services/cart.service';
import { FlightService } from '../../services/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Flight } from '../../models/Flight';
import { Route } from '../../models/Route';
import { Airport } from '../../models/Airport';
import { Airplane } from '../../models/Airplane';
import { AirplaneType } from '../../models/AirplaneType';
import { DatePipe } from '@angular/common';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartService: CartService;
  let flightService: FlightService;
  let flight: Flight;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPageComponent],
      providers: [CartService, FlightService],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    cartService = TestBed.get(CartService);
    flightService = TestBed.get(FlightService);
    flight = new Flight(
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
    spyOn(flightService, 'getFlight').and.returnValue(of(flight));
  });

  it('should not show any flights when the cart is empty', () => {
    cartService.cartItems = [];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('do not have any items');
  });

  it('should show flights route', () => {
    cartService.cartItems = [{ id: 1 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.justify-content-between > div')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.route.originAirport.iataId);
    expect(el.innerText).toContain(flight.route.destinationAirport.iataId);
  });

  it('should show flights departure time', () => {
    cartService.cartItems = [{ id: 1 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.justify-content-between > div > span')
    );
    const el: HTMLElement = de.nativeElement;
    const pipe = new DatePipe('en-US');
    const transformed =
      pipe.transform(flight.departureTime, 'short') ||
      flight.departureTime.toISOString();
    expect(el.innerText).toContain(transformed);
  });

  it('should show flights seat price', () => {
    cartService.cartItems = [{ id: 1 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('.justify-content-between > div ~ div')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.seatPrice.toFixed(2));
  });

  it('should remove flight from cart when clicking on the remove flight button', () => {
    cartService.cartItems = [{ id: 1 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-danger'));
    const spy = spyOn(cartService, 'removeFromCart');
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
    expect(component.flights.length).toBe(0);
  });

  it('should display the total number of items in the cart', () => {
    cartService.cartItems = [{ id: 1 }, { id: 2 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.btn-success'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('2');
  });
});
