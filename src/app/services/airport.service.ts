import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Airport } from '../models/Airport';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  constructor(private readonly http: HttpClient) {
    this.airportsUrl = `${environment.apiBase}/airports`;
  }

  airportsUrl: string;

  getAllAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl).pipe(
      map(
        (data: Airport[]) =>
          data.map((airport) => {
            return new Airport(
              airport.iataId,
              airport.city,
              [],
              []
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  getAirport(iataId: string): Observable<Airport> {
    return this.http.get<Airport>(`${this.airportsUrl}/${iataId}`).pipe(
      map((data: Airport) => {
        return new Airport(
          data.iataId,
          data.city,
          [],
          []
        );
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }
}
