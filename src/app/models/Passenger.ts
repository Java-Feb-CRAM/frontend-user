import { Booking } from './Booking';
import { Seat } from './Seat';

export class Passenger {
  public id: number;
  public givenName: string;
  public familyName: string;
  public dob: Date;
  public gender: string;
  public address: string;
  public booking: Booking;
  public seat?: Seat;

  constructor(
    id: number,
    givenName: string,
    familyName: string,
    dob: Date,
    gender: string,
    address: string,
    booking: Booking,
    seat?: Seat
  ) {
    this.id = id;
    this.givenName = givenName;
    this.familyName = familyName;
    this.dob = dob;
    this.gender = gender;
    this.address = address;
    this.booking = booking;
    this.seat = seat;
  }
}
