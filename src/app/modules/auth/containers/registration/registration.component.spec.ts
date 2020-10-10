import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services';
import { AuthServiceMock } from '../../../../core/test';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import * as fromCoreModels from '../../../../core/models';

describe('RegistrationComponent from containers', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let authService: AuthService;
  let router: Router;
  const resultUser: fromCoreModels.IUser = {
    email: 'test',
    password: 'test',
    returnSecureToken: false
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
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
    fixture = TestBed.createComponent(RegistrationComponent);
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
    it('should call signUp from authService', () => {
      spyOn(authService, 'signUp').and.returnValue(of(null));

      component.submit(resultUser);

      expect(authService.signUp).toHaveBeenCalled();
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
      spyOn(authService, 'signUp').and.returnValue(throwError('test'))

      component.submit(resultUser);

      expect(component.loadingAuth).toBeFalsy();
    });
  });
});
