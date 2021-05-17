import { SeatLayout } from './SeatLayout';
import { SeatLocation } from './SeatLocation';
import { SeatColumn } from '../interfaces/SeatColumn';

export class SeatGroup {
  public id: number;
  public seatLayout: SeatLayout;
  public name: string;
  public columns: (SeatColumn | ' ')[];
  public seatLocations: SeatLocation[];
  public minRow: number;
  public maxRow: number;

  constructor(
    id: number,
    seatLayout: SeatLayout,
    name: string,
    columns: string,
    seatLocations: SeatLocation[]
  ) {
    this.id = id;
    this.seatLayout = seatLayout;
    this.name = name;
    // @ts-ignore
    this.columns = columns.split('');
    this.seatLocations = seatLocations;
    let minRow = Number.MAX_SAFE_INTEGER;
    let maxRow = Number.MIN_SAFE_INTEGER;
    seatLocations.forEach((sL) => {
      if (sL.row < minRow) {
        minRow = sL.row;
      }
      if (sL.row > maxRow) {
        maxRow = sL.row;
      }
    });
    this.minRow = minRow;
    this.maxRow = maxRow;
  }
}
