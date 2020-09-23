import { initialMazeState } from '../state/maze.state';
import { mazeReducers } from './maze.reducers';
import {
  SetLevelMode,
  SetLevelModeFromStorage,
  SetHeroMode,
  SetHeroModeFromStorage
} from '../actions/maze.actions';

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
});
