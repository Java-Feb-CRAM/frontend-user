import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SeatColumn } from '../../../interfaces/SeatColumn';
import { SeatLocation } from '../../../models/SeatLocation';
import { Seat } from '../../../models/Seat';

@Component({
  selector: 'app-class-seats',
  templateUrl: './class-seats.component.html',
  styleUrls: ['./class-seats.component.scss'],
})
export class ClassSeatsComponent implements OnInit {
  @Input() seatingClass = '';
  @Input() seats: Seat[] = [];
  @Input() seatLocations: SeatLocation[] = [];
  @Input() minRow = 1;
  @Input() maxRow = 1;
  @Input() cols: (SeatColumn | ' ')[] = [];
  @Output() seatSelectEvent = new EventEmitter();
  @Input() selectedSeats: any[] = [];

  rows: number[] = [];
  constructor() {}

  isSelected(row: number, col: any): boolean {
    return (
      this.selectedSeats.findIndex(
        (seat) => seat.row === row && seat.col === col
      ) > -1
    );
  }

  getSeat(row: number, col: any): Seat | undefined {
    return this.seats.find((seat) => seat.row === row && seat.col === col);
  }

  getSeatLocation(row: number, col: any): SeatLocation | undefined {
    return this.seatLocations.find(
      (seat) => seat.row === row && seat.col === col
    );
  }

  rowHasSeats(row: number): boolean {
    return this.seatLocations.filter((seat) => seat.row === row).length > 0;
  }

  ngOnInit(): void {
    for (let i = this.minRow; i <= this.maxRow; i++) {
      this.rows.push(i);
      console.log(this.rows);
    }
  }
}
