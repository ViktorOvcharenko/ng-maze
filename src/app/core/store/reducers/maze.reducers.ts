import { initialMazeState } from "../state/maze.state";
import { EMazeActions, MazeActions } from "../actions/maze.actions";
import { IMazeState } from "../../models/IMazeState";

export const mazeReducers = (
  state: IMazeState = initialMazeState,
  action: MazeActions
): { maze: number[][] } => {
  switch(action.type) {
    case EMazeActions.SetMaze: {
      return { ...state, maze: action.payload};
    }
    default:
      return state;
  }
}
