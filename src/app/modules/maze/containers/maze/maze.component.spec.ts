import { NO_ERRORS_SCHEMA } from '@angular/core';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { MazeComponent } from './maze.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MazeService } from '../../../../core/services';
import { MazeServiceMock, TranslateServiceMock } from '../../../../core/test/services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AddRecord,
  ClearScore,
  GetRecords, ScoreTick,
  UpdateIsWin
} from '../../../../core/store/actions/maze.actions';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;
  let mazeService: MazeService;
  let store: MockStore;
  let snackBar: MatSnackBar;
  let translateService: TranslateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MazeComponent ],
      imports: [
        MatSnackBarModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            account : { userName: 'test' },
            maze: {
              levelMode: 'test',
              heroMode: 'test',
              wallMode: 'test',
              isWin: false,
              score: 0,
              records: [
                {
                  score: 1,
                  username: 'test',
                  date: new Date(),
                  mode: 'test'
                }
              ]
            }
          }
        }),
        { provide: MazeService, useClass: MazeServiceMock },
        { provide: TranslateService, useClass: TranslateServiceMock }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
    mazeService = TestBed.inject(MazeService);
    store = TestBed.inject(MockStore);
    snackBar = TestBed.inject(MatSnackBar);
    translateService = TestBed.inject(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should call the generateMaze from mazeService', () => {
      spyOn(mazeService, 'generateMaze');

      component.ngOnInit();

      expect(mazeService.generateMaze).toHaveBeenCalled();
    });

    it('should dispatch the GetRecords', () => {
      const action = new GetRecords('test');
      spyOn(store, 'dispatch');

      component.ngOnInit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call the refreshMaze', () => {
      spyOn(component, 'refreshMaze');

      component.ngOnInit();

      expect(component.refreshMaze).toHaveBeenCalled();
    });

    it('should change  recordThreshold if records', () => {
     component.ngOnInit();

      expect(component.recordThreshold).toBe(1);
    });

    it('should change  orientationFlag', () => {
      component.ngOnInit();

      expect(component.orientationFlag).toBeDefined();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next and complete from destroy$', () => {
      spyOn(component.destroy$, 'next');
      spyOn(component.destroy$, 'complete');

      component.ngOnDestroy();

      expect(component.destroy$.next).toHaveBeenCalled();
      expect(component.destroy$.complete).toHaveBeenCalled();
    });
  });

  describe('onOrientationChange', () => {
    it('should change orientationFlag', () => {
      window.dispatchEvent(new Event('orientationchange'));

      expect(component.orientationFlag).toBeFalsy();
    });
  });

  describe('refreshMaze', () => {
    it('should call generateMaze', () => {
      spyOn(mazeService, 'generateMaze')

      component.refreshMaze();

      expect(mazeService.generateMaze).toHaveBeenCalledWith('test');
    });

    it('should call refreshHeroLocation', () => {
      spyOn(mazeService, 'refreshHeroLocation')

      component.refreshMaze();

      expect(mazeService.refreshHeroLocation).toHaveBeenCalled();
    });

    it('should call startScore', () => {
      spyOn(component, 'startScore')

      component.refreshMaze();

      expect(component.startScore).toHaveBeenCalled();
    });
  });

  describe('heroStep', () => {
    it('should change debounceFlag to false', () => {
      component.heroStep('test');

      expect(component.debounceFlag).toBeFalsy();
    });
  });

  describe('stopScore', () => {
    it('should unsubscribe scoreTickSub$', () => {
      spyOn(component.scoreTickSub$, 'unsubscribe');

      component.stopScore();

      expect(component.scoreTickSub$.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('startScore', () => {
    it('should dispatch ClearScore', () => {
      const action = new ClearScore();
      spyOn(store, 'dispatch');

      component.startScore();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should dispatch UpdateIsWin with false', () => {
      const action = new UpdateIsWin(false);
      spyOn(store, 'dispatch');

      component.startScore();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call stopScore', () => {
      spyOn(component, 'stopScore');

      component.startScore();

      expect(component.stopScore).toHaveBeenCalled();
    });

    it('should dispatch ScoreTick', fakeAsync(() => {
      const action = new ScoreTick();
      spyOn(store, 'dispatch');

      component.startScore();
      tick(1000);

      expect(store.dispatch).toHaveBeenCalledWith(action);
      fixture.destroy();
    }));
  });

  describe('win', () => {
    it('should dispatch UpdateIsWin', () => {
      const action = new UpdateIsWin(true);
      spyOn(store, 'dispatch');

      component.win();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call stopScore', () => {
      spyOn(component, 'stopScore');

      component.win();

      expect(component.stopScore).toHaveBeenCalled();
    });
  });

  describe('addRecord', () => {
    it('should dispatch AddRecord', () => {
      const payloadMock = {
        mode: 'test',
        records: [
          {
            mode: 'test',
            score: 0,
            username: 'test',
            date: new Date()
          }
        ]
      };
      const action = new AddRecord(payloadMock);
      spyOn(store, 'dispatch');

      component.addRecord('settings.test', 0, 'test', []);

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should call  instant of translateService', () => {
      spyOn(translateService, 'instant');

      component.addRecord('settings.test', 0, 'test', []);

      expect(translateService.instant).toHaveBeenCalled();
    });

    it('should call  open of snackBar', () => {
      spyOn(snackBar, 'open');

      component.addRecord('settings.test', 0, 'test', []);

      expect(snackBar.open).toHaveBeenCalled();
    });
  });
});
