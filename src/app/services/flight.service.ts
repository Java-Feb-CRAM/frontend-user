import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Flight } from '../models/Flight';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Airplane } from '../models/Airplane';
import { AirplaneType } from '../models/AirplaneType';
import { SeatLayout } from '../models/SeatLayout';
import { SeatGroup } from '../models/SeatGroup';
import { SeatLocation } from '../models/SeatLocation';

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
                      [],
                      flight.availableSeats,
                      flight.totalSeats
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
              flight.bookings,
              flight.seats,
              flight.availableSeats,
              flight.totalSeats
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
          new Airplane(
            data.airplane.id,
            new AirplaneType(
              data.airplane.airplaneType.id,
              data.airplane.airplaneType.maxCapacity,
              data.airplane.airplaneType.airplanes,
              new SeatLayout(
                data.airplane.airplaneType.seatLayout.id,
                data.airplane.airplaneType.seatLayout.airplaneTypes,
                data.airplane.airplaneType.seatLayout.seatGroups.map(
                  (g) =>
                    new SeatGroup(
                      g.id,
                      g.seatLayout,
                      g.name,
                      // @ts-ignore
                      g.columns,
                      g.seatLocations.map(
                        (l) =>
                          new SeatLocation(
                            l.id,
                            l.seatGroup,
                            l.width,
                            l.height,
                            l.col,
                            l.row
                          )
                      )
                    )
                )
              )
            ),
            data.airplane.flights
          ),
          data.departureTime,
          data.reservedSeats,
          data.seatPrice,
          data.bookings,
          data.seats,
          data.availableSeats,
          data.totalSeats
        );
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }
}
