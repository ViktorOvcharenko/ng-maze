import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../../models/IAppState";
import { routerReducer } from "@ngrx/router-store";
import { accountReducers } from "./account.reducers";

export const appReducers: ActionReducerMap<IAppState, any> = {
  router: routerReducer,
  account: accountReducers
}
