import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

const selectAccount = (state: fromModels.IAppState) => state.account;

export const getAccountLang = createSelector(selectAccount, (state: fromModels.IAccountState) => state.lang);
export const getUserName = createSelector(selectAccount, (state: fromModels.IAccountState) => state.userName);
