import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  name = "";
  isLoggedIn = false;
  constructor(public userService: UserService, public cartService: CartService) {
    this.name = this.userService.user.name
    this.isLoggedIn = this.userService.isLoggedIn
  }

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

  logout(): void {
    this.userService.logout()
  }
}
