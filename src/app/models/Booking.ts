import { Flight } from './Flight';

export class Booking {
  public id: number;
  public isActive: boolean;
  public confirmationCode: string;
  public flights: Flight[];
  public passengers: any;
  public bookingPayment: any;
  public bookingGuest: any;
  public bookingAgent: any;
  public bookingUser: any;

  constructor(
    id: number,
    isActive: boolean,
    confirmationCode: string,
    flights: Flight[],
    passengers: any,
    bookingPayment: any,
    bookingGuest: any,
    bookingAgent: any,
    bookingUser: any
  ) {
    this.id = id;
    this.isActive = isActive;
    this.confirmationCode = confirmationCode;
    this.flights = flights;
    this.passengers = passengers;
    this.bookingPayment = bookingPayment;
    this.bookingGuest = bookingGuest;
    this.bookingAgent = bookingAgent;
    this.bookingUser = bookingUser;
  }

  get noDelete(): boolean {
    return false;
  }
}
