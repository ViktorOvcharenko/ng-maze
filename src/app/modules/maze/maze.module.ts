import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeRoutingModule } from './maze-routing.module';
import { SharedModule } from '../../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.MazeComponent,
    fromComponents.MazeContainerComponent,
    fromComponents.MazeRowComponent,
    fromComponents.MazeCeilComponent,
    fromComponents.MazeControlComponent,
  ],
  imports: [
    CommonModule,
    MazeRoutingModule,
    SharedModule,
  ]
})
export class MazeModule { }
