import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { SetMaze } from "../../../../core/store/actions/maze.actions";
import { combineLatest, Observable, Subscription } from "rxjs";
import { getMaze, getMode } from "../../../../core/store/selectors/maze.selectors";
import { MazeGenerateService } from "../../../../core/services";
import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  public maze$: Observable<fromModels.IMaze>;
  public mode$: Observable<string>;
  public combineSub$: Subscription;
  public modeSub$: Subscription;

  constructor(
    private mazeGenerateService: MazeGenerateService,
    private store: Store
  ) {
    this.maze$ = this.store.pipe(select(getMaze));
    this.mode$ = this.store.pipe(select(getMode));
  }

  ngOnInit(): void {
    combineLatest([this.maze$, this.mode$])
      .subscribe(([maze, mode]) => {
        if (!maze.length) {
          const newMaze = this.mazeGenerateService.generateMaze(mode);
          this.store.dispatch(new SetMaze(newMaze));
        }
      })
  }

  ngOnDestroy(): void {
    if (this.combineSub$) {
      this.combineSub$.unsubscribe();
    }
    if (this.modeSub$) {
      this.modeSub$.unsubscribe();
    }
  }

  public refreshMaze(): void {
    this.mode$
      .subscribe(mode => {
        const newMaze = this.mazeGenerateService.generateMaze(mode);
        this.store.dispatch(new SetMaze(newMaze));
      })
  }
}
