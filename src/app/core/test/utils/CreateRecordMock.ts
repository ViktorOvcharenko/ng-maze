import * as fromModels from '../../models';

export function createRecordMock(number: number): fromModels.IRecord {
  return {
    score: number,
    username: `test${number}`,
    date: new Date(),
    mode: `test${number}`
  }
};
