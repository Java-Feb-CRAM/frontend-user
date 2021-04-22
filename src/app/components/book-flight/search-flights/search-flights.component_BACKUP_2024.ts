import { Component } from '@angular/core';
import { Airport } from 'src/app/models/Airport';
import { Flight } from '../../../models/Flight';
import { AirportService } from 'src/app/services/airport.service';
import { FlightService } from '../../../services/flight.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

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
  public originAirportIataId = "";
  public destinationAirportIataId = "";
  public departureDateStringTo = "";
  public departureDateStringFrom = "";
  public dateRangeStartTo: Date = new Date();
  public dateRangeEndTo: Date = new Date();
  public dateRangeStartFrom: Date = new Date();
  public dateRangeEndFrom: Date = new Date();
  public stopsTo = 0;
  public stopsFrom = 0;
  public currentPage = 0;
  public departureTo = 0;
  public departureFrom = 0;
  public chosenFlightPathToPages = 0;
  public page = 1;
  public pageSize = 5;
  public returnPage = 1;
  public returnPageSize = 5;

  constructor(
    private readonly flightService: FlightService,
    private readonly airportService: AirportService,
    private readonly cartService: CartService) {
    this.airportService.getAllAirports().subscribe((airports) => this.airports = airports)
  }

  getArrayOfFlightPaths(flightPaths: Set<Flight[]>): Flight[][] {
    return Array.from(flightPaths);
  }

  validateOriginAirport(value: string): void {
    const values: string[] = value.split(', ');
    let filteredAirports: Airport[];
    if (values.length > 1) {
      filteredAirports = this.airports.filter(v =>
        v.iataId.toLowerCase() === values[1].toLowerCase());
      this.isOriginAirportValid = filteredAirports.length === 1;
    }
    else {
      filteredAirports = this.airports.filter(v =>
        v.city.toLowerCase() === value.toLowerCase() ||
        v.iataId.toLowerCase() === value.toLowerCase());
      this.isOriginAirportValid = filteredAirports.length === 1;
    }
    if (this.isOriginAirportValid) {
      this.originAirportIataId = filteredAirports[0].iataId;
    }
    let dateNow = new Date();
    if (dateNow < this.dateRangeStartTo && dateNow < this.dateRangeEndTo && this.dateRangeStartTo < this.dateRangeEndTo) {
      this.subscribeFlightsTo();
    }
    if (this.isRoundTrip && this.dateRangeEndTo < this.dateRangeStartFrom && this.dateRangeEndTo < this.dateRangeEndFrom && this.dateRangeStartFrom < this.dateRangeEndFrom) {
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
    let dateNow = new Date();
    if (dateNow < this.dateRangeStartTo && dateNow < this.dateRangeEndTo && this.dateRangeStartTo < this.dateRangeEndTo) {
      this.subscribeFlightsTo();
    }
    if (this.isRoundTrip && this.dateRangeEndTo < this.dateRangeStartFrom && this.dateRangeEndTo < this.dateRangeEndFrom && this.dateRangeStartFrom < this.dateRangeEndFrom) {
      this.subscribeFlightsFrom();
    }
  }

  subscribeFlightsTo(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid) {
      this.flightService.searchFlights(
        this.originAirportIataId, this.destinationAirportIataId,
        this.dateRangeStartTo.getTime() / 1000, this.dateRangeEndTo.getTime() / 1000,
        this.stopsTo).subscribe((value) => this.flightPathsTo = new Set(Array.from(value).sort()));
    }
  }

  subscribeFlightsFrom(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid) {
      this.flightService.searchFlights(
        this.destinationAirportIataId, this.originAirportIataId,
        this.dateRangeStartFrom.getTime() / 1000, this.dateRangeEndFrom.getTime() / 1000,
        this.stopsFrom).subscribe((value) => this.flightPathsFrom = value);
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
  }

  addToCartRoundTrip(): void {
    this.chosenFlightPathTo.forEach((flight) =>
      this.cartService.addToCart({ id: flight.id })
    );
    this.chosenFlightPathFrom.forEach((flight) =>
      this.cartService.addToCart({ id: flight.id })
    );
  }

  updateStopsTo(stops: string): void {
    this.stopsTo = +stops;
    this.subscribeFlightsTo();
  }

  updateStopsFrom(stops: string): void {
    this.stopsFrom = +stops;
    this.subscribeFlightsFrom();
  }

  getDateFromNow(): Date {
    return new Date();
  }

  updateDepartureDateStringTo(hasStart: boolean, hasEnd: boolean): void {
    let dateStartTo = "";
    let dateEndTo = "";
    if (hasStart) {
      let month = this.dateRangeStartTo.getMonth() + 1;
      let date = this.dateRangeStartTo.getDate();
      let year = this.dateRangeStartTo.getFullYear();
      dateStartTo = `${month}/${date}/${year}`;
    }
    if (hasEnd) {
      let month = this.dateRangeEndTo.getMonth() + 1;
      let date = this.dateRangeEndTo.getDate();
      let year = this.dateRangeEndTo.getFullYear();
      dateEndTo = `${month}/${date}/${year}`;
    }
    this.departureDateStringTo = `${dateStartTo} -> ${dateEndTo}`;
  }

  updateDepartureDateStringFrom(hasStart: boolean, hasEnd: boolean): void {
    let dateStartFrom = "";
    let dateEndFrom = "";
    if (hasStart) {
      let month = this.dateRangeStartFrom.getMonth() + 1;
      let date = this.dateRangeStartFrom.getDate();
      let year = this.dateRangeStartFrom.getFullYear();
      dateStartFrom = `${month}/${date}/${year}`;
    }
    if (hasEnd) {
      let month = this.dateRangeEndFrom.getMonth() + 1;
      let date = this.dateRangeEndFrom.getDate();
      let year = this.dateRangeEndFrom.getFullYear();
      dateEndFrom = `${month}/${date}/${year}`;
    }
    this.departureDateStringFrom = `${dateStartFrom} -> ${dateEndFrom}`;
  }

  departureDateRangeStartTo(dateString: string): void {
    let newDate = new Date(dateString);
    this.dateRangeStartTo = newDate;
    if ((new Date()) < newDate) {
      if (this.dateRangeStartTo < newDate) {
        this.updateDepartureDateStringTo(true, true);
        this.subscribeFlightsTo();
      } else {
        this.updateDepartureDateStringTo(true, false);
      }
    }
  }
  departureDateRangeEndTo(dateString: string): void {
    let newDate = new Date(dateString);
    this.dateRangeEndTo = newDate;
    if ((new Date()) < newDate) {
      if (this.dateRangeStartTo < newDate) {
        this.updateDepartureDateStringTo(true, true);
        this.subscribeFlightsTo();
      } else {
        this.updateDepartureDateStringTo(false, true);
      }
    }
  }

  departureDateRangeStartFrom(dateString: string): void {
    let newDate = new Date(dateString);
    this.dateRangeStartFrom = newDate;
    if ((new Date()) < newDate) {
      if (this.dateRangeStartFrom < newDate) {
        this.updateDepartureDateStringFrom(true, true);
        this.subscribeFlightsFrom();
      } else {
        this.updateDepartureDateStringFrom(true, false);
      }
    }
  }
  departureDateRangeEndFrom(dateString: string): void {
    let newDate = new Date(dateString);
    this.dateRangeEndFrom = newDate;
    if ((new Date()) < newDate) {
      if (this.dateRangeStartFrom < newDate) {
        this.updateDepartureDateStringFrom(true, true);
        this.subscribeFlightsFrom();
      } else {
        this.updateDepartureDateStringFrom(false, true);
      }
    }
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
        }
        else {
          const airportMatches: string[] = [];
          this.airports.filter(v =>
            v.city.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            v.iataId.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10).forEach(airport =>
              airportMatches.push(`${airport.city}, ${airport.iataId}`)
            );
          return airportMatches;
        }
      })
    );
}
