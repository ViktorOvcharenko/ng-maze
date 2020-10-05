import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';
import { MazeServiceMock, TranslateServiceMock } from '../../../../core/test/services';
import { Store } from '@ngrx/store';
import { MazeService } from '../../../../core/services';
import { SetLanguage } from '../../../../core/store/actions/account.actions';
import {
  ClearScore,
  SetHeroMode,
  SetLevelMode,
  SetWallMode,
  UpdateIsWin
} from '../../../../core/store/actions/maze.actions';

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

  describe('selectLevelMode', () => {
    it('should set hero-mode for localStorage', () => {
      spyOn(localStorage, 'setItem');

      component.selectLevelMode(result);

      expect(localStorage.setItem).toHaveBeenCalledWith('level-mode', 'test');
    });

    it('should call generateMaze from mazeService', () => {
      spyOn(mazeService, 'generateMaze').and.returnValue([]);

      component.selectLevelMode(result);

      expect(mazeService.generateMaze).toHaveBeenCalledWith(result);
    });

    it('should call refreshHeroLocation from mazeService', () => {
      spyOn(mazeService, 'refreshHeroLocation').and.returnValue(null);

      component.selectLevelMode(result);

      expect(mazeService.refreshHeroLocation).toHaveBeenCalled();
    });

    it('should dispatch SetWallMode', () => {
      spyOn(store, 'dispatch');
      const action  = new SetLevelMode(result);

      component.selectLevelMode(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch ClearScore', () => {
      spyOn(store, 'dispatch');
      const action  = new ClearScore();

      component.selectLevelMode(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch UpdateIsWin', () => {
      spyOn(store, 'dispatch');
      const action  = new UpdateIsWin(false);

      component.selectLevelMode(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('selectHeroMode', () => {
    it('should set hero-mode for localStorage', () => {
      spyOn(localStorage, 'setItem');

      component.selectHeroMode(result);

      expect(localStorage.setItem).toHaveBeenCalledWith('hero-mode', 'test');
    });

    it('should dispatch SetHeroMode', () => {
      spyOn(store, 'dispatch');
      const action  = new SetHeroMode(result);

      component.selectHeroMode(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('selectWallMode', () => {
    it('should set hero-mode for localStorage', () => {
      spyOn(localStorage, 'setItem');

      component.selectWallMode(result);

      expect(localStorage.setItem).toHaveBeenCalledWith('wall-mode', 'test');
    });

    it('should dispatch SetWallMode', () => {
      spyOn(store, 'dispatch');
      const action  = new SetWallMode(result);

      component.selectWallMode(result);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
