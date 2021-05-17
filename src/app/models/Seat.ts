import { Flight } from './Flight';
import { Passenger } from './Passenger';

export class Seat {
  public id: number;
  public flight: Flight;
  public row: number;
  public col: string;
  public passenger?: Passenger;

  constructor(
    id: number,
    flight: Flight,
    row: number,
    col: string,
    passenger?: Passenger
  ) {
    this.id = id;
    this.flight = flight;
    this.row = row;
    this.col = col;
    this.passenger = passenger;
  }
}
