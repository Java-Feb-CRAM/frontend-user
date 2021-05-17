import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Seat } from '../../../models/Seat';
import { SeatLayout } from '../../../models/SeatLayout';

@Component({
  selector: 'app-flight-seats',
  templateUrl: './flight-seats.component.html',
  styleUrls: ['./flight-seats.component.scss'],
})
export class FlightSeatsComponent implements OnInit {
  @Input() seats: Seat[] = [];
  @Input() seatLayout: SeatLayout | undefined;
  @Input() selectedSeats: any[] = [];
  @Output() seatSelectEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    if (this.seatLayout?.seatGroups) {
      this.seatLayout.seatGroups = this.seatLayout.seatGroups.sort(
        (a, b) => a.minRow - b.minRow
      );
    }
  }
}
