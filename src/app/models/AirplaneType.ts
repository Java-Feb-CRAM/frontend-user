import { Airplane } from './Airplane';

export class AirplaneType {
  public id: number;
  public maxCapacity: number;
  public airplanes: Airplane[];

  constructor(id: number, maxCapacity: number, airplanes: Airplane[]) {
    this.id = id;
    this.maxCapacity = maxCapacity;
    this.airplanes = airplanes;
  }

  get noDelete(): boolean {
    return this.airplanes && this.airplanes.length > 0;
  }
}
