import { initialAccountState } from './account.state';
import { initialMazeState } from './maze.state';
import * as fromModels from '../../models';

export const initialAppState: fromModels.IAppState = {
  account: initialAccountState,
  maze: initialMazeState
}
