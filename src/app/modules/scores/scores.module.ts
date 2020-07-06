import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoresRoutingModule } from "./scores-routing.module";

import * as fromContainers from './containers';

@NgModule({
  declarations: [
    fromContainers.ScoresComponent
  ],
  imports: [
    CommonModule,
    ScoresRoutingModule
  ],
  providers: []
})
export class ScoresModule { }
