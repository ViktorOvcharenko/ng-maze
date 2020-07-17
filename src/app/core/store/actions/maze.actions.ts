import { Action } from '@ngrx/store';

export enum EMazeActions {
  SetMode = '[Maze] Set Mode',
  ScoreTick = '[Maze] Score tick',
  ClearScore = '[Maze] Clear score'
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

export type MazeActions =
  SetMode |
  ScoreTick |
  ClearScore;
