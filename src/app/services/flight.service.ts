import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Flight } from '../models/Flight';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  flightsUrl = 'http://localhost:8081/flights';

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl).pipe(
      map(
        (data: Flight[]) =>
          data.map((flight) => {
            return new Flight(
              flight.id,
              flight.route,
              flight.airplane,
              flight.departureTime,
              flight.reservedSeats,
              flight.seatPrice,
              [],
              flight.availableSeats
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  getFlight(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.flightsUrl}/${flightId}`).pipe(
      map((data: Flight) => {
        return new Flight(
          data.id,
          data.route,
          data.airplane,
          data.departureTime,
          data.reservedSeats,
          data.seatPrice,
          [],
          data.availableSeats
        );
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }
}
