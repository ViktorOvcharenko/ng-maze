import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

const mazeFeatureSelector = createFeatureSelector<fromModels.IAppState, fromModels.IMazeState>('maze');

export const getLevelMode = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.levelMode);
export const getHeroMode = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.heroMode);
export const getWallMode = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.wallMode);
export const getScore = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.score);
export const getWin = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.isWin);
export const getRecords = createSelector(mazeFeatureSelector, (state: fromModels.IMazeState) => state.records);
