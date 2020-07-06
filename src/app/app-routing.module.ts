import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromCoreComponents from './core/components'
import * as fromCoreGuards from './core/guards'

const routes: Routes = [
  {
    path: '',
    component: fromCoreComponents.MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'maze',
        pathMatch: 'full'
      },
      {
        path: 'maze',
        canActivate: [fromCoreGuards.AuthGuard],
        loadChildren: () => import('./modules/maze/maze.module').then(m => m.MazeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'scores',
        canActivate: [fromCoreGuards.AuthGuard],
        loadChildren: () => import('./modules/scores/scores.module').then(m => m.ScoresModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
