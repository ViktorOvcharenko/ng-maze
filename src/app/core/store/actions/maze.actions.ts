import { Action } from "@ngrx/store";
import { IMaze } from "../../models/IMaze";

export enum EMazeActions {
  SetMaze = '[Maze] Set Maze'
}

export class SetMaze implements Action {
  public readonly type = EMazeActions.SetMaze
  constructor(public payload: IMaze) {}
}

export type MazeActions = SetMaze;
