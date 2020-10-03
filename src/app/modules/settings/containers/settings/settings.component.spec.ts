import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { MazeServiceMock, TranslateServiceMock } from '../../../../test/services';
import { Store } from '@ngrx/store';
import { MazeService } from '../../../../core/services';
import { SetLanguage } from '../../../../core/store/actions/account.actions';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let translateService: TranslateService;
  let mazeService: MazeService;
  let store: Store;
  const result = 'test';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [
        provideMockStore({
          initialState: {
            account: { lang: 'test' },
            maze: {
              levelMode: 'test'
            }
          }
        }),
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: MazeService, useClass: MazeServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
    translateService = TestBed.inject(TranslateService);
    mazeService = TestBed.inject(MazeService);
    store = TestBed.inject(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('selectLanguage', () => {
    it('should set language for localStorage', () => {
      spyOn(localStorage, 'setItem');

      component.selectLanguage(result);

      expect(localStorage.setItem).toHaveBeenCalledWith('language', 'test');
    });

    it('should call setDefaultLang from setDefaultLang', () => {
      spyOn(translateService, 'setDefaultLang');

      component.selectLanguage(result);

      expect(translateService.setDefaultLang).toHaveBeenCalledWith('test');
    });

    it('should dispatch SetLanguage', () => {
      spyOn(store, 'dispatch');
      const action  = new SetLanguage(result);

      component.selectLanguage(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
