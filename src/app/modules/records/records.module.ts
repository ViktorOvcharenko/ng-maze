import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from "./records-routing.module";

import * as fromContainers from './containers';

@NgModule({
  declarations: [
    fromContainers.RecordsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule
  ],
  providers: []
})
export class RecordsModule { }
