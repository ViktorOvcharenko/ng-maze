import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EMazeActions {
  SetMode = '[Maze] Set mode',
  SetStorageMode = '[Maze] Set storage mode',
  ScoreTick = '[Maze] Score tick',
  ClearScore = '[Maze] Clear score',
  UpdateIsWin = '[Maze] Update isWin',
  AddRecord = '[Maze] Add record',
  AddRecordSuccess = '[Maze] Add record success',
  AddRecordFail = '[Maze] Add record fail',
  GetRecords = '[Maze] Get records'
}

export class SetMode implements Action {
  public readonly type = EMazeActions.SetMode;
  constructor(public payload: string) {}
}

export class SetStorageMode implements Action {
  public readonly type = EMazeActions.SetStorageMode;
  constructor(public payload: string) {}
}

export class ScoreTick implements Action {
  public readonly type = EMazeActions.ScoreTick;
}

export class ClearScore implements Action {
  public readonly type = EMazeActions.ClearScore;
}

export class UpdateIsWinn implements Action {
  public readonly type = EMazeActions.UpdateIsWin;
  constructor(public payload: boolean) {}
}

export class AddRecord implements Action {
  public readonly type = EMazeActions.AddRecord;
  constructor(public payload: fromModels.IRecord) {}
}

export class AddRecordSuccess implements Action {
  public readonly type = EMazeActions.AddRecordSuccess;
}

export class AddRecordFail implements Action {
  public readonly type = EMazeActions.AddRecordFail;
}

export class GetRecords implements Action {
  public readonly type = EMazeActions.GetRecords;
  constructor(public payload: string) {}
}

export type MazeActions =
  SetMode |
  SetStorageMode |
  ScoreTick |
  ClearScore |
  UpdateIsWinn |
  AddRecord |
  AddRecordSuccess |
  AddRecordFail |
  GetRecords;
