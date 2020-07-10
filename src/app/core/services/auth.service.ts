import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import * as fromModels from '../models';
import {ClearUserName} from "../store/actions/account.actions";

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

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public login(user: fromModels.IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setResponseData),
        catchError(this.handleError.bind(this))
      )
  }

  public signUp(user: fromModels.IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setResponseData),
        catchError(this.handleError.bind(this))
      )
  }

  public logout(): void {
    AuthService.setResponseData(null);
    this.store.dispatch(new ClearUserName());
  }

  private static setResponseData(response: fromModels.IFbAuthResponse): void {
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
