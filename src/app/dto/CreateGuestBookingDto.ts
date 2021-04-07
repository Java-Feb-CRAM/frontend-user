import { CreatePassengerDto } from './CreatePassengerDto';

export interface CreateGuestBookingDto {
  stripeToken: string;
  guestEmail: string;
  guestPhone: string;
  flightIds: number[];
  passengers: CreatePassengerDto[];
}
