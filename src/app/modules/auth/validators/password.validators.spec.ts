import { PasswordValidators } from './password.validators';
import { FormControl } from '@angular/forms';

describe('PasswordValidators', () => {
  const control = new FormControl();

  it(`should return invalidPassword isn't password correct`, () => {
    control.setValue('test');

    expect(PasswordValidators.invalidPassword(control)).toEqual({ invalidPassword: 'true' });
  });

  it('should return null is password correct', () => {
    control.setValue('Qwerty1$');

    expect(PasswordValidators.invalidPassword(control)).toBeNull();
  });
});
