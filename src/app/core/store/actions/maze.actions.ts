import { Action } from "@ngrx/store";
import * as fromModels from '../../models';

export enum EMazeActions {
  SetMaze = '[Maze] Set Maze',
  SetMode = '[Maze] Set Mode'
}

export class SetMaze implements Action {
  public readonly type = EMazeActions.SetMaze;
  constructor(public payload: fromModels.IMaze) {}
}

export class SetMode implements Action {
  public readonly type = EMazeActions.SetMode;
  constructor(public payload: string) {}
}

export type MazeActions =
  SetMaze |
  SetMode;
