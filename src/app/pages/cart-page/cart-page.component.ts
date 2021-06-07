import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/Flight';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(
    public cartService: CartService,
    private readonly flightService: FlightService
  ) {}

  flightIds: number[] = [];
  flights: Flight[] = [];

  ngOnInit(): void {
    this.flightIds = this.cartService.cartItems.map((cartItem) => cartItem.id);
    this.flightIds.forEach((flightId) => {
      this.flightService.getFlight(flightId).subscribe((flight) => {
        this.flights.push(flight);
      });
    });
  }

  remove(flightId: number): void {
    this.cartService.removeFromCart({ id: flightId });
    this.flights = this.flights.filter((flight) => flight.id !== flightId);
  }
}
