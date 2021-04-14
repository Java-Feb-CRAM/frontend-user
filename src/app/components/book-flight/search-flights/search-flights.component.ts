import { Component } from '@angular/core';
import { Airport } from 'src/app/models/Airport';
import { Flight } from '../../../models/Flight';
import { AirportService } from 'src/app/services/airport.service';
import { FlightService } from '../../../services/flight.service';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

export interface MultiHopFlightPaths {
  orderedMultiHopFlights: Set<Flight[]>
}
export const FOUR_HOURS_MAX = (4*60*60*1000);

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent {
  public airports: Airport[] = [];
  public chosenFlightPathTo: Flight[] = [];
  public chosenFlightPathFrom: Flight[] = [];
  public flightPathsTo: Set<Flight[]> = new Set<Flight[]>();
  public flightPathsFrom: Set<Flight[]> = new Set<Flight[]>();
  public isRoundTrip = false;
  public originAirportIataId = "";
  public destinationAirportIataId = "";
  public isOriginAirportValid = false;
  public isDestinationAirportValid = false;
  public departureDateTo: Date = new Date();
  public departureDateFrom: Date = new Date();
  public stopsTo = 0;
  public stopsFrom = 0;

  public departureTo = 0;
  public departureFrom = 0;

  constructor(
    private readonly flightService: FlightService,
    private readonly airportService: AirportService,
    private readonly cartService: CartService) {
      this.airportService.getAllAirports().subscribe((airports) => this.airports = airports)
    }

  validateOriginAirport(value: string): void {
    const values: string[] = value.split(", ");
    let filteredAirports: Airport[];
    if (values.length > 1)
    {
      filteredAirports = this.airports.filter(v =>
        v.iataId.toLowerCase() === values[1].toLowerCase());
      this.isOriginAirportValid = filteredAirports.length === 1;
    }
    else
    {
      filteredAirports = this.airports.filter(v =>
        v.city.toLowerCase() === value.toLowerCase() ||
        v.iataId.toLowerCase() === value.toLowerCase());
      this.isOriginAirportValid = filteredAirports.length === 1;
    }
    if (this.isOriginAirportValid)
    {
        this.originAirportIataId = filteredAirports[0].iataId;
    }
    this.subscribeFlightsTo();
    if (this.isRoundTrip)
    {
      this.subscribeFlightsFrom();
    }
  }

  validateDestinationAirport(value: string): void {
    const values: string[] = value.split(", ");
    let filteredAirports: Airport[];
    if (values.length > 1) {
      filteredAirports = this.airports.filter(v =>
        v.iataId.toLowerCase() === values[1].toLowerCase());
      this.isDestinationAirportValid = filteredAirports.length === 1;
    } else {
      filteredAirports = this.airports.filter(v =>
        v.city.toLowerCase() === value.toLowerCase() ||
        v.iataId.toLowerCase() === value.toLowerCase());
      this.isDestinationAirportValid = filteredAirports.length === 1;
    }
    if (this.isDestinationAirportValid) {
        this.destinationAirportIataId = filteredAirports[0].iataId;
    }
    this.subscribeFlightsTo();
    if (this.isRoundTrip)
    {
      this.subscribeFlightsFrom();
    }
  }

  subscribeFlightsTo(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid)
    {
      this.flightService.searchFlights(
        this.originAirportIataId, this.destinationAirportIataId,
        this.departureDateTo.getTime()/1000, this.stopsTo).subscribe((value) => this.flightPathsTo = new Set(Array.from(value).sort()));
    }
  }

  subscribeFlightsFrom(): void {
    if (this.isOriginAirportValid && this.isDestinationAirportValid)
    {
      this.flightService.searchFlights(
        this.destinationAirportIataId,this.originAirportIataId,
        this.departureDateFrom.getTime()/1000, this.stopsFrom).subscribe((value) => this.flightPathsFrom = value);
    }
  }

  removeFlightPathTo(): void {
    this.chosenFlightPathTo = [];
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
    this.chosenFlightPathTo.forEach(flight => 
      this.cartService.addToCart({ id: flight.id }));
  }

  addToCartRoundTrip(): void {
    this.chosenFlightPathTo.forEach(flight => 
      this.cartService.addToCart({ id: flight.id }));
    this.chosenFlightPathFrom.forEach(flight => 
      this.cartService.addToCart({ id: flight.id }));
  }

  updateStopsTo(stops: string): void {
    this.stopsTo = +stops;
    this.subscribeFlightsTo();
  }

  updateStopsFrom(stops: string): void {
    this.stopsFrom = +stops;
    this.subscribeFlightsFrom();
  }

  toggleRoundTrip(): void {
    this.isRoundTrip = !this.isRoundTrip;
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        if (term.length < 2) {
          return [];
        }
        else
        {
          const airportMatches: string[] = [];
          this.airports.filter(v =>
            v.city.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
            v.iataId.toLowerCase().indexOf(term.toLowerCase()) > -1)
            .slice(0, 10).forEach( airport =>
              airportMatches.push(`${airport.city}, ${airport.iataId}`)
            )
          return airportMatches
        }
      })
    )

}
