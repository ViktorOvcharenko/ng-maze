import { initialMazeState } from '../state/maze.state';
import { mazeReducers } from './maze.reducers';
import {
  SetLevelMode,
  SetLevelModeFromStorage,
  SetHeroMode,
  SetHeroModeFromStorage,
  SetWallMode,
  SetWallModeFromStorage,
  ScoreTick,
  ClearScore,
  UpdateIsWin,
  GetRecordsSuccess
} from '../actions/maze.actions';

import * as fromModels from './../../models'

describe('MazeReducers', () => {
  const initialState = { ...initialMazeState };

  it('should set the level mode', () => {
    const payload = 'test';
    const action = new SetLevelMode(payload);
    const state = mazeReducers(initialState, action);

    expect(state.levelMode).toBe(payload);
    expect(state.isWin).toBeFalsy();
  });

  it('should set the level mode from storage', () => {
    const payload = 'test';
    const action = new SetLevelModeFromStorage(payload);
    const state = mazeReducers(initialState, action);

    expect(state.levelMode).toBe(payload);
    expect(state.isWin).toBeFalsy();
  });

  it('should set the hero mode', () => {
    const payload = 'test';
    const action = new SetHeroMode(payload);
    const state = mazeReducers(initialState, action);

    expect(payload).toBe(state.heroMode);
  });

  it('should set the hero mode from storage', () => {
    const payload = 'test';
    const action = new SetHeroModeFromStorage(payload);
    const state = mazeReducers(initialState, action);

    expect(payload).toBe(state.heroMode);
  });

  it('should set the wall mode', () => {
    const payload = 'test';
    const action = new SetWallMode(payload);
    const state = mazeReducers(initialState, action);

    expect(payload).toBe(state.wallMode);
  });

  it('should set the wall mode from storage', () => {
    const payload = 'test';
    const action = new SetWallModeFromStorage(payload);
    const state = mazeReducers(initialState, action);

    expect(payload).toBe(state.wallMode);
  });

  it('should increment the score', () => {
    const action =new ScoreTick();
    const state = mazeReducers(initialState, action);

    expect(state.score).toBe(1);
  });

  it('should clear the score', () => {
    const action =new ClearScore();
    const state = mazeReducers(initialState, action);

    expect(state.score).toBe(0);
  });

  it('should update the isWin', () => {
    const payload = false;
    const action =new UpdateIsWin(payload);
    const state = mazeReducers(initialState, action);

    expect(state.isWin).toBe(payload);
  });

  it('should get the records', () => {
    const record: fromModels.IRecord = {
      score: 0,
      username: 'test',
      date: new Date(),
      mode: 'test'
    };
    const payload = [record];
    const action =new GetRecordsSuccess(payload);
    const state = mazeReducers(initialState, action);

    expect(state.records).toEqual(payload);
  });
});
