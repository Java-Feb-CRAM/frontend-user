import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { PaymentInfo } from '../models/PaymentInfo';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private readonly http: HttpClient) {
    this.paymentsUrl = `${environment.apiBase}/payments`;
  }

  paymentsUrl: string;

  getPayment(stripeId: string): Observable<PaymentInfo> {
    console.log(stripeId);
    return this.http.get<PaymentInfo>(`${this.paymentsUrl}/${stripeId}`).pipe(
      catchError((error) => {
        return throwError(error.error.message);
      })
    );
  }
}
