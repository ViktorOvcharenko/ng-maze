import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../../../../core/validators';

import * as fromCoreModels from '../../../../core/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() loadingAuth: boolean;
  @Output() onSubmit: EventEmitter<fromCoreModels.IUser> = new EventEmitter<fromCoreModels.IUser>();
  signUpForm: FormGroup;
  isHiddenPassword = true;

  get displayNameInvalid(): boolean {
    return this.signUpForm.get('displayName').invalid && this.signUpForm.get('displayName').touched;
  }

  get displayNameRequired(): boolean {
    return this.signUpForm.get('displayName').errors.required;
  }

  get displayNameWrongLength(): boolean {
    return this.signUpForm.get('displayName').errors.minlength || this.signUpForm.get('displayName').errors.maxlength;
  }

  get emailInvalid(): boolean {
    return this.signUpForm.get('email').invalid && this.signUpForm.get('email').touched;
  }

  get emailRequired(): boolean {
    return this.signUpForm.get('email').errors.required;
  }

  get emailIsError(): boolean {
    return this.signUpForm.get('email').errors.email;
  }

  get passwordInvalid(): boolean {
    return this.signUpForm.get('password').invalid && this.signUpForm.get('password').touched;
  }

  get passwordIsError(): boolean {
    return this.signUpForm.get('password').errors.invalidPassword;
  }


  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      displayName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [PasswordValidators.invalidPassword]),
    });
  }

  submit(): void {
    const loginFormData: fromCoreModels.IUser = {
      ...this.signUpForm.value,
      returnSecureToken: true
    };

    this.onSubmit.emit(loginFormData);
  }

  toggleHidePassword(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }
}
