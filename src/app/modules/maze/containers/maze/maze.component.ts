import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClearScore, HeroStep, ScoreTick, SetMaze } from '../../../../core/store/actions/maze.actions';
import { combineLatest, interval, Observable, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { getMaze, getMode, getWin } from '../../../../core/store/selectors/maze.selectors';
import { MazeGenerateService } from '../../../../core/services';
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
  public combineSub$: Subscription;
  public modeSub$: Subscription;
  public scoreTickSub$: Subscription;
  public winSub$: Subscription;

  constructor(
    private mazeGenerateService: MazeGenerateService,
    private store: Store
  ) {
    this.maze$ = this.store.pipe(select(getMaze));
    this.mode$ = this.store.pipe(select(getMode));
    this.win$ = this.store.pipe(select(getWin));
  }

  ngOnInit(): void {
    this.combineSub$ = combineLatest([this.maze$, this.mode$])
      .subscribe(([maze, mode]) => {
        if (!maze.length) {
          const newMaze = this.mazeGenerateService.generateMaze(mode);
          this.store.dispatch(new SetMaze(newMaze));
        }
      });

    this.startScore();
  }

  ngOnDestroy(): void {
    if (this.combineSub$) {
      this.combineSub$.unsubscribe();
    }
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }
    if (this.scoreTickSub$) {
      this.scoreTickSub$.unsubscribe();
    }
    if (this.winSub$) {
      this.winSub$.unsubscribe();
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
    this.winSub$ = this.win$
      .subscribe(win => {
        if (!win) {
          this.store.dispatch(new HeroStep(event));
        } else {
          this.scoreTickSub$.unsubscribe();
        }
      });
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
