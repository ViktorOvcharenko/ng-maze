import { RouterReducerState } from "@ngrx/router-store";
import { IAccountState } from "./IAccountState";

export interface IAppState {
  router?: RouterReducerState;
  account: IAccountState
}
