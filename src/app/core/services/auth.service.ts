import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { IUser } from '../models/IUser.interface'
import { IFbAuthResponse } from "../models/IFbAuthResponse.interface";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  get username(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-username');
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public login(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  public signUp(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: IFbAuthResponse): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-username', response.displayName);
    } else {
      localStorage.setItem('fb-token', '');
      localStorage.setItem('fb-token-exp', '');
      localStorage.setItem('fb-username', '');
    }
  }

  private handleError(error: HttpErrorResponse) {
    const { message } = error.error.error;

    this.snackBar.open(message, 'close',{
      duration: 3000
    });

    return throwError(error);
  }
}
