import { createSelector } from "@ngrx/store";

import { IAppState } from "../../models/IAppState";
import { IAccountState } from "../../models/IAccountState";

const selectAccount = (state: IAppState) => state.account;

export const selectAccountLang = createSelector(selectAccount, (state: IAccountState) => state.lang);
