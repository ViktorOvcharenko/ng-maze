import { Component, OnInit } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { SetMaze } from "../../../../core/store/actions/maze.actions";
import { Observable } from "rxjs";
import { IMaze } from "../../../../core/models/IMaze";
import { getMaze } from "../../../../core/store/selectors/maze.selectors";

import * as fromServices from "../../services";

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {
  public maze$: Observable<IMaze>;

  constructor(
    private mazeService: fromServices.MazeService,
    private store: Store
  ) {
    this.maze$ = this.store.pipe(select(getMaze));
  }

  ngOnInit(): void {
    const maze = this.mazeService.generateMaze(20, 20);
    this.store.dispatch(new SetMaze(maze));
  }
}
