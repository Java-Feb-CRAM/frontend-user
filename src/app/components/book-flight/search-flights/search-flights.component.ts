import { Component } from '@angular/core';
import { Airport } from 'src/app/models/Airport';
import { Flight } from '../../../models/Flight';
import { AirportService } from 'src/app/services/airport.service';
import { FlightService } from '../../../services/flight.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface MultiHopFlightPaths {
  orderedMultiHopFlights: Set<Flight[]>;
}
export const FOUR_HOURS_MAX = 4 * 60 * 60 * 1000;

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss'],
})
export class SearchFlightsComponent {
  public airports: Airport[] = [];
  public chosenFlightPathTo: Flight[] = [];
  public chosenFlightPathFrom: Flight[] = [];
  public flightPathsTo: Set<Flight[]> = new Set<Flight[]>();
  public flightPathsFrom: Set<Flight[]> = new Set<Flight[]>();
  public isRoundTrip = false;
  public isOriginAirportValid = false;
  public isDestinationAirportValid = false;
  public addedToCart = false;
  public searchingTo = false;
  public searchingFrom = false;
  public originAirportIataId = "";
  public destinationAirportIataId = "";
  public departureDateStringTo = "";
  public departureDateStringFrom = "";
  public dateRangeStartTo: Date = new Date(Date.UTC(1970, 1, 1, 0, 0, 0, 0));
  public dateRangeEndTo: Date = new Date();
  public dateRangeStartFrom: Date = new Date();
  public dateRangeEndFrom: Date = new Date();
  public stopsTo = 0;
  public stopsFrom = 0;
  public departureTo = 0;
  public departureFrom = 0;
  public page = 1;
  public pageSize = 5;
  public returnPage = 1;
  public returnPageSize = 5;

  constructor(
    private readonly flightService: FlightService,
    private readonly airportService: AirportService,
    private readonly cartService: CartService
  ) {
    this.airportService
      .getAllAirports()
      .subscribe((airports) => (this.airports = airports));
  }

  getArrayOfFlightPaths(flightPaths: Set<Flight[]>): Flight[][] {
    return Array.from(flightPaths);
  }

  validateOriginAirport(value: string): void {
    const values: string[] = value.split(', ');
    let filteredAirports: Airport[];
    if (values.length > 1) {
      filteredAirports = this.airports.filter(
        (v) => v.iataId.toLowerCase() === values[1].toLowerCase()
      );
      this.isOriginAirportValid = filteredAirports.length === 1;
    } else {
      filteredAirports = this.airports.filter(
        (v) =>
          v.city.toLowerCase() === value.toLowerCase() ||
          v.iataId.toLowerCase() === value.toLowerCase()
      );
      this.isOriginAirportValid = filteredAirports.length === 1;
    }
    if (this.isOriginAirportValid) {
      this.originAirportIataId = filteredAirports[0].iataId;
    }
    const dateNow = new Date();
    if (
      dateNow < this.dateRangeStartTo &&
      dateNow < this.dateRangeEndTo &&
      this.dateRangeStartTo < this.dateRangeEndTo
    ) {
      this.subscribeFlightsTo();
    }
    if (
      this.isRoundTrip &&
      this.dateRangeEndTo < this.dateRangeStartFrom &&
      this.dateRangeEndTo < this.dateRangeEndFrom &&
      this.dateRangeStartFrom < this.dateRangeEndFrom
    ) {
      this.subscribeFlightsFrom();
    }
  }

  validateDestinationAirport(value: string): void {
    const values: string[] = value.split(', ');
    let filteredAirports: Airport[];
    if (values.length > 1) {
      filteredAirports = this.airports.filter(
        (v) => v.iataId.toLowerCase() === values[1].toLowerCase()
      );
      this.isDestinationAirportValid = filteredAirports.length === 1;
    } else {
      filteredAirports = this.airports.filter(
        (v) =>
          v.city.toLowerCase() === value.toLowerCase() ||
          v.iataId.toLowerCase() === value.toLowerCase()
      );
      this.isDestinationAirportValid = filteredAirports.length === 1;
    }
    if (this.isDestinationAirportValid) {
      this.destinationAirportIataId = filteredAirports[0].iataId;
    }
    const dateNow = new Date();
    if (
      dateNow < this.dateRangeStartTo &&
      dateNow < this.dateRangeEndTo &&
      this.dateRangeStartTo < this.dateRangeEndTo
    ) {
      this.subscribeFlightsTo();
    }
    if (
      this.isRoundTrip &&
      this.dateRangeEndTo < this.dateRangeStartFrom &&
      this.dateRangeEndTo < this.dateRangeEndFrom &&
      this.dateRangeStartFrom < this.dateRangeEndFrom
    ) {
      this.subscribeFlightsFrom();
    }
  }

