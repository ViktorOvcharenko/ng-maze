import * as fromModels from '../../models';

export const initialMazeState: fromModels.IMazeState = {
  levelMode: 'settings.medium',
  heroMode: 'settings.android',
  wallMode: 'settings.bricks',
  isWin: false,
  score: 0,
  records: [],
}
