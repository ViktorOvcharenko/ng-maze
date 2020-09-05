import { IRecord } from './IRecord';

export interface IMazeState {
  mode: string;
  hero: string;
  isWin: boolean;
  score: number;
  records: IRecord[];
}
