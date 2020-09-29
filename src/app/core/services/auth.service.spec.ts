import { TestBed } from "@angular/core/testing";
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('AuthService', () => {
  let service: AuthService;
  let backend: HttpTestingController;
  let snackBar: MatSnackBar;
  let store: Store<any>;
  const localStore = { 'fb-token': 'test' };
  const user =  {
    email: 'test',
    password: 'test',
    returnSecureToken: false
  };

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
    it('should return the token if now more than expDate', () => {
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      expect(service.token).toBe('test');
    });

    xit('should call logout if now less than expDate and return null', () => {
      service.expDate = 0;

      expect(service.token).toBeNull();
      expect(service.logout).toHaveBeenCalled();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if the token exist', () => {
      spyOnProperty(service, 'token').and.returnValue(() => 'test');

      expect(service.isAuthenticated()).toBeTruthy();
    });
  });
});
