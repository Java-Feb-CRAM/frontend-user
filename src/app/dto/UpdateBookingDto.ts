import { UpdatePassengerDto } from './UpdatePassengerDto';

export interface UpdateBookingDto {
  passengers: {
    [key: string]: UpdatePassengerDto;
  };
}
