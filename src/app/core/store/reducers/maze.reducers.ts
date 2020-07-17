import { initialMazeState } from '../state/maze.state';
import { EMazeActions, MazeActions } from '../actions/maze.actions';
import * as fromModels from '../../models';

export const mazeReducers = (
  state: fromModels.IMazeState = initialMazeState,
  action: MazeActions
): fromModels.IMazeState => {
  switch(action.type) {
    case EMazeActions.SetMode: {
      return {
        ...state,
        mode: action.payload,
        win: false
      };
    }
    case EMazeActions.ScoreTick: {
      return {
        ...state,
        score: state.score + 1
      }
    }
    case EMazeActions.ClearScore: {
      return {
        ...state,
        score: 0
      }
    }
    default:
      return state;
  }
}
