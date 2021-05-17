import { Airplane } from './Airplane';
import { Route } from './Route';
import { Booking } from './Booking';
import { Seat } from './Seat';

export class Flight {
  public id: number;
  public route: Route;
  public airplane: Airplane;
  public departureTime: Date;
  public reservedSeats: number;
  public seatPrice: number;
  public bookings: Booking[];
  public seats: Seat[];
  public availableSeats: number;
  public totalSeats: number;

  constructor(
    id: number,
    route: Route,
    airplane: Airplane,
    departureTime: Date,
    reservedSeats: number,
    seatPrice: number,
    bookings: Booking[],
    seats: Seat[],
    availableSeats: number,
    totalSeats: number
  ) {
    this.id = id;
    this.route = route;
    this.airplane = airplane;
    this.departureTime = new Date(departureTime);
    this.reservedSeats = reservedSeats;
    this.seatPrice = seatPrice;
    this.bookings = bookings;
    this.seats = seats;
    this.availableSeats = availableSeats;
    this.totalSeats = totalSeats;
  }

  get noDelete(): boolean {
    return this.bookings && this.bookings.length > 0;
  }
}
