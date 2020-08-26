import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { IAppState } from '../../models';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MazeService } from '../../services';

import * as fromActions from '../actions/maze.actions';

@Injectable()
export class RecordesEffects {
  @Effect()
  addRecord$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.AddRecord>(fromActions.EMazeActions.AddRecord),
    switchMap(({ payload }) => this.mazeService.addRecord(payload)),
    switchMap(() => of( new fromActions.AddRecordSuccess() )),
    catchError(() => of( new fromActions.AddRecordFail() ))
  );

  constructor(
    private store$: Store<IAppState>,
    private actions$: Actions,
    private mazeService: MazeService
  ) {}
}
