import { createSelector } from "@ngrx/store";
import * as fromModels from '../../models';

const selectMaze = (state: fromModels.IAppState) => state.maze;

export const getMaze = createSelector(selectMaze, (state: fromModels.IMazeState) => state.maze);
export const getMode = createSelector(selectMaze, (state: fromModels.IMazeState) => state.mode);
