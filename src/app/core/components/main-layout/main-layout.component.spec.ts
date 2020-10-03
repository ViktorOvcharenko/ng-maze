import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from '../../../test/services/';
import {
  SetHeroModeFromStorage,
  SetLevelModeFromStorage,
  SetWallModeFromStorage
} from '../../store/actions/maze.actions';
import { SetLanguageFromStorage } from '../../store/actions/account.actions';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let store: Store;
  let translateService: TranslateService;
  const localStore = {
    'level-mode': 'test',
    'language': 'test',
    'hero-mode': 'test',
    'wall-mode': 'test'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutComponent ],
      providers: [
        provideMockStore(),
        { provide: TranslateService, useClass: TranslateServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
    store = TestBed.inject(Store);
    translateService = TestBed.inject(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('onInit', () => {
    it('should call the SetLevelModeFromStorage if localStorage get item level-mode', () => {
      const action = new SetLevelModeFromStorage('test');
      spyOn(store, 'dispatch');
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call the SetLanguageFromStorage and setDefaultLang if localStorage get item language', () => {
      const action = new SetLanguageFromStorage('test');
      spyOn(store, 'dispatch');
      spyOn(translateService, 'setDefaultLang');
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
      expect(translateService.setDefaultLang).toHaveBeenCalledWith('test');
    });

    it('should call the SetHeroModeFromStorage if localStorage get item hero-mode', () => {
      const action = new SetHeroModeFromStorage('test');
      spyOn(store, 'dispatch');
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call the SetWallModeFromStorage if localStorage get item wall-mode', () => {
      const action = new SetWallModeFromStorage('test');
      spyOn(store, 'dispatch');
      spyOn(localStorage, 'getItem').and.callFake(key => localStore[key]);

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });
});
