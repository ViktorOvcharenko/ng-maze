import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromCoreServices from '../services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: fromCoreServices.AuthService) {}

  canActivate(): boolean {
    if ( !this.authService.isAuthenticated() ) {
      return true;
    }
  }
}
