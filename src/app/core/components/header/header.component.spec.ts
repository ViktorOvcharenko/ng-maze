import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MatDrawer } from '@angular/material/sidenav';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [
        provideMockStore({
          initialState: {
            account : { userName: 'test' },
            maze: { score: 'test' }
          }
        })
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.drawer ={ toggle: () => null } as MatDrawer;
    fixture.detectChanges();
  });

  describe('drawerToggle', () => {
    it('should call toggle from drawer', () => {
      spyOn(component.drawer, 'toggle');

      component.drawerToggle();

      expect(component.drawer.toggle).toHaveBeenCalled();
    });
  });
});
