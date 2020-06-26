import { FormControl, ValidationErrors } from "@angular/forms";

export class PasswordValidators {
  static invalidPassword(control: FormControl): ValidationErrors {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasLowercaseLetter = /[a-z]/.test(value);
    const isLengthValid = value ? value.length > 7 : false;
    const passwordValid = hasNumber && hasCapitalLetter && hasLowercaseLetter && isLengthValid;

    if (!passwordValid) {
      return { invalidPassword: 'true' };
    }
    return null;
  }
}
