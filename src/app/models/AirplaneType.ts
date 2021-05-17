import { Airplane } from './Airplane';
import { SeatLayout } from './SeatLayout';

export class AirplaneType {
  public id: number;
  public maxCapacity: number;
  public airplanes: Airplane[];
  public seatLayout: SeatLayout;

  constructor(
    id: number,
    maxCapacity: number,
    airplanes: Airplane[],
    seatLayout: SeatLayout
  ) {
    this.id = id;
    this.maxCapacity = maxCapacity;
    this.airplanes = airplanes;
    this.seatLayout = seatLayout;
  }

  get noDelete(): boolean {
    return this.airplanes && this.airplanes.length > 0;
  }
}
