import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearScore, ScoreTick, UpdateIsWinn } from '../../../../core/store/actions/maze.actions';
import { interval, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { getMode, getWin, getScore } from '../../../../core/store/selectors/maze.selectors';
import * as _ from 'lodash';
import * as fromModels from '../../../../core/models';
import * as fromServices from '../../../../core/services';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  public maze: fromModels.IMaze;
  public mode$: Observable<string>;
  public win$: Observable<boolean>;
  public score$: Observable<number>;
  public modeSub$: Subscription;
  public scoreTickSub$: Subscription;

  constructor(
    private mazeService: fromServices.MazeService,
    private scoresService: fromServices.ScoresService,
    private store: Store,
  ) {
    this.mode$ = this.store.pipe(select(getMode));
    this.win$ = this.store.pipe(select(getWin));
    this.score$ = this.store.pipe(select(getScore));
  }

  ngOnInit(): void {
    this.mode$
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
      })
    this.startScore();
  }

  ngOnDestroy(): void {
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
  }

  public refreshMaze(): void {
    this.scoresService.addScore(15).subscribe()
    this.mode$
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.mazeService.refreshHeroLocation();
        this.startScore();
      })
  }

  public heroStep(event: string): void {
    const mazeCloned = _.cloneDeep(this.maze);
    const x = this.mazeService.heroLocation.x;
    const y = this.mazeService.heroLocation.y;

      switch (event) {
        case 'right': {
          if (mazeCloned[y][x + 1] === 1) {
            this.mazeService.heroLocation.x = x + 1;
            mazeCloned[y][x] = 1;
            mazeCloned[y][this.mazeService.heroLocation.x] = 2;
          }
        }
        break;
        case 'up': {
          if (mazeCloned[y - 1][x] === 1) {
            this.mazeService.heroLocation.y = y - 1;
            mazeCloned[y][x] = 1;
            mazeCloned[this.mazeService.heroLocation.y][x] = 2;
          }
        }
          break;
        case 'left': {
          if (mazeCloned[y][x - 1] === 1 && this.mazeService.heroLocation.x !== 0) {
            this.mazeService.heroLocation.x = x - 1;
            mazeCloned[y][x] = 1;
            mazeCloned[y][this.mazeService.heroLocation.x] = 2;
          }
        }
          break;
        case 'down': {
          if (mazeCloned[y + 1][x] === 1) {
            this.mazeService.heroLocation.y = y + 1;
            mazeCloned[y][x] = 1;
            mazeCloned[this.mazeService.heroLocation.y][x] = 2;
          }
          if (mazeCloned[y + 1][x] === 3) {
            mazeCloned[y][x] = 1;
            mazeCloned[y + 1][x] = 4;
            this.store.dispatch(new UpdateIsWinn(true));
            this.store.dispatch(new ClearScore());
          }
        }
          break;
      }
      this.maze = mazeCloned;
  }

  private startScore(): void {
    this.store.dispatch(new ClearScore());
    this.store.dispatch(new UpdateIsWinn(false));

    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }

    this.scoreTickSub$ = interval(1000)
      .pipe(take(999))
      .subscribe(() => {
        this.store.dispatch(new ScoreTick());
    });
  }
}
