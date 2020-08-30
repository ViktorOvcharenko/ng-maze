import { IRecord } from './IRecord';

export interface IMazeState {
  mode: string;
  isWin: boolean;
  score: number;
  records: IRecord[];
}
