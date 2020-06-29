import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import * as fromCoreComponents from './core/components';

@NgModule({
  declarations: [
    fromCoreComponents.AppComponent,
    fromCoreComponents.MainLayoutComponent,
    fromCoreComponents.HeaderComponent,
    fromCoreComponents.NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [fromCoreComponents.AppComponent]
})
export class AppModule { }
