import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeRoutingModule } from "./maze-routing.module";

import * as fromServices from './services';
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.MazeComponent,
    fromComponents.MazeContainerComponent,
    fromComponents.MazeRowComponent,
    fromComponents.MazeCeilComponent
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
