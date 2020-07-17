import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearScore, ScoreTick } from '../../../../core/store/actions/maze.actions';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { getMode, getWin, getScore } from '../../../../core/store/selectors/maze.selectors';
import * as _ from 'lodash';
import { MazeService } from '../../../../core/services';
import * as fromModels from '../../../../core/models';

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
  public combineMazeModeSub$: Subscription;
  public combineWinScoreSub$: Subscription;
  public modeSub$: Subscription;
  public scoreTickSub$: Subscription;

  constructor(
    private mazeService: MazeService,
    private store: Store,
  ) {
    this.mode$ = this.store.pipe(select(getMode));
    this.win$ = this.store.pipe(select(getWin));
    this.score$ = this.store.pipe(select(getScore));
  }

  ngOnInit(): void {
    this.maze = this.mazeService.generateMaze('settings.medium');
    // this.combineMazeModeSub$ = combineLatest([this.maze$, this.mode$])
    //   .subscribe(([maze, mode]) => {
    //     if (!maze.length) {
    //       const newMaze = this.mazeGenerateService.generateMaze(mode);
    //       this.store.dispatch(new SetMaze(newMaze));
    //     } else {
    //       this.combineMazeModeSub$.unsubscribe();
    //     }
    //   });
    //
    // this.combineWinScoreSub$ = combineLatest([this.win$, this.score$])
    //   .subscribe(([win, score]) => {
    //
    //   })
    // this.win$
    //   .pipe(
    //     first(Boolean)
    //   )
    //   .subscribe(() => {
    //     this.snackBar.open('WIN!!', 'close',{
    //       duration: 50000
    //     });
    //   });

    this.startScore();
  }

  ngOnDestroy(): void {
    if (this.combineMazeModeSub$) {
      this.combineMazeModeSub$.unsubscribe();
    }
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
  }

  public refreshMaze(): void {
    this.mode$
      .subscribe(mode => {
        this.maze = this.mazeService.generateMaze(mode);
        this.mazeService.refreshHeroLocation();
        this.store.dispatch(new ClearScore());
        this.startScore();
      })
  }

  public heroStep(event: string): void {
    const mazeCloned = _.cloneDeep(this.maze);
    let winFlag = false;
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
            winFlag = true;
          }
        }
          break;
      }
      this.maze = mazeCloned;
  }

  private startScore(): void {
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
