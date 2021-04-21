import { CreatePassengerDto } from './CreatePassengerDto';

export interface CreateUserBookingDto {
  stripeToken: string;
  userId: number;
  flightIds: number[];
  passengers: CreatePassengerDto[];
}
