import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FlightsPageComponent } from './pages/flights-page/flights-page.component';
import { BookingsPageComponent } from './pages/bookings-page/bookings-page.component';
import { BookFlightPageComponent } from './pages/book-flight-page/book-flight-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPageComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: BookFlightPageComponent,
  },
  {
    path: 'flights',
    component: FlightsPageComponent,
  },
  {
    path: 'bookings',
    component: BookingsPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