  subscribeFlightsTo(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid) {
      this.searchingTo = true;
      this.page = 1;
      this.flightService.searchFlights(
        this.originAirportIataId, this.destinationAirportIataId,
        this.dateRangeStartTo.getTime() / 1000, this.dateRangeEndTo.getTime() / 1000,
        this.stopsTo).subscribe((value) => {
          this.searchingTo = false;
          this.flightPathsTo = new Set(Array.from(value).sort());
        });
    }
  }

  subscribeFlightsFrom(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid) {
      this.searchingFrom = true;
      this.returnPage = 1;
      this.flightService.searchFlights(
        this.destinationAirportIataId, this.originAirportIataId,
        this.dateRangeStartFrom.getTime() / 1000, this.dateRangeEndFrom.getTime() / 1000,
        this.stopsFrom).subscribe((value) => {
          this.searchingFrom = false;
          this.flightPathsFrom = new Set(Array.from(value).sort())
        });
    }
  }

  removeFlightPathTo(): void {
    this.chosenFlightPathTo = [];
    this.isRoundTrip = false;
  }

  removeFlightPathFrom(): void {
    this.chosenFlightPathFrom = [];
  }

  addFlightPathTo(flights: Flight[]): void {
    this.chosenFlightPathTo = flights;
  }

  addFlightPathFrom(flights: Flight[]): void {
    this.chosenFlightPathFrom = flights;
  }

  addToCart(): void {
    this.chosenFlightPathTo.forEach((flight) =>
      this.cartService.addToCart({ id: flight.id })
    );
    this.addedToCart = true;
  }

  addToCartRoundTrip(): void {
    this.chosenFlightPathTo.forEach((flight) =>
      this.cartService.addToCart({ id: flight.id })
    );
    this.chosenFlightPathFrom.forEach((flight) =>
      this.cartService.addToCart({ id: flight.id })
    );
    this.addedToCart = true;
  }

  updateStopsTo(stops: string): void {
    this.stopsTo = +stops;
    this.subscribeFlightsTo();
  }

  updateStopsFrom(stops: string): void {
    this.stopsFrom = +stops;
    this.subscribeFlightsFrom();
  }

  updateDepartureDateStringTo(hasStart: boolean, hasEnd: boolean): void {
    let dateStartTo = '';
    let dateEndTo = '';
    if (hasStart) {
      const month = this.dateRangeStartTo.getMonth() + 1;
      const date = this.dateRangeStartTo.getDate();
      const year = this.dateRangeStartTo.getFullYear();
      dateStartTo = `${month}/${date}/${year}`;
    }
    if (hasEnd) {
      const month = this.dateRangeEndTo.getMonth() + 1;
      const date = this.dateRangeEndTo.getDate();
      const year = this.dateRangeEndTo.getFullYear();
      dateEndTo = `${month}/${date}/${year}`;
    }
    this.departureDateStringTo = `${dateStartTo} → ${dateEndTo}`;
  }

  updateDepartureDateStringFrom(hasStart: boolean, hasEnd: boolean): void {
    let dateStartFrom = '';
    let dateEndFrom = '';
    if (hasStart) {
      const month = this.dateRangeStartFrom.getMonth() + 1;
      const date = this.dateRangeStartFrom.getDate();
      const year = this.dateRangeStartFrom.getFullYear();
      dateStartFrom = `${month}/${date}/${year}`;
    }
    if (hasEnd) {
      const month = this.dateRangeEndFrom.getMonth() + 1;
      const date = this.dateRangeEndFrom.getDate();
      const year = this.dateRangeEndFrom.getFullYear();
      dateEndFrom = `${month}/${date}/${year}`;
    }
    this.departureDateStringFrom = `${dateStartFrom} → ${dateEndFrom}`;
  }

  getZeroedTimeDate(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
  }

  getMinDateNow(): NgbDate {
    const date = this.getZeroedTimeDate(new Date());
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  getMinDate(date: Date): NgbDate {
    date = this.getZeroedTimeDate(date);
    return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  }

  getDayAfterDate(date: Date): Date {
    date = this.getZeroedTimeDate(date);
    return new Date(date.setDate(date.getDate() + 1));
  }

  departureDateRangeStartTo(dateString: string): void {
    const thisDate = this.getZeroedTimeDate(new Date(dateString));
    const today = this.getZeroedTimeDate(new Date());
    this.dateRangeStartTo = thisDate;
    if (today <= thisDate) {
      if (this.dateRangeEndTo >= thisDate) {
        this.updateDepartureDateStringTo(true, true);
        this.subscribeFlightsTo();
      } else {
        this.updateDepartureDateStringTo(true, false);
      }
    }
  }
  departureDateRangeEndTo(dateString: string): void {
    const thisDate = this.getZeroedTimeDate(new Date(dateString));
    const today = this.getZeroedTimeDate(new Date());
    this.dateRangeEndTo = thisDate;
    if (today <= thisDate) {
      if (this.dateRangeStartTo <= thisDate) {
        this.updateDepartureDateStringTo(true, true);
        this.subscribeFlightsTo();
      } else {
        this.updateDepartureDateStringTo(false, true);
      }
    }
  }

  departureDateRangeStartFrom(dateString: string): void {
    const thisDate = this.getZeroedTimeDate(new Date(dateString));
    const today = this.getZeroedTimeDate(new Date());
    this.dateRangeStartFrom = thisDate;
    if (today <= thisDate) {
      if (this.dateRangeEndFrom >= thisDate) {
        this.updateDepartureDateStringFrom(true, true);
        this.subscribeFlightsFrom();
      } else {
        this.updateDepartureDateStringFrom(true, false);
      }
    }
  }
  departureDateRangeEndFrom(dateString: string): void {
    const thisDate = this.getZeroedTimeDate(new Date(dateString));
    const today = this.getZeroedTimeDate(new Date());
    this.dateRangeEndFrom = thisDate;
    if (today <= thisDate) {
      if (this.dateRangeStartFrom <= thisDate) {
        this.updateDepartureDateStringFrom(true, true);
        this.subscribeFlightsFrom();
      } else {
        this.updateDepartureDateStringFrom(false, true);
      }
    }
  }

  resetSearch(): void {
    this.airports = [];
    this.chosenFlightPathTo = [];
    this.chosenFlightPathFrom = [];
    this.flightPathsTo = new Set<Flight[]>();
    this.flightPathsFrom = new Set<Flight[]>();
    this.isRoundTrip = false;
    this.isOriginAirportValid = false;
    this.isDestinationAirportValid = false;
    this.addedToCart = false;
    this.originAirportIataId = '';
    this.destinationAirportIataId = '';
    this.departureDateStringTo = '';
    this.departureDateStringFrom = '';
    this.dateRangeStartTo = new Date(Date.UTC(1970, 1, 1, 0, 0, 0, 0));
    this.dateRangeEndTo = new Date();
    this.dateRangeStartFrom = new Date();
    this.dateRangeEndFrom = new Date();
    this.stopsTo = 0;
    this.stopsFrom = 0;
    this.departureTo = 0;
    this.departureFrom = 0;
    this.page = 1;
    this.pageSize = 5;
    this.returnPage = 1;
    this.returnPageSize = 5;
  }

  toggleRoundTrip(): void {
    this.isRoundTrip = !this.isRoundTrip;
  }

  search: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) => {
        if (term.length < 2) {
          return [];
        } else {
          const airportMatches: string[] = [];
          this.airports
            .filter(
              (v) =>
                v.city.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                v.iataId.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
            .slice(0, 10)
            .forEach((airport) =>
              airportMatches.push(`${airport.city}, ${airport.iataId}`)
            );
          return airportMatches;
        }
      })
    );
}
