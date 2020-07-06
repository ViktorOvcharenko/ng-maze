import { Action } from "@ngrx/store";

export enum EMazeActions {
  SetMaze = '[Maze] Set Maze'
}

export class SetMaze implements Action {
  public readonly type = EMazeActions.SetMaze
  constructor(public payload: number[][]) {}
}

export type MazeActions = SetMaze;
