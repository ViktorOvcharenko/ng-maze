import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as fromCoreServices from '../../../../core/services';
import * as fromCoreModels from '../../../../core/models';

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnDestroy {
  public loadingAuth = false;
  public destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: fromCoreServices.AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public submit(user: fromCoreModels.IUser): void {
    this.loadingAuth = true;
    this.authService.signUp(user)
      .pipe( takeUntil(this.destroy$) )
      .subscribe(() => {
        this.loadingAuth = false;
        this.router.navigate(['/']);
      }, () => {
        this.loadingAuth = false;
      });
  }
}
