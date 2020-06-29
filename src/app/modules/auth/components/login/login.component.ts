import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordValidators } from "../../validators";
import { IUser } from "../../../../core/models/IUser.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  public loginForm: FormGroup;
  public isHidedPassword = false;

  get emailInvalid(): boolean {
    return this.loginForm.get('email').invalid && this.loginForm.get('email').touched;
  }

  get emailRequired(): boolean {
    return this.loginForm.get('email').errors.required;
  }

  get emailIsError(): boolean {
    return this.loginForm.get('email').errors.email;
  }

  get passwordInvalid(): boolean {
    return this.loginForm.get('password').invalid && this.loginForm.get('password').touched;
  }

  get passwordIsError(): boolean {
    return this.loginForm.get('password').errors.invalidPassword;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [PasswordValidators.invalidPassword]),
    });
  }

  public submit(): void {
    const loginFormData = { ...this.loginForm.value };
    this.onSubmit.emit(loginFormData);
  }

  public toggleHidePassword(): void {
    this.isHidedPassword = !this.isHidedPassword;
  }
}
