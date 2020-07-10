import { Injectable } from '@angular/core';
import * as fromModels from "../models";
import * as fromConstants from "../constants";

@Injectable({providedIn: 'root'})
export class MazeGenerateService {

  public generateMaze (mode: string): fromModels.IMaze {
    let height: number;
    let width: number;
    const maze = [];
    const walls = [];

    switch (mode) {
      case fromConstants.MODES[0].value: {
        height = 17;
        width = 54;
      }
        break;
      case fromConstants.MODES[1].value: {
        height = 13;
        width = 40;
      }
      break;
      default: {
        height = 7;
        width = 25;
      }
    }

    function amaze(y, x, addBlockWalls) {
      maze[y][x] = 1;
      if (addBlockWalls && valid(y + 1, x) && (maze[y + 1][x] === 0)) walls.push([y + 1, x, [y, x]]);
      if (addBlockWalls && valid(y - 1, x) && (maze[y - 1][x] === 0)) walls.push([y - 1, x, [y, x]]);
      if (addBlockWalls && valid(y, x + 1) && (maze[y][x + 1] === 0)) walls.push([y, x + 1, [y, x]]);
      if (addBlockWalls && valid(y, x - 1) && (maze[y][x - 1] === 0)) walls.push([y, x - 1, [y, x]]);
    }

    function valid(a, b) {
      return (a < height && a >= 0 && b < width && b >= 0);
    }

    function addWalls() {
      let firstRow = [], lastRow = [];

      for (let i = 0; i < width; i++) {
        firstRow[i] = 0;
        lastRow[i] = 0;
      }

      maze.unshift(firstRow);
      maze.push(lastRow);

      for (let i = 0; i < maze.length; i++) {
        maze[i].unshift(0);
        maze[i].push(0);
      }
    }

    height = height % 2 === 0 ? height + 1 : height;
    width = width % 2 === 0 ? width + 1 : width;

    for (let i = 0; i < height; i++) {
      maze[i] = [];
      for (let j = 0; j < width; j++) {
        maze[i][j] = 0;
      }
    }

    amaze(0, 0, true);

    while (walls.length !== 0) {
      const randomWall = walls[Math.floor(Math.random() * walls.length)],
        host = randomWall[2],
        opposite = [(host[0] + (randomWall[0] - host[0]) * 2), (host[1] + (randomWall[1] - host[1]) * 2)];
      if (valid(opposite[0], opposite[1])) {
        if (maze[opposite[0]][opposite[1]] === 1) {
          walls.splice(walls.indexOf(randomWall), 1);
        } else {
          amaze(randomWall[0], randomWall[1], false);
          amaze(opposite[0], opposite[1], true);
        }
      } else {
        walls.splice(walls.indexOf(randomWall), 1);
      }
    }

    addWalls();
    maze[1][0] = 2;
    maze[height + 1][width] = 3;

    return maze;
  }
}
