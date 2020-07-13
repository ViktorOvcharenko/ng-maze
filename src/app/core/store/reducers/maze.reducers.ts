import { initialMazeState } from '../state/maze.state';
import { EMazeActions, MazeActions } from '../actions/maze.actions';
import * as _ from 'lodash';
import * as fromModels from '../../models';

export const mazeReducers = (
  state: fromModels.IMazeState = initialMazeState,
  action: MazeActions
): fromModels.IMazeState => {
  switch(action.type) {
    case EMazeActions.SetMaze: {
      return {
        ...state,
        maze: action.payload,
        win: false,
        heroLocation: {
          x: 0,
          y: 1
        }
      };
    }
    case EMazeActions.SetMode: {
      return {
        ...state,
        mode: action.payload,
        win: false,
        heroLocation: {
          x: 0,
          y: 1
        }
      };
    }
    case EMazeActions.HeroStep: {
      const heroLocationCloned = {
        x: state.heroLocation.x,
        y: state.heroLocation.y
      };
      const mazeCloned = _.cloneDeep(state.maze);
      let winClone = false;
      const x = state.heroLocation.x;
      const y = state.heroLocation.y;

      switch (action.payload) {
        case 'right': {
          if (mazeCloned[y][x + 1] === 1) {
            heroLocationCloned.x = x + 1;
            mazeCloned[y][x] = 1;
            mazeCloned[y][heroLocationCloned.x] = 2;
          }
        }
        break;
        case 'up': {
          if (mazeCloned[y - 1][x] === 1) {
            heroLocationCloned.y = y - 1;
            mazeCloned[y][x] = 1;
            mazeCloned[heroLocationCloned.y][x] = 2;
          }
        }
          break;
        case 'left': {
          if (mazeCloned[y][x - 1] === 1 && heroLocationCloned.x !== 0) {
            heroLocationCloned.x = x - 1;
            mazeCloned[y][x] = 1;
            mazeCloned[y][heroLocationCloned.x] = 2;
          }
        }
          break;
        case 'down': {
          if (mazeCloned[y + 1][x] === 1) {
            heroLocationCloned.y = y + 1;
            mazeCloned[y][x] = 1;
            mazeCloned[heroLocationCloned.y][x] = 2;
          }
          if (mazeCloned[y + 1][x] === 3) {
            mazeCloned[y][x] = 1;
            mazeCloned[y + 1][x] = 4;
          }
        }
          break;
      }
      return {
        ...state,
        maze: mazeCloned,
        heroLocation: heroLocationCloned,
        win: winClone
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
