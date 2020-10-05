import { of } from 'rxjs';

export class MazeServiceMock {
  maze = [];

  generateMaze = (mode: string) => [];
  refreshHeroLocation = () => null;
  addRecord = () => of(null);
  getRecord = () => of(null);
}
