import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearScore, HeroStep, ScoreTick, SetMaze } from '../../../../core/store/actions/maze.actions';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { getMaze, getMode, getWin, getScore } from '../../../../core/store/selectors/maze.selectors';
import { MazeGenerateService } from '../../../../core/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fromModels from '../../../../core/models';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  public maze$: Observable<fromModels.IMaze>;
  public mode$: Observable<string>;
  public win$: Observable<boolean>;
  public score$: Observable<number>;
  public combineMazeModeSub$: Subscription;
  public combineWinScoreSub$: Subscription;
  public modeSub$: Subscription;
  public scoreTickSub$: Subscription;

  constructor(
    private mazeGenerateService: MazeGenerateService,
    private store: Store,
    private snackBar: MatSnackBar,
  ) {
    this.maze$ = this.store.pipe(select(getMaze));
    this.mode$ = this.store.pipe(select(getMode));
    this.win$ = this.store.pipe(select(getWin));
    this.score$ = this.store.pipe(select(getScore));
  }

  ngOnInit(): void {
    this.combineMazeModeSub$ = combineLatest([this.maze$, this.mode$])
      .subscribe(([maze, mode]) => {
        if (!maze.length) {
          const newMaze = this.mazeGenerateService.generateMaze(mode);
          this.store.dispatch(new SetMaze(newMaze));
        } else {
          this.combineMazeModeSub$.unsubscribe();
        }
      });

    this.combineWinScoreSub$ = combineLatest([this.win$, this.score$])
      .subscribe(([win, score]) => {

      })
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
        const newMaze = this.mazeGenerateService.generateMaze(mode);
        this.store.dispatch(new SetMaze(newMaze));
      })
    this.store.dispatch(new ClearScore());
    this.startScore();
  }

  public heroStep(event: string): void {
    this.store.dispatch(new HeroStep(event));
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
