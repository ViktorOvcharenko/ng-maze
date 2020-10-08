import { of } from 'rxjs';

export class MazeServiceMock {
  maze = [];
  heroLocation = { x: 0, y: 1 }

  generateMaze = (mode: string) => [];
  refreshHeroLocation = () => null;
  addRecord = () => of(null);
  getRecord = () => of(null);
}
