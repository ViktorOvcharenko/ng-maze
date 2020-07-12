import * as fromModels from '../../models';

export const initialMazeState: fromModels.IMazeState = {
  maze: [],
  mode: 'settings.medium',
  win: false,
  heroLocation: {
    x: 0,
    y: 1
  },
  score: 0
}
