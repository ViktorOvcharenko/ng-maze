import { Action } from "@ngrx/store";
import * as fromModels from '../../models';

export enum EMazeActions {
  SetMaze = '[Maze] Set Maze'
}

export class SetMaze implements Action {
  public readonly type = EMazeActions.SetMaze
  constructor(public payload: fromModels.IMaze) {}
}

export type MazeActions = SetMaze;
