import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/Flight';
import { FlightService } from '../../services/flight.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-flights-page',
  templateUrl: './flights-page.component.html',
  styleUrls: ['./flights-page.component.scss'],
})
export class FlightsPageComponent implements OnInit {
  flights: Flight[] = [];
  constructor(
    private flightService: FlightService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.flightService
      .getAllFlights()
      .subscribe((data) => (this.flights = data));
  }
}
