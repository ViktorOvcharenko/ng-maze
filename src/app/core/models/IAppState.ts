import { RouterReducerState } from "@ngrx/router-store";
import { IAccountState } from "./IAccountState";
import { IMazeState } from "./IMazeState";

export interface IAppState {
  router?: RouterReducerState;
  account: IAccountState,
  maze: IMazeState
}
