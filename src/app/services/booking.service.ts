import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateGuestBookingDto } from '../dto/CreateGuestBookingDto';
import { Booking } from '../models/Booking';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {
    this.bookingsUrl = `${environment.apiBase}/bookings`;
  }

  bookingsUrl: string;

  createGuestBooking(
    createGuestBookingDto: CreateGuestBookingDto
  ): Observable<Booking> {
    return this.http.post<Booking>(
      `${this.bookingsUrl}/guest`,
      createGuestBookingDto
    );
  }

  getBookingByConfirmationCode(confirmationCode: string): Observable<Booking> {
    return this.http
      .get<Booking>(`${this.bookingsUrl}/confirmation/${confirmationCode}`)
      .pipe(
        map((data: Booking) => {
          return new Booking(
            data.id,
            data.isActive,
            data.confirmationCode,
            data.flights,
            data.passengers,
            data.bookingPayment,
            data.bookingGuest,
            data.bookingAgent,
            data.bookingUser
          );
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }
}
