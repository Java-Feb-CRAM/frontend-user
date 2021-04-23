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

class AirportServiceStub {
  getAirport(): Airport {
    return new Airport("JFK", "New York", [], []);
  }
}

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
    let stub = new AirportServiceStub();
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
});