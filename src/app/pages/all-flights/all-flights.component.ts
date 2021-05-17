import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/Flight';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-all-flights',
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.scss'],
})
export class AllFlightsComponent implements OnInit {
  constructor(
    private readonly flightService: FlightService,
    private cartService: CartService
  ) {}
  flights: Flight[] = [];
  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((f) => (this.flights = f));
  }

  addToCart(id: number): void {
    this.cartService.addToCart({ id });
  }
}
