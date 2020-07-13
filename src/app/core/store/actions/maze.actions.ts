import { Action } from '@ngrx/store';
import * as fromModels from '../../models';

export enum EMazeActions {
  SetMaze = '[Maze] Set Maze',
  SetMode = '[Maze] Set Mode',
  HeroStep = '[Maze] Hero step',
  ScoreTick = '[Maze] Score tick',
  ClearScore = '[Maze] Clear score'
}

export class SetMaze implements Action {
  public readonly type = EMazeActions.SetMaze;
  constructor(public payload: fromModels.IMaze) {}
}

export class SetMode implements Action {
  public readonly type = EMazeActions.SetMode;
  constructor(public payload: string) {}
}

export class HeroStep implements Action {
  public readonly type = EMazeActions.HeroStep;
  constructor(public payload: string) {}
}

export class ScoreTick implements Action {
  public readonly type = EMazeActions.ScoreTick;
}

export class ClearScore implements Action {
  public readonly type = EMazeActions.ClearScore;
}

export type MazeActions =
  SetMaze |
  SetMode |
  HeroStep |
  ScoreTick |
  ClearScore;
