import { IRecord } from './IRecord';

export interface IMazeState {
  levelMode: string;
  heroMode: string;
  wallMode: string;
  isWin: boolean;
  score: number;
  records: IRecord[];
}
