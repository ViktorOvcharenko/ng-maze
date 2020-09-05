import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { accountReducers } from './account.reducers';
import { mazeReducers } from './maze.reducers';

import * as fromModels from '../../models';

export const appReducers: ActionReducerMap<fromModels.IAppState, any> = {
  router: routerReducer,
  account: accountReducers,
  maze: mazeReducers
}
