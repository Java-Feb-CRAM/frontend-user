import { Airport } from './Airport';
import { Flight } from './Flight';

export class Route {
  public id: number;
  public originAirport: Airport;
  public destinationAirport: Airport;
  public flights: Flight[];

  constructor(
    id: number,
    originAirport: Airport,
    destinationAirport: Airport,
    flights: Flight[]
  ) {
    this.id = id;
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
    this.flights = flights;
  }

  get prettyRoute(): string {
    return `${this.originAirport.iataId} &rarr; ${this.destinationAirport.iataId}`;
  }

  get noDelete(): boolean {
    return this.flights && this.flights.length > 0;
  }
}
