import { Component, Input, OnInit } from '@angular/core';
import { SeatColumn } from '../../../interfaces/SeatColumn';

@Component({
  selector: 'app-class-seats',
  templateUrl: './class-seats.component.html',
  styleUrls: ['./class-seats.component.scss'],
})
export class ClassSeatsComponent implements OnInit {
  @Input() seatingClass = '';
  @Input() seats: any[] = [];
  @Input() minRow = 1;
  @Input() maxRow = 1;
  @Input() cols: (SeatColumn | ' ')[] = [];

  rows: number[] = [];
  constructor() {}

  getSeat(row: number, col: any): any {
    return this.seats.find((seat) => seat.row === row && seat.column === col);
  }

  rowHasSeats(row: number): boolean {
    return this.seats.filter((seat) => seat.row === row).length > 0;
  }

  ngOnInit(): void {
    for (let i = this.minRow; i <= this.maxRow; i++) {
      this.rows.push(i);
    }
  }
}
