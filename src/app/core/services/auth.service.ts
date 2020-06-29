import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { IUser } from '../models/IUser.interface'
import { IFbAuthResponse } from "../models/IFbAuthResponse.interface";

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

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return true;// !!this.token;
  }

  public login(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  public signUp(user: IUser): Observable<any> {
    return this.http.post('', user);
  }

  public logout(): void {
    this.setToken(null);
  }

  private setToken(response: IFbAuthResponse): void {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.setItem('fb-token', '');
      localStorage.setItem('fb-token-exp', '');
    }
  }
}
