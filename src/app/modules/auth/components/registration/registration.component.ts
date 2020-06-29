import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PasswordValidators } from "../../validators";
import { IUser } from "../../../../core/models/IUser.interface";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @Input() loadingAuth: boolean;
  @Output() onSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  public signUpForm: FormGroup;
  public isHidedPassword = true;

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

  public submit(): void {
    const loginFormData: IUser = { ...this.signUpForm.value };
    loginFormData.returnSecureToken = true;
    this.onSubmit.emit(loginFormData);
  }

  public toggleHidePassword(): void {
    this.isHidedPassword = !this.isHidedPassword;
  }
}
