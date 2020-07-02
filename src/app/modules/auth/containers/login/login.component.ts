import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";
import { IUser } from "../../../../core/models/IUser.interface";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  public loadingAuth = false;
  public subLogin$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subLogin$) {
      this.subLogin$.unsubscribe();
    }
  }

  public submit(user: IUser): void {
    this.loadingAuth = true;
    this.subLogin$ = this.authService.login(user)
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
