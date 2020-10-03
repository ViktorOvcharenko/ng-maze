import { of } from 'rxjs';

export class AuthServiceMock {
  public isAuthenticated = () => false;
  public login = () => of(null);
  public signUp = () => of(null);
}
