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


describe('MazeSelectors', () => {
  const appState = { ...initialAppState };
  const initialState = { ...initialMazeState };

  it('should get the level mode', () => {
    expect(getLevelMode(appState)).toBe(initialState.levelMode);
  });

  it('should get the hero mode', () => {
    expect(getHeroMode(appState)).toBe(initialState.heroMode);
  });

  it('should get the wall mode', () => {
    expect(getWallMode(appState)).toBe(initialState.wallMode);
  });

  it('should get the score', () => {
    expect(getScore(appState)).toBe(initialState.score);
  });

  it('should get the win', () => {
    expect(getWin(appState)).toBe(initialState.isWin);
  });

  it('should get the records', () => {
    expect(getRecords(appState)).toBe(initialState.records);
  });
});
