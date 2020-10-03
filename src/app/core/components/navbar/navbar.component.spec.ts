import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services';
import { AuthServiceMock } from '../../test/services';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

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

  describe('drawerClose', () => {
    it('should call close from drawer', () => {
      spyOn(component.drawer, 'close');

      component.drawerClose();

      expect(component.drawer.close).toHaveBeenCalled();
    });
  });
});
