import * as fromModels from '../../models';

export const initialMazeState: fromModels.IMazeState = {
  maze: [],
  mode: 'medium',
  win: false,
  heroLocation: {
    x: 0,
    y: 1
  }
}
