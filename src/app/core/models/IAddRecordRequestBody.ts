import { IRecord } from './IRecord';

export interface IAddRecordRequestBody {
  mode: string;
  records: IRecord[];
}
