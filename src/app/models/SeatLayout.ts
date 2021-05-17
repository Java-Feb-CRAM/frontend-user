import { AirplaneType } from './AirplaneType';
import { SeatGroup } from './SeatGroup';

export class SeatLayout {
  public id: number;
  public airplaneTypes: AirplaneType[];
  public seatGroups: SeatGroup[];

  constructor(
    id: number,
    airplaneTypes: AirplaneType[],
    seatGroups: SeatGroup[]
  ) {
    this.id = id;
    this.airplaneTypes = airplaneTypes;
    this.seatGroups = seatGroups;
  }
}
