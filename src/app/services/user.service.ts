import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const JWT_KEY = 'JWT';

export interface UserInfo {
  id?: number;
  role?: string;
  email?: string;
  username?: string;
  givenName?: string;
  familyName?: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  authenticatedJwt: string;
}
export interface RegistrationResponse {
  accountVerificationToken: string;
}
export interface ValidationResponse {
  emailValidationToken: string;
}
export interface ValidationMessage {
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  validationMessage?= "";
  isLoggedIn = false;
  loginLogoutChange: Subject<boolean> = new Subject<boolean>();
  user: UserInfo = {};
  loginUrl: string;
  registrationUri: string;
  currentUserUri: string;
  validationUri: string;
  generateTokenUri: string;

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.loginUrl = `${environment.apiBase}/users/credentials/authenticate`;
    this.registrationUri = `${environment.apiBase}/users/new`;
    this.currentUserUri = `${environment.apiBase}/users/current`;
    this.validationUri = `${environment.apiBase}/users/usernames/tokens/activate`;
    this.generateTokenUri = `${environment.apiBase}/users/usernames/tokens/generate`;
    this.loginLogoutChange.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
        if (this.isLoggedIn) {
          this.fetchUserDetails();
        }
      },
    });
    this.loginLogoutChange.next(this.isJWTSet());
  }

  register(userDetails: object): void {
    this.http
      .post<RegistrationResponse>(this.registrationUri, userDetails)
      .subscribe({
        next: () => {
          this.router.navigate(['/login'], { replaceUrl: true });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  generateToken(username: object): void {
    this.http
      .post<ValidationMessage>(this.generateTokenUri, username)
      .subscribe({
        next: (data) => {
          this.validationMessage = data.message;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  validate(token: object): void {
    this.http
      .post<ValidationMessage>(this.validationUri, token)
      .subscribe({
        next: (data) => {
          console.log(data.message);
          this.validationMessage = data.message;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  login(credentials: object): void {
    this.http.post<LoginResponse>(this.loginUrl, credentials).subscribe({
      next: (response) => {
        this.setJwt(response.authenticatedJwt);
        this.loginLogoutChange.next(true);
        this.router.navigate([''], { replaceUrl: true });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  logout(): void {
    localStorage.removeItem(JWT_KEY);
    this.loginLogoutChange.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  checkRedirect(): void {
    if (this.isJWTSet()) {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  public isUserFetchSuccess(role: string): Observable<boolean | UrlTree> {
    return this.http.get(this.currentUserUri).pipe(
      timeout(10000),
      map((response) => {
        if ((response as UserInfo).role === role) {
          this.user = response as UserInfo;
          return true;
        } else {
          this.logout();
          return this.router.parseUrl('/login');
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public fetchUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.currentUserUri);
  }

  private fetchUserDetails(): void {
    if (this.isJWTSet()) {
      this.http.get(this.currentUserUri).subscribe({
        next: (user) => {
          this.user = user as UserInfo;
        },
      });
    }
  }

  private isJWTSet(): boolean {
    return Boolean(localStorage.getItem(JWT_KEY));
  }

  private setJwt(token: string): void {
    localStorage.setItem(JWT_KEY, token);
  }
}
