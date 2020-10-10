import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services';
import { AuthServiceMock } from '../../../../core/test';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import * as fromCoreModels from '../../../../core/models';

describe('LoginComponent from containers', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  const resultUser: fromCoreModels.IUser = {
    email: 'test',
    password: 'test',
    returnSecureToken: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete from destroy$', () => {
      spyOn(component.destroy$, 'next');
      spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(component.destroy$.next).toHaveBeenCalled();
      expect(component.destroy$.complete).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should call login from authService', () => {
      spyOn(authService, 'login').and.returnValue(of(null));

      component.submit(resultUser);

      expect(authService.login).toHaveBeenCalled();
    });

    it('should change loadingAuth to false', () => {
      component.submit(resultUser);

      expect(component.loadingAuth).toBeFalsy();
    });

    it('should call navigate from router', () => {
      spyOn(router, 'navigate');
      component.submit(resultUser);

      expect(router.navigate).toHaveBeenCalled();
    });

    it('should change loadingAuth to false if login login return error', () => {
      spyOn(authService, 'login').and.returnValue(throwError('test'))

      component.submit(resultUser);

      expect(component.loadingAuth).toBeFalsy();
    });
  });
});
