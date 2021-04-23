import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchFlightsComponent } from './search-flights.component';
import { FlightService } from '../../../services/flight.service';
import { CartService } from '../../../services/cart.service';
import { AirportService } from '../../../services/airport.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
});