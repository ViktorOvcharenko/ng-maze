import { createSelector } from "@ngrx/store";
import { IAppState } from "../../models/IAppState";

const selectMaze = (state: IAppState) => state.maze;
