import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemizedBillComponent } from './itemized-bill.component';
import { HttpClientModule } from '@angular/common/http';
import { FlightService } from '../../../services/flight.service';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { By } from '@angular/platform-browser';

describe('ItemizedBillComponent', () => {
  let component: ItemizedBillComponent;
  let fixture: ComponentFixture<ItemizedBillComponent>;
  let flight: Flight;
  let cartService: CartService;
  let flightService: FlightService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemizedBillComponent],
      providers: [FlightService, CartService],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemizedBillComponent);
    component = fixture.componentInstance;
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
    cartService = TestBed.get(CartService);
    flightService = TestBed.get(FlightService);
    cartService.cartItems = [{ id: 1 }];
    spyOn(flightService, 'getFlight').and.returnValue(of(flight));
  });

  it('should display each flights route', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p.mb-1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.route.originAirport.iataId);
    expect(el.innerText).toContain(flight.route.destinationAirport.iataId);
  });

  it('should display each flights price', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.text-muted'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.seatPrice.toString());
  });

  it('should display the number of passengers for each flight', () => {
    component.passengers = 5;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.text-muted'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('5 passengers');
  });

  it('should display each flights price * passengers', () => {
    component.passengers = 3;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h6'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain((3 * flight.seatPrice).toString());
  });

  it('should display the subtotal', () => {
    component.passengers = 2;
    cartService.cartItems = [{ id: 1 }, { id: 2 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.subtotal'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain((flight.seatPrice * 2 * 2).toString());
  });

  it('should display the tax', () => {
    component.passengers = 3;
    cartService.cartItems = [{ id: 1 }, { id: 2 }];
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('.tax'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(
      (component.taxRate * (flight.seatPrice * 2 * 3)).toFixed(2)
    );
  });

  it('should display the grand total', () => {
    component.passengers = 1;
    cartService.cartItems = [{ id: 1 }, { id: 2 }];
    fixture.detectChanges();
    const subTotal = flight.seatPrice * 2;
    const tax = component.taxRate * subTotal;
    const grandTotal = subTotal + tax;
    const de = fixture.debugElement.query(By.css('h5'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(grandTotal.toFixed(2));
  });
});
