import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateGuestBookingDto } from '../dto/CreateGuestBookingDto';
import { Observable, throwError } from 'rxjs';
import { Booking } from '../models/Booking';
import { catchError, map } from 'rxjs/operators';
import { PaymentInfo } from '../models/PaymentInfo';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  paymentsUrl = 'http://localhost:8083/payments';

  getPayment(stripeId: string): Observable<PaymentInfo> {
    return this.http.get<PaymentInfo>(`${this.paymentsUrl}/${stripeId}`);
  }
}
