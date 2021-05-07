import {
  Component,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  EventEmitter,
} from '@angular/core';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-seat-picker',
  templateUrl: './seat-picker.component.html',
  styleUrls: ['./seat-picker.component.scss'],
})
export class SeatPickerComponent implements OnInit {
  @Input() seats: any[] = [];
  @Input() seatsToPick = 1;
  selectedSeats: any[] = [];
  @Output() seatSelectionEvent = new EventEmitter();
  constructor() {}

  get selectedSeatCount(): number {
    return this.selectedSeats.length;
  }

  get seatsLeft(): number {
    return this.seatsToPick - this.selectedSeatCount;
  }

  seatSelect(event: any): void {
    if (
      this.selectedSeats.findIndex(
        (seat) => seat.row === event.row && seat.col === event.col
      ) > -1
    ) {
      this.selectedSeats = this.selectedSeats.filter((seat) => {
        return !(seat.col === event.col && seat.row === event.row);
      });
    } else if (this.seatsLeft > 0) {
      this.selectedSeats = [...this.selectedSeats, event];
    }
  }

  ngOnInit(): void {}

  submit(): void {
    this.seatSelectionEvent.emit(this.selectedSeats);
  }
}
