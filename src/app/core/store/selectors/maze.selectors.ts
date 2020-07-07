import { createSelector } from "@ngrx/store";

import { IAppState } from "../../models/IAppState";
import { IMazeState } from "../../models/IMazeState";

const selectMaze = (state: IAppState) => state.maze;

export const getMaze = createSelector(selectMaze, (state: IMazeState) => state.maze);
