import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../../shared/shared.module";

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  declarations: [
    fromContainers.LoginComponent,
    fromContainers.RegistrationComponent,
    fromComponents.AuthLayoutComponent,
    fromComponents.LoginComponent
  ],
    imports: [
      CommonModule,
      AuthRoutingModule,
      SharedModule
    ]
})
export class AuthModule { }
