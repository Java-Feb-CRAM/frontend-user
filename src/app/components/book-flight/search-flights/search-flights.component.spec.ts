import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchFlightsComponent } from './search-flights.component';
import { FlightService } from '../../../services/flight.service';
import { CartService } from '../../../services/cart.service';
import { AirportService } from '../../../services/airport.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Airport } from 'src/app/models/Airport';
import { NgbDatepickerModule, NgbInputDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

describe('SearchFlightsComponent', () => {
  let component: SearchFlightsComponent;
  let fixture: ComponentFixture<SearchFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFlightsComponent],
      providers: [AirportService, FlightService, CartService],
      imports: [RouterModule.forRoot([]), NgbModule, HttpClientModule, NgbDatepickerModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFlightsComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should validate origin and destination airports', () => {
    let searchFlights = new SearchFlightsComponent(TestBed.inject(FlightService), TestBed.inject(AirportService), TestBed.inject(CartService));
    searchFlights.airports.push(new Airport("JFK", "New York", [], []));
    searchFlights.validateOriginAirport("Atlanta");
    expect(searchFlights.isOriginAirportValid).toBe(false, 'Atlanta invalid');
    searchFlights.validateOriginAirport("JFK");
    expect(searchFlights.isOriginAirportValid).toBe(true, 'JFK validated');
    searchFlights.validateDestinationAirport("AAA");
    expect(searchFlights.isDestinationAirportValid).toBe(false, 'AAA invalid');
    searchFlights.validateDestinationAirport("new york");
    expect(searchFlights.isDestinationAirportValid).toBe(true, 'new york validated');
  });

  it('should display the date in the textbox when a valid date is chosen', fakeAsync(() => {
    const dateNow = new Date();
    let dateBefore: Date;
    let month = "";
    let day = "";
    let year = 0;
    let hiddenInput: HTMLInputElement;
    let datePickers = fixture.debugElement.queryAll(By.directive(NgbInputDatepicker));
    let datePicker = datePickers[0].injector.get(NgbInputDatepicker);

    hiddenInput = fixture.debugElement.query(By.css('#departureStartToId')).nativeElement;
    (fixture.debugElement.query(By.css('#departureDateStartIdToButton')).nativeElement as HTMLElement).click();
    tick();
    expect(datePicker.isOpen()).toBe(true);
    (fixture.debugElement.query(By.css('.ngb-dp-today')).nativeElement as HTMLElement).click();
    tick();
    expect(datePicker.isOpen()).toBe(false);
    month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    day = ("0" + dateNow.getDate()).slice(-2);
    year = dateNow.getFullYear();
    expect(hiddenInput.value).toContain(`${year}-${month}-${day}`);

    datePicker = datePickers[1].injector.get(NgbInputDatepicker);
    hiddenInput = fixture.debugElement.query(By.css('#departureEndToId')).nativeElement;
    (fixture.debugElement.query(By.css('#departureDateEndIdToButton')).nativeElement as HTMLElement).click();
    tick();
    expect(datePicker.isOpen()).toBe(true);
    (fixture.debugElement.query(By.css('.ngb-dp-today')).nativeElement as HTMLElement).click();
    tick();
    expect(datePicker.isOpen()).toBe(false);
    month = ("0" + (dateNow.getMonth() + 1)).slice(-2);
    day = ("0" + dateNow.getDate()).slice(-2);
    year = dateNow.getFullYear();
    expect(hiddenInput.value).toContain(`${year}-${month}-${day}`);
  }));
});