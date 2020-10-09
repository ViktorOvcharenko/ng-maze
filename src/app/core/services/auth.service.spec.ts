import { TestBed } from "@angular/core/testing";
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let backend: HttpTestingController;
  let snackBar: MatSnackBar;
  let store: Store<any>;
  const localStore = {};
  const resResult = {
    idToken:	'test',
    email:	'test',
    refreshToken:	'test',
    expiresIn:	'test',
    localId:	'test',
    registered:	false
  };
  const user = {
    email: 'test',
    password: 'test',
    returnSecureToken: false
  };
  const error = new HttpErrorResponse({
    error: {
      error: {
        message: 'test'
      }
    }
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      providers: [
        AuthService,
        provideMockStore()
      ],
    });
    service = TestBed.inject(AuthService);
    backend = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
    store = TestBed.inject(Store);
  });

  describe('token', () => {
    it('should call logout if now less than expDate and return null', () => {
      localStore['fb-token-exp'] = new Date(0);
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);
      spyOn(service, 'logout');

      expect(service.token).toBeNull();
      expect(service.logout).toHaveBeenCalled();
    });

    it('should return token if now more than expDate', () => {
      const result = 'test';
      localStore['fb-token-exp'] = new Date(3000, 0, 1);
      localStore['fb-token'] = result;
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      expect(service.token).toBe(result);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if the token exist', () => {
      spyOnProperty(service, 'token').and.returnValue(() => 'test');

      expect(service.isAuthenticated()).toBeTruthy();
    });
  });

  describe('login', () => {
    it('should return IFbAuthResponse', () => {
      service.login(user).subscribe(response => {
        expect(response).toEqual(resResult);
      });

      backend.expectOne({
        method: 'POST',
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
      }).flush(resResult);
    });
  });

  describe('handleError', () => {
    it('should call open from snackBar', () => {
      spyOn(snackBar, 'open');

      service.handleError(error);

      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
