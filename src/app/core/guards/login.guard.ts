import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GetUserName } from '../store/actions/account.actions';

import * as fromCoreServices from '../services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: fromCoreServices.AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): boolean {
    if ( !this.authService.isAuthenticated() ) {
      return true;
    }
  }
}
