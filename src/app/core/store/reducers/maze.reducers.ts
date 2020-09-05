import { initialMazeState } from '../state/maze.state';
import { EMazeActions, MazeActions } from '../actions/maze.actions';

import * as fromModels from '../../models';

export const mazeReducers = (
  state: fromModels.IMazeState = initialMazeState,
  action: MazeActions
): fromModels.IMazeState => {
  switch(action.type) {
    case EMazeActions.SetMode: {
      return { ...state, mode: action.payload, isWin: false };
    }
    case EMazeActions.SetStorageMode: {
      return { ...state, mode: action.payload, isWin: false };
    }
    case EMazeActions.SetHero: {
      return { ...state, hero: action.payload };
    }
    case EMazeActions.ScoreTick: {
      return { ...state, score: state.score + 1 };
    }
    case EMazeActions.ClearScore: {
      return { ...state, score: 0 };
    }
    case EMazeActions.UpdateIsWin: {
      return { ...state, isWin: action.payload };
    }
    case EMazeActions.GetRecordsSuccess: {
      return { ...state, records: action.payload };
    }
    default:
      return state;
  }
}
