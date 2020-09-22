import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetUserName } from '../store/actions/account.actions';

import * as fromCoreServices from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: fromCoreServices.AuthService,
    private router: Router,
    private store: Store
  ) {}

  canActivate(): boolean {
    if ( this.authService.isAuthenticated() ) {
      const userName = localStorage.getItem('fb-username');
      this.store.dispatch(new SetUserName(userName));
      return true;
    } else {
      this.router.navigate(['/auth', 'login']);
    }
  }
}
