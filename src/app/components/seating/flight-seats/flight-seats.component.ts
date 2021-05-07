import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-flight-seats',
  templateUrl: './flight-seats.component.html',
  styleUrls: ['./flight-seats.component.scss'],
})
export class FlightSeatsComponent implements OnInit {
  @Input() seats: any[] = [];
  @Input() selectedSeats: any[] = [];
  @Output() seatSelectEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
