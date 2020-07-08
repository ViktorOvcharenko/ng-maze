import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { SetMaze } from "../../../../core/store/actions/maze.actions";
import {combineLatest, Observable, Subscription} from "rxjs";
import { getMaze } from "../../../../core/store/selectors/maze.selectors";
import { MazeGenerateService } from "../../../../core/services";
import * as fromModels from "../../../../core/models"

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit, OnDestroy {
  public maze$: Observable<fromModels.IMaze>;
  public mazeSub$: Subscription;

  constructor(
    private mazeGenerateService: MazeGenerateService,
    private store: Store
  ) {
    this.maze$ = this.store.pipe(select(getMaze));
  }

  ngOnInit(): void {
    this.mazeSub$ = this.maze$.subscribe(maze => {
      if (!maze.length) {
        const maze = this.mazeGenerateService.generateMaze('medium');
        this.store.dispatch(new SetMaze(maze));
      }
    })
    // combineLatest([])
  }

  ngOnDestroy(): void {
    if (this.mazeSub$) {
      this.mazeSub$.unsubscribe();
    }
  }
}
