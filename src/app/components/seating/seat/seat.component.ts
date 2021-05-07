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

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
})
export class SeatComponent implements OnInit {
  @Input() column: SeatColumn = 'A';
  @Input() row = 1;
  @Input() occupied = false;
  @Input() width = 1;
  @Input() height = 1;
  @Output() seatSelectEvent = new EventEmitter();
  @Input() selected = false;
  constructor() {}

  ngOnInit(): void {}

  select(): void {
    this.seatSelectEvent.emit({ row: this.row, col: this.column });
  }
}
