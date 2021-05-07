import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-flight-seats',
  templateUrl: './flight-seats.component.html',
  styleUrls: ['./flight-seats.component.scss'],
})
export class FlightSeatsComponent implements OnInit {
  @Input() seats: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
