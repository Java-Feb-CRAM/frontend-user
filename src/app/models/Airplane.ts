import { AirplaneType } from './AirplaneType';
import { Flight } from './Flight';

export class Airplane {
  public id: number;
  public airplaneType: AirplaneType;
  public flights: Flight[];
  constructor(id: number, airplaneType: AirplaneType, flights: Flight[]) {
    this.id = id;
    this.airplaneType = airplaneType;
    this.flights = flights;
  }

  get noDelete(): boolean {
    return this.flights && this.flights.length > 0;
  }
}
