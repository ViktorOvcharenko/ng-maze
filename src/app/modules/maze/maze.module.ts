import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeRoutingModule } from "./maze-routing.module";

import * as fromServices from './services';
import * as fromContainers from './containers';

@NgModule({
  declarations: [
    fromContainers.MazeComponent
  ],
  imports: [
    CommonModule,
    MazeRoutingModule
  ],
  providers: [
    fromServices.MazeService
  ]
})
export class MazeModule { }
