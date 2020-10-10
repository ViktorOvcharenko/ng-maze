import { TestBed } from '@angular/core/testing';
import { MazeService } from '../../services';
import { Store} from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MazeServiceMock } from '../../test';
import { MazeEffects } from './maze.effects';

import * as fromModels from '../../models';
import * as fromActions from '../actions/maze.actions';

describe('MazeEffects', () => {
  let actions$: Observable<any>;
  let effects: MazeEffects;
  let store: Store<fromModels.IAppState>;
  let mazeService: MazeService;
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
        provideMockActions(() => actions$),
        MazeEffects,
        { provide: MazeService, useClass: MazeServiceMock },
      ],
    });
    effects = TestBed.inject(MazeEffects);
    store = TestBed.inject(Store);
    mazeService = TestBed.inject(MazeService);
  });

  describe('addRecord$', () => {
    it('should call the addRecord from mazeService', () => {
      spy = spyOn(mazeService, 'addRecord').and.returnValue(of(null));
      actions$ = of({ type: fromActions.EMazeActions.AddRecord });

      effects.addRecord$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
      });
    });

    it('should dispatch the AddRecordSuccess', () => {
      actions$ = of({ type: fromActions.EMazeActions.AddRecord });

      effects.addRecord$.subscribe(action => {
        expect(action).toEqual(new fromActions.AddRecordSuccess());
      });
    });

    it('should dispatch the AddRecordFail if error', () => {
      spy = spyOn(mazeService, 'addRecord').and.returnValue(throwError(null));
      actions$ = of({ type: fromActions.EMazeActions.AddRecord });

      effects.addRecord$.subscribe(action => {
        expect(action).toEqual(new fromActions.AddRecordFail());
      });
    });
  });

  describe('getRecords$', () => {
    it('should call the getRecord from mazeService', () => {
      spy = spyOn(mazeService, 'getRecord').and.returnValue(of(null));
      actions$ = of({ type: fromActions.EMazeActions.GetRecords });

      effects.getRecords$.subscribe(() => {
        expect(spy).toHaveBeenCalled();
      })
    });

    it('should dispatch the GetRecordsSuccess', () => {
      actions$ = of({ type: fromActions.EMazeActions.GetRecords });

      effects.getRecords$.subscribe(action => {
        expect(action).toEqual(new fromActions.GetRecordsSuccess(null));
      });
    });

    it('should dispatch the GetRecordsFail if error', () => {
      spy = spyOn(mazeService, 'getRecord').and.returnValue(throwError(null));
      actions$ = of({ type: fromActions.EMazeActions.GetRecords });

      effects.getRecords$.subscribe(action => {
        expect(action).toEqual(new fromActions.GetRecordsFail());
      });
    });
  });
});
