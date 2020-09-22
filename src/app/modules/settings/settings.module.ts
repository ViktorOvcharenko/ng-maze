import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from "./settings-routing.module";
import { SharedModule } from "../../shared/shared.module";

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.SettingsComponent,
    fromComponents.SettingsMainComponent,
    fromComponents.SettingsLanguageComponent,
    fromComponents.SettingsLevelModeComponent,
    fromComponents.SettingsHeroModeComponent,
    fromComponents.SettingsWallModeComponent,
  ],
    imports: [
      CommonModule,
      SharedModule,
      SettingsRoutingModule
    ]
})
export class SettingsModule { }
