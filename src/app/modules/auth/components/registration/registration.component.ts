import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordValidators } from "../../validators";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
    console.log(loginFormData);
  }

  public toggleHidePassword(): void {
    this.isHidedPassword = !this.isHidedPassword;
  }
}
