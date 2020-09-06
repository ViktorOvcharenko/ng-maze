import { Action } from '@ngrx/store';

import * as fromModels from '../../models';

export enum EMazeActions {
  SetLevelMode = '[Maze] Set level mode',
  SetLevelModeFromStorage = '[Maze] Set level mode from storage',
  SetHeroMode = '[Maze] Set hero mode',
  SetHeroModeFromStorage = '[Maze] Set hero mode from storage',
  ScoreTick = '[Maze] Score tick',
  ClearScore = '[Maze] Clear score',
  UpdateIsWin = '[Maze] Update isWin',
  AddRecord = '[Maze] Add record',
  AddRecordSuccess = '[Maze] Add record success',
  AddRecordFail = '[Maze] Add record fail',
  GetRecords = '[Maze] Get records',
  GetRecordsSuccess = '[Maze] Get records success',
  GetRecordsFail = '[Maze] Get records fail'
}

export class SetLevelMode implements Action {
  public readonly type = EMazeActions.SetLevelMode;
  constructor(public payload: string) {}
}

export class SetLevelModeFromStorage implements Action {
  public readonly type = EMazeActions.SetLevelModeFromStorage;
  constructor(public payload: string) {}
}

export class SetHeroMode implements Action {
  public readonly type = EMazeActions.SetHeroMode;
  constructor(public payload: string) {}
}

export class SetHeroModeFromStorage implements Action {
  public readonly type = EMazeActions.SetHeroModeFromStorage;
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
  constructor(public payload: fromModels.IAddRecordRequestBody) {}
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

export class GetRecordsSuccess implements Action {
  public readonly type = EMazeActions.GetRecordsSuccess;
  constructor(public payload: fromModels.IRecord[]) {}
}

export class GetRecordsFail implements Action {
  public readonly type = EMazeActions.GetRecordsFail;
}

export type MazeActions =
  SetLevelMode |
  SetLevelModeFromStorage |
  SetHeroMode |
  SetHeroModeFromStorage |
  ScoreTick |
  ClearScore |
  UpdateIsWinn |
  AddRecord |
  AddRecordSuccess |
  AddRecordFail |
  GetRecords |
  GetRecordsSuccess |
  GetRecordsFail;
