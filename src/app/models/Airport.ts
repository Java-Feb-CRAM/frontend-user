import { Route } from './Route';

export class Airport {
  public iataId: string;
  public city: string;
  public arrivals: Route[];
  public departures: Route[];

  constructor(
    iataId: string,
    city: string,
    arrivals: Route[],
    departures: Route[]
  ) {
    this.iataId = iataId;
    this.city = city;
    this.arrivals = arrivals;
    this.departures = departures;
  }

  get noDelete(): boolean {
    return (
      (this.arrivals && this.arrivals.length > 0) ||
      (this.departures && this.departures.length > 0)
    );
  }
}
