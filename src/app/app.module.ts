import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MazeEffects } from './core/store/effects/maze.effects';
import { ConfirmLogoutComponent } from './core/components/confirm-logout/confirm-logout.component';

import { registerLocaleData } from '@angular/common';
import { environment } from '../environments/environment';
import { appReducers } from './core/store/reducers/app.reducers';
import localeRu from '@angular/common/locales/ru';

import * as fromCoreComponents from './core/components';

registerLocaleData(localeRu, 'ru');

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    fromCoreComponents.AppComponent,
    fromCoreComponents.MainLayoutComponent,
    fromCoreComponents.HeaderComponent,
    fromCoreComponents.NavbarComponent,
    ConfirmLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ MazeEffects ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production === false }),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [ fromCoreComponents.AppComponent ]
})
export class AppModule { }
