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
    return '';
  }

  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    return true;// !!this.token;
  }

  public signIn(user: IUser): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  public signUp(user: IUser): Observable<any> {
    return this.http.post('', user);
  }

  public logout(): void {

  }

  private setToken(response: IFbAuthResponse): void {
    console.log(response, 123);
  }
}
