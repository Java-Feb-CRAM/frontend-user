import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Flight } from '../models/Flight';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private readonly http: HttpClient) {
    this.flightsUrl = `${environment.apiBase}/flights`;
  }

  flightsUrl: string;

  searchFlights(
    originIataId: string,
    destinationIataId: string,
    dateRangeStart: number,
    dateRangeEnd: number,
    stops: number
  ): Observable<Set<Flight[]>> {
    return this.http
      .get<Set<Flight[]>>(
        `${this.flightsUrl}/origin/${originIataId}/destination/${destinationIataId}/from/${dateRangeStart}/to/${dateRangeEnd}/search/${stops}`
      )
      .pipe(
        map(
          (flightPaths: Set<Flight[]>) =>
            new Set(
              Array.from(flightPaths).map((flights: Flight[]) =>
                flights.map(
                  (flight) =>
                    new Flight(
                      flight.id,
                      flight.route,
                      flight.airplane,
                      flight.departureTime,
                      flight.reservedSeats,
                      flight.seatPrice,
                      [],
                      flight.airplane.airplaneType.maxCapacity -
                        flight.reservedSeats
                    )
                )
              )
            )
        )
      );
  }

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
