import {Component, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs";
import { AuthService} from "../../../../core/services/auth.service";
import { IUser } from "../../../../core/models/IUser.interface";

@Component({
  selector: 'app-registration-container',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {
  public loadingAuth = false;
  public subLogin$: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    if (this.subLogin$) {
      this.subLogin$.unsubscribe();
    }
  }

  public submit(user: IUser): void {
    this.loadingAuth = true;
    this.subLogin$ = this.authService.signUp(user)
      .subscribe(() => {
        this.onLoaded()
      }, () => {
        this.onLoaded()
      });
  }

  private onLoaded(): void {
    this.loadingAuth = false;
  }
}
