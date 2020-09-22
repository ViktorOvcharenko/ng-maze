import { initialAppState } from '../state/app.state';
import { initialMazeState } from '../state/maze.state';
import {
  getLevelMode,
  getHeroMode,
  getWallMode,
  getScore,
  getWin,
  getRecords
} from './maze.selectors';


describe('AccountSelectors', () => {
  const appState = { ...initialAppState };
  const initialState = { ...initialMazeState };

  it('should get the levelMode', () => {
    expect(getLevelMode(appState)).toBe(initialState.levelMode);
  });

  it('should get the levelMode', () => {
    expect(getHeroMode(appState)).toBe(initialState.heroMode);
  });

  it('should get the levelMode', () => {
    expect(getWallMode(appState)).toBe(initialState.wallMode);
  });

  it('should get the levelMode', () => {
    expect(getScore(appState)).toBe(initialState.score);
  });

  it('should get the levelMode', () => {
    expect(getWin(appState)).toBe(initialState.isWin);
  });

  it('should get the levelMode', () => {
    expect(getRecords(appState)).toBe(initialState.records);
  });
});
