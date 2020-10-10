import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MazeComponent } from './maze.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MazeService } from '../../../../core/services';
import { MazeServiceMock, TranslateServiceMock, createRecordMock } from '../../../../core/test';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AddRecord,
  ClearScore,
  GetRecords, ScoreTick,
  UpdateIsWin
} from '../../../../core/store/actions/maze.actions';

import * as fromModels from '../../../../core/models';

describe('MazeComponent', () => {
  let component: MazeComponent;
  let fixture: ComponentFixture<MazeComponent>;
  let mazeService: MazeService;
  let store: MockStore;
  let snackBar: MatSnackBar;
  let translateService: TranslateService;
  const mazeMock = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0]
  ];
  const recordMock1: fromModels.IRecord = createRecordMock(1);
  const recordMock2: fromModels.IRecord = createRecordMock(2);
  const recordMock3: fromModels.IRecord = createRecordMock(3);
  const recordMock4: fromModels.IRecord = createRecordMock(4);
  const recordMock5: fromModels.IRecord = createRecordMock(5);
  const recordMock6: fromModels.IRecord = createRecordMock(6);
  const recordMock7: fromModels.IRecord = createRecordMock(7);
  const recordMock8: fromModels.IRecord = createRecordMock(8);
  const recordMock9: fromModels.IRecord = createRecordMock(9);
  const recordMock10: fromModels.IRecord = createRecordMock(10);

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
              records: [ recordMock1 ]
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
    store.refreshState();
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
    it('should return null if debounceFlag is false', () => {
      component.debounceFlag = false;

      expect(component.heroStep('test')).toBeNull();
    });

    it('should increase heroLocation x from mazeService', () => {
      component.maze = mazeMock;
      component.heroStep('ArrowRight');

      expect(mazeService.heroLocation.x).toBe(1);
    });

    it('should decrease heroLocation y from mazeService', () => {
      mazeService.heroLocation.x = 1;
      mazeService.heroLocation.y = 3;
      component.maze = mazeMock;

      component.heroStep('ArrowUp');

      expect(mazeService.heroLocation.y).toBe(2);
    });

    it('should decrease heroLocation x from mazeService', () => {
      mazeService.heroLocation.x = 2;
      mazeService.heroLocation.y = 4;
      component.maze = mazeMock;

      component.heroStep('ArrowLeft');

      expect(mazeService.heroLocation.x).toBe(1);
    });

    it('should increase heroLocation y from mazeService', () => {
      mazeService.heroLocation.x = 1;
      mazeService.heroLocation.y = 3;
      component.maze = mazeMock;

      component.heroStep('ArrowDown');

      expect(mazeService.heroLocation.y).toBe(4);
    });

    it('should change maze value 3 to 4 if after ArrowDown will be 3', () => {
      mazeService.heroLocation.x = 25;
      mazeService.heroLocation.y = 7;
      component.maze = mazeMock;

      component.heroStep('ArrowDown');

      expect(component.maze[8][25]).toBe(4);
    });

    it('should call win if after ArrowDown will be 3', () => {
      mazeService.heroLocation.x = 25;
      mazeService.heroLocation.y = 7;
      component.maze = mazeMock;
      spyOn(component, 'win');

      component.heroStep('ArrowDown');

      expect(component.win).toHaveBeenCalled();
    });

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

    it('should call addRecord with [] if records$ is false', () => {
      store.setState({
        account : { userName: 'test' },
        maze: {
          levelMode: 'test',
          heroMode: 'test',
          wallMode: 'test',
          isWin: false,
          score: 0,
          records: null
        }
      });
      spyOn(component, 'addRecord');

      component.win();

      expect(component.addRecord).toHaveBeenCalledWith('test', 0, 'test', []);
    });

    it('should call addRecord with records if records$ less then 10', () => {
      store.setState({
        account : { userName: 'test' },
        maze: {
          levelMode: 'test',
          heroMode: 'test',
          wallMode: 'test',
          isWin: false,
          score: 0,
          records: [ recordMock1 ]
        }
      });
      spyOn(component, 'addRecord');

      component.win();

      expect(component.addRecord).toHaveBeenCalledWith('test', 0, 'test', [ recordMock1 ]);
    });

    it('should call addRecord with cutRecords if records$ more then 9', () => {
      const records = [recordMock10,
        recordMock1,
        recordMock2,
        recordMock3,
        recordMock4,
        recordMock5,
        recordMock6,
        recordMock7,
        recordMock8,
        recordMock9
      ];
      const cutRecords = records.filter((record, i) => i !== records.length - 1);
      store.setState({
        account : { userName: 'test' },
        maze: {
          levelMode: 'test',
          heroMode: 'test',
          wallMode: 'test',
          isWin: false,
          score: 0,
          records
        }
      });
      spyOn(component, 'addRecord');

      component.win();

      expect(component.addRecord).toHaveBeenCalledWith('test', 0, 'test', cutRecords);
    });
  });

  describe('addRecord', () => {
    it('should dispatch AddRecord', () => {
      const payload: fromModels.IAddRecordRequestBody = {
        mode: 'test',
        records: [
          {
            score: 0,
            username: 'test',
            mode: 'test',
            date: new Date() }
        ]
      };
      const action = new AddRecord(payload);
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
