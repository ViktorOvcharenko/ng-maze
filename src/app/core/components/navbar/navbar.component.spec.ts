import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services';
import { AuthServiceMock } from '../../test/services';
import { TranslateModule } from '@ngx-translate/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        TranslateModule.forRoot(),
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    component.drawer = ({ close: () => null } as MatDrawer);
    fixture.detectChanges();
  });

  describe('logout', () => {
    it('should call open from dialog', () => {
      spyOn(dialog, 'open')
        .and
        .returnValue(({ afterClosed: () => of(true) } as MatDialogRef<unknown, unknown>));
      spyOn(router, 'navigate');

      component.logout();

      expect(dialog.open).toHaveBeenCalled();
    });

    it('should call logout, navigate and close if dialogRef return true', () => {
      spyOn(dialog, 'open')
        .and
        .returnValue(({ afterClosed: () => of(true) } as MatDialogRef<unknown, unknown>));
      spyOn(authService, 'logout');
      spyOn(router, 'navigate');
      spyOn(component.drawer, 'close');

      component.logout();

      expect(authService.logout).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/auth', 'login']);
      expect(component.drawer.close).toHaveBeenCalled();
    });

    it(`shouldn't call logout, navigate and close if dialogRef return false`, () => {
      spyOn(dialog, 'open')
        .and
        .returnValue(({ afterClosed: () => of(false) } as MatDialogRef<unknown, unknown>));
      spyOn(authService, 'logout');
      spyOn(router, 'navigate');
      spyOn(component.drawer, 'close');

      component.logout();

      expect(authService.logout).toHaveBeenCalledTimes(0);
      expect(router.navigate).toHaveBeenCalledTimes(0);
      expect(component.drawer.close).toHaveBeenCalledTimes(0);
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
