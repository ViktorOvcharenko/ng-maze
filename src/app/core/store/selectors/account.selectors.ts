import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

const accountFeatureSelector = createFeatureSelector<fromModels.IAppState, fromModels.IAccountState>('account');

export const getAccountLang = createSelector(accountFeatureSelector, (state: fromModels.IAccountState) => state.lang);
export const getUserName = createSelector(accountFeatureSelector, (state: fromModels.IAccountState) => state.userName);
