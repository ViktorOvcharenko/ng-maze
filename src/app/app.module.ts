import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MazeEffects } from './core/store/effects/maze.effects';

import { environment } from '../environments/environment';
import { appReducers } from './core/store/reducers/app.reducers';

import * as fromCoreComponents from './core/components';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([MazeEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production === false}),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [fromCoreComponents.AppComponent]
})
export class AppModule { }
