import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrationComponent } from './registration.component';

import * as fromCoreModels from '../../../../core/models';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('displayNameInvalid', () => {
    it('should return return invalid and touched from control displayName', () => {
      expect(component.displayNameInvalid)
        .toBe(
          component.signUpForm.get('displayName').invalid &&
          component.signUpForm.get('displayName').touched
        );
    });
  });

  describe('displayNameRequired', () => {
    it('should return required from control displayName', () => {
      expect(component.displayNameRequired)
        .toBe(component.signUpForm.get('displayName').errors.required);
    });
  });

  describe('displayNameWrongLength', () => {
    it('should return minlength or maxlength from control displayName', () => {
      expect(component.displayNameWrongLength)
        .toBe(
          component.signUpForm.get('displayName').errors.minlength ||
          component.signUpForm.get('displayName').errors.maxlength
        );
    });
  });

  describe('emailInvalid', () => {
    it('should return return invalid and touched from control email', () => {
      expect(component.emailInvalid)
        .toBe(
          component.signUpForm.get('email').invalid &&
          component.signUpForm.get('email').touched
        );
    });
  });

  describe('emailIsError', () => {
    it('should return emailIsError from control email', () => {
      expect(component.emailIsError)
        .toBe(component.signUpForm.get('email').errors.email);
    });
  });

  describe('passwordInvalid', () => {
    it('should return invalid and touched from control password', () => {
      expect(component.passwordInvalid)
        .toBe(
          component.signUpForm.get('password').invalid &&
          component.signUpForm.get('password').touched
        );
    });
  });

  describe('passwordIsError', () => {
    it('should return invalidPassword from control email', () => {
      expect(component.passwordIsError)
        .toBe(component.signUpForm.get('password').errors.invalidPassword);
    });
  });

  describe('ngOnInit', () => {
    it('should create the controls a displayName, an email and a password', () => {
      expect(component.signUpForm.controls['displayName']).toBeTruthy();
      expect(component.signUpForm.controls['email']).toBeTruthy();
      expect(component.signUpForm.controls['password']).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('should call the onSubmit', () => {
      const result: fromCoreModels.IUser = {
        ...component.signUpForm.value,
        returnSecureToken: true
      };
      spyOn(component.onSubmit, 'emit');

      component.submit();

      expect(component.onSubmit.emit).toHaveBeenCalledWith(result);
    });
  });

  describe('toggleHidePassword', () => {
    it('should toggle the isHiddenPassword', () => {
      component.toggleHidePassword();

      expect(component.isHiddenPassword).toBeFalsy();
    });
  });
});
