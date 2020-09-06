import { initialMazeState } from '../state/maze.state';
import { EMazeActions, MazeActions } from '../actions/maze.actions';

import * as fromModels from '../../models';

export const mazeReducers = (
  state: fromModels.IMazeState = initialMazeState,
  action: MazeActions
): fromModels.IMazeState => {
  switch(action.type) {
    case EMazeActions.SetLevelMode: {
      return { ...state, levelMode: action.payload, isWin: false };
    }
    case EMazeActions.SetLevelModeFromStorage: {
      return { ...state, levelMode: action.payload, isWin: false };
    }
    case EMazeActions.SetHeroMode: {
      return { ...state, heroMode: action.payload };
    }
    case EMazeActions.SetHeroModeFromStorage: {
      return { ...state, heroMode: action.payload };
    }
    case EMazeActions.SetWallMode: {
      return { ...state, wallMode: action.payload };
    }
    case EMazeActions.SetWallModeFromStorage: {
      return { ...state, wallMode: action.payload };
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
