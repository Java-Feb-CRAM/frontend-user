import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CreateGuestBookingDto } from '../dto/CreateGuestBookingDto';
import { Booking } from '../models/Booking';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CreateUserBookingDto } from '../dto/CreateUserBookingDto';
import { CreateAgentBookingDto } from '../dto/CreateAgentBookingDto';
import { UpdateBookingDto } from '../dto/UpdateBookingDto';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private readonly http: HttpClient) {
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

  createUserBooking(
    createUserBookingDto: CreateUserBookingDto
  ): Observable<Booking> {
    return this.http.post<Booking>(
      `${this.bookingsUrl}/user`,
      createUserBookingDto
    );
  }

  createAgentBooking(
    createAgentBoookingDto: CreateAgentBookingDto
  ): Observable<Booking> {
    return this.http.post<Booking>(
      `${this.bookingsUrl}/agent`,
      createAgentBoookingDto
    );
  }

  updateBooking(
    bookingId: number,
    updateBookingDto: UpdateBookingDto
  ): Observable<{}> {
    return this.http.put<UpdateBookingDto>(
      `${this.bookingsUrl}/${bookingId}`,
      updateBookingDto
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
        })
      );
  }

  getBookingsByUser(userId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingsUrl}/user/${userId}`).pipe(
      map((data) => {
        return data.map((booking) => {
          return new Booking(
            booking.id,
            booking.isActive,
            booking.confirmationCode,
            booking.flights,
            booking.passengers,
            booking.bookingPayment,
            booking.bookingGuest,
            booking.bookingAgent,
            booking.bookingUser
          );
        });
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }

  cancelBooking(bookingId: number): Observable<{}> {
    return this.http.delete(`${this.bookingsUrl}/${bookingId}`);
  }
}
