import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { FlightService } from '../../../services/flight.service';
import { Flight } from '../../../models/Flight';

const TAX_RATE = 0.0825;

@Component({
  selector: 'app-itemized-bill',
  templateUrl: './itemized-bill.component.html',
  styleUrls: ['./itemized-bill.component.scss'],
})
export class ItemizedBillComponent implements OnInit, OnChanges {
  @Input() passengers: Date[] = [];
  flights: Flight[] = [];
  taxRate = TAX_RATE;
  regularPassengers: Date[] = [];
  childPassengers: Date[] = [];
  elderlyPassengers: Date[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly flightService: FlightService
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
    this.calculateAges();
  }

  calculateAges(): void {
    const now = new Date();
    this.regularPassengers = this.passengers.filter(
      (p) =>
        now.getFullYear() - p.getFullYear() > 12 &&
        now.getFullYear() - p.getFullYear() < 65
    );
    this.childPassengers = this.passengers.filter(
      (p) => now.getFullYear() - p.getFullYear() <= 12
    );
    this.elderlyPassengers = this.passengers.filter(
      (p) => now.getFullYear() - p.getFullYear() >= 65
    );
  }

  get subTotal(): number {
    let sub = 0;

    this.flights.forEach((flight) => {
      if (this.regularPassengers.length > 0) {
        sub += flight.seatPrice * this.regularPassengers.length;
      }
      if (this.childPassengers.length > 0) {
        const percentOff = flight.seatPrice * 0.2;
        sub += (flight.seatPrice - percentOff) * this.childPassengers.length;
      }
      if (this.elderlyPassengers.length > 0) {
        const percentOff = flight.seatPrice * 0.2;
        sub += (flight.seatPrice - percentOff) * this.elderlyPassengers.length;
      }
    });
    return sub;
  }

  get tax(): number {
    return TAX_RATE * this.subTotal;
  }

  get grandTotal(): number {
    return this.subTotal + this.tax;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateAges();
  }
}
