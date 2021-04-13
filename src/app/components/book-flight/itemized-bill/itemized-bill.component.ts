import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FlightService } from '../../../services/flight.service';
import { Flight } from '../../../models/Flight';

const TAX_RATE = 0.0825;

@Component({
  selector: 'app-itemized-bill',
  templateUrl: './itemized-bill.component.html',
  styleUrls: ['./itemized-bill.component.scss'],
})
export class ItemizedBillComponent implements OnInit {
  @Input() passengers = 0;
  flights: Flight[] = [];
  taxRate = TAX_RATE;

  constructor(
    private cartService: CartService,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems.forEach((cartItem) => {
      const flightId = cartItem.id;
      this.flightService.getFlight(flightId).subscribe({
        next: (flight) => {
          this.flights.push(flight);
        },
      });
    });
  }

  get subTotal(): number {
    let sub = 0;
    this.flights.forEach((flight) => {
      sub += flight.seatPrice * this.passengers;
    });
    return sub;
  }

  get tax(): number {
    return TAX_RATE * this.subTotal;
  }

  get grandTotal(): number {
    return this.subTotal + this.tax;
  }
}
