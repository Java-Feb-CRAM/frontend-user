import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public cartService: CartService) {}

  links = [
    {
      to: 'flights',
      name: 'Flights',
    },
    {
      to: 'bookings',
      name: 'Bookings',
    },
  ];
}
