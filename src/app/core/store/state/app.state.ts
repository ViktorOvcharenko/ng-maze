import { IAppState } from "../../models/IAppState";
import { initialAccountState } from "./account.state";
import { initialMazeState } from "./maze.state";

export const initialAppState: IAppState = {
  account: initialAccountState,
  maze: initialMazeState
}
