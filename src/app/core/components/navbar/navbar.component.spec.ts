import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '../../services';
import { AuthServiceMock } from '../../test/services';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ConfirmLogoutComponent } from '../confirm-logout/confirm-logout.component';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.drawer = ({ close: () => null } as MatDrawer);
    fixture.detectChanges();
  });

  describe('logout', () => {
    xit(`should call open from dialog with ConfirmLogoutComponent' and { width: '300px' }`, () => {
      spyOn(dialog, 'open');

      component.logout();

      expect(dialog.open).toHaveBeenCalledWith(ConfirmLogoutComponent, { width: '300px' });
    });

    xit(`should call logout from authService if afterClosed return true`, () => {
      spyOn(authService, 'logout');

      component.logout();

      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('drawerClose', () => {
    it('should call close from drawer', () => {
      spyOn(component.drawer, 'close');

      component.drawerClose();

      expect(component.drawer.close).toHaveBeenCalled();
    });
  });
});
