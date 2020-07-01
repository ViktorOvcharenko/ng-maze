import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SharedModule } from "../../shared/shared.module";

import * as fromContainers from './containers';
import * as fromComponents from './components';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    fromContainers.SettingsMainComponent,
    fromComponents.SettingsMainComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SettingsRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class SettingsModule { }
