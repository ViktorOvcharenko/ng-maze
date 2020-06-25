import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import * as fromComponents from './components';
import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromComponents.AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: fromContainers.LoginComponent
      },
      {
        path: 'sign-up',
        component: fromContainers.RegistrationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
