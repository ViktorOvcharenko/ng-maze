import { Component } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";
import { IUser } from "../../../../core/models/IUser.interface";


@Component({
  selector: 'app-login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  public submit(user: IUser): void {
    this.authService.login(user).subscribe();
  }
}
