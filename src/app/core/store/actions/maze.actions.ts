import { Action } from '@ngrx/store';

export enum EMazeActions {
  SetMode = '[Maze] Set Mode',
  ScoreTick = '[Maze] Score tick',
  ClearScore = '[Maze] Clear score',
  UpdateIsWin = '[Maze] Update isWin',
}

export class SetMode implements Action {
  public readonly type = EMazeActions.SetMode;
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

export type MazeActions =
  SetMode |
  ScoreTick |
  ClearScore |
  UpdateIsWinn;
