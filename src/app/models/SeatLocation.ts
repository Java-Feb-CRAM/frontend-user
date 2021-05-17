import { SeatGroup } from './SeatGroup';
import { SeatColumn } from '../interfaces/SeatColumn';

export class SeatLocation {
  public id: number;
  public seatGroup: SeatGroup;
  public width: number;
  public height: number;
  public col: SeatColumn | ' ';
  public row: number;

  constructor(
    id: number,
    seatGroup: SeatGroup,
    width: number,
    height: number,
    col: SeatColumn | ' ',
    row: number
  ) {
    this.id = id;
    this.seatGroup = seatGroup;
    this.width = width;
    this.height = height;
    this.col = col;
    this.row = row;
  }
}
