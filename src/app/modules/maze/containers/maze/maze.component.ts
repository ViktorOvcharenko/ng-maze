import { Component, OnInit } from '@angular/core';

import * as fromServices from "../../services";

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {

  constructor(private mazeService: fromServices.MazeService) { }

  ngOnInit(): void {
    this.mazeService.generateMaze(20, 20);
  }

}
