import { TestBed } from '@angular/core/testing';
import { LoginGuard } from './login.guard';
import { AuthService } from '../services';
import { AuthServiceMock } from '../test';

describe('LoginGuard', () => {
  let guard: LoginGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginGuard,
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    });
    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService);
  });

  it('should return true if not isAuthenticated', () => {
    spyOn(authService, 'isAuthenticated').and.callFake(() => false);

    expect(guard.canActivate()).toBeTruthy();
  });

  it('should return false if isAuthenticated', () => {
    spyOn(authService, 'isAuthenticated').and.callFake(() => true);

    expect(guard.canActivate()).toBeFalsy();
  });
});
