import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

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
    return false
  }
}
