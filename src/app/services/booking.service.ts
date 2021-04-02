import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateGuestBookingDto } from '../dto/CreateGuestBookingDto';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  guestBookingUrl = 'http://localhost:8083/bookings/guest';

  createGuestBooking(
    createGuestBookingDto: CreateGuestBookingDto
  ): Observable<Booking> {
    return this.http.post<Booking>(this.guestBookingUrl, createGuestBookingDto);
  }
}
