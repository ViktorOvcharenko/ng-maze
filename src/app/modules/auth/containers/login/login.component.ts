import { Component } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";
import { IUser } from "../../../../core/models/IUser.interface";

@Component({
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loadingAuth = false;

  constructor(private authService: AuthService) {}

  public submit(user: IUser): void {
    this.loadingAuth = true;
    this.authService.login(user).subscribe(() => {
      this.loadingAuth = false;
    });
  }
}
