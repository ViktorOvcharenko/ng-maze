import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as fromCoreServices from '../../../../core/services';
import * as fromCoreModels from '../../../../core/models';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnDestroy {
  public loadingAuth = false;
  public subLogin$: Subscription;

  constructor(
    private authService: fromCoreServices.AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subLogin$) {
      this.subLogin$.unsubscribe();
    }
  }

  public submit(user: fromCoreModels.IUser): void {
    this.loadingAuth = true;
    this.subLogin$ = this.authService.signUp(user)
      .subscribe(() => {
        this.onLoaded();
        this.router.navigate(['/']);
      }, () => {
        this.onLoaded()
      });
  }

  private onLoaded(): void {
    this.loadingAuth = false;
  }
}
