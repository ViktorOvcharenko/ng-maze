import { initialMazeState } from "../state/maze.state";
import { EMazeActions, MazeActions } from "../actions/maze.actions";
import * as fromModels from '../../models';

export const mazeReducers = (
  state: fromModels.IMazeState = initialMazeState,
  action: MazeActions
): fromModels.IMazeState => {
  switch(action.type) {
    case EMazeActions.SetMaze: {
      return { ...state, maze: action.payload};
    }
    default:
      return state;
  }
}
