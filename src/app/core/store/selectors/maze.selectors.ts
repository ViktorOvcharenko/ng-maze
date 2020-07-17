import { createSelector } from '@ngrx/store';
import * as fromModels from '../../models';

const selectMaze = (state: fromModels.IAppState) => state.maze;

export const getMode = createSelector(selectMaze, (state: fromModels.IMazeState) => state.mode);
export const getScore = createSelector(selectMaze, (state: fromModels.IMazeState) => state.score);
export const getWin = createSelector(selectMaze, (state: fromModels.IMazeState) => state.win);
