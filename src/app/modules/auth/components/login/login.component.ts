import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../../validators';
import * as fromCoreModels from '../../../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loadingAuth: boolean;
  @Output() onSubmit: EventEmitter<fromCoreModels.IUser> = new EventEmitter<fromCoreModels.IUser>();
  public loginForm: FormGroup;
  public isHidedPassword = true;

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
    const loginFormData: fromCoreModels.IUser = { ...this.loginForm.value };
    loginFormData.returnSecureToken = true;
    this.onSubmit.emit(loginFormData);
  }

  public toggleHidePassword(): void {
    this.isHidedPassword = !this.isHidedPassword;
  }
}
