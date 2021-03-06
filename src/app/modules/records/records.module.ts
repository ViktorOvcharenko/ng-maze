import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsRoutingModule } from "./records-routing.module";
import { SharedModule } from '../../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.RecordsComponent,
    fromComponents.RecordsListComponent,
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule,
    SharedModule,
  ]
})
export class RecordsModule { }
