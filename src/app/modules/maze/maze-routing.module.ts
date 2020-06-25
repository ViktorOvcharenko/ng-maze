import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MazeComponent } from "./containers/maze/maze.component";

const routes: Routes = [
  {
    path: '',
    component: MazeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MazeRoutingModule {}
