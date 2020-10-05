import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';
import { AuthServiceMock } from '../test/services';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { SetUserName } from '../store/actions/account.actions';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        AuthGuard,
        provideMockStore(),
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
  });

  it('should return true if isAuthenticated', () => {
    spyOn(authService, 'isAuthenticated').and.callFake(() => true);

    expect(guard.canActivate).toBeTruthy();
  });

  it('should call the SetUserName if isAuthenticated', () => {
    const action = new SetUserName('test');
    const localStore = { 'fb-username': 'test' };
    spyOn(authService, 'isAuthenticated').and.callFake(() => true);
    spyOn(store, 'dispatch');
    spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

    guard.canActivate();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should navigate to /auth/login if not isAuthenticated', () => {
    spyOn(authService, 'isAuthenticated').and.callFake(() => false);
    spyOn(router, 'navigate');

    guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['/auth', 'login']);
  });
});
