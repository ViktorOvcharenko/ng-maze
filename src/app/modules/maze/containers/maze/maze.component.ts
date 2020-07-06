import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { SetMaze } from "../../../../core/store/actions/maze.actions";

import * as fromServices from "../../services";

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  constructor(
    private mazeService: fromServices.MazeService,
    private store: Store
  ) { }

  ngOnInit(): void {
    const maze = this.mazeService.generateMaze(20, 20);
    this.store.dispatch(new SetMaze(maze));
  }

}
