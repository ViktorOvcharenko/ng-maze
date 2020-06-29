import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import  { IUser } from '../models/IUser'
import { Observable } from "rxjs";

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

  public login(user: IUser): Observable<any> {
    this.http.post('', user);
  }

  public signIn(user: IUser): Observable<any> {
    this.http.post('', user);
  }

  public logout(): void {

  }

  private setToken(): void {

  }
}
