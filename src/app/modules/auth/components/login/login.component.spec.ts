import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './login.component';

import * as fromCoreModels from '../../../../core/models';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ TranslateModule.forRoot() ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('emailInvalid', () => {
    it('should return return invalid and touched from control email', () => {
      expect(component.emailInvalid)
        .toBe(component.loginForm.get('email').invalid && component.loginForm.get('email').touched);
    });
  });

  describe('emailRequired', () => {
    it('should return emailRequired from control email', () => {
      expect(component.emailRequired)
        .toBe(component.loginForm.get('email').errors.required);
    });
  });

  describe('emailIsError', () => {
    it('should return emailIsError from control email', () => {
      expect(component.emailIsError)
        .toBe(component.loginForm.get('email').errors.email);
    });
  });

  describe('passwordInvalid', () => {
    it('should return invalid and touched from control password', () => {
      expect(component.passwordInvalid)
        .toBe(component.loginForm.get('password').invalid && component.loginForm.get('password').touched);
    });
  });

  describe('passwordIsError', () => {
    it('should return passwordIsError from control password', () => {
      expect(component.passwordIsError)
        .toBe(component.loginForm.get('password').errors.invalidPassword);
    });
  });

  describe('ngOnInit', () => {
    it('should create the controls an email and a password', () => {
      expect(component.loginForm.controls['email']).toBeTruthy();
      expect(component.loginForm.controls['password']).toBeTruthy();
    });
  });

  describe('submit', () => {
    it('should call the onSubmit', () => {
      const result: fromCoreModels.IUser = {
        ...component.loginForm.value,
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
