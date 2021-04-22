import { CreatePassengerDto } from './CreatePassengerDto';

export interface CreateAgentBookingDto {
  stripeToken: string;
  agentId: number;
  flightIds: number[];
  passengers: CreatePassengerDto[];
}
