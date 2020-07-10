import * as fromModels from "./index";

export interface IMazeState {
  maze: fromModels.IMaze,
  mode: string;
  win: boolean;
  heroLocation: fromModels.IHeroLocation
}
