import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.SettingsComponent,
    fromComponents.SettingsMainComponent,
    fromComponents.SettingsLanguageComponent,
    fromComponents.SettingsLevelModeComponent,
    fromComponents.SettingsHeroComponent
  ],
    imports: [
      CommonModule,
      SharedModule,
      SettingsRoutingModule,
      MatFormFieldModule,
      MatSelectModule
    ]
})
export class SettingsModule { }
