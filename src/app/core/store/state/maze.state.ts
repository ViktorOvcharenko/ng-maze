import * as fromModels from '../../models';

export const initialMazeState: fromModels.IMazeState = {
  mode: 'settings.medium',
  hero: 'settings.android',
  isWin: false,
  score: 0,
  records: [],
}
