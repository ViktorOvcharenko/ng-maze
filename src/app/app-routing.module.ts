import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from "./components/main-layout/main-layout.component";


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'maze',
        pathMatch: 'full'
      },
      {
        path: 'maze',
        loadChildren: () => import('./modules/maze/maze.module').then(m => m.MazeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
