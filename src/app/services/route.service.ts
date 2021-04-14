import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor(private http: HttpClient) {
    this.routesUrl = `${environment.apiBase}/airports`;}

  routesUrl: string;

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl).pipe(
      map(
        (data: Route[]) =>
          data.map((route) => {
            return new Route(
              route.id,
              route.originAirport,
              route.destinationAirport,
              []
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  getRoute(id: string): Observable<Route> {
    return this.http.get<Route>(`${this.routesUrl}/${id}`).pipe(
      map((data: Route) => {
        return new Route(
          data.id,
          data.originAirport,
          data.destinationAirport,
          []
        );
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }
}
