import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
const routes: Routes = [
  { path: 'list', component: ListComponent },
  {
    path: 'detail',
    component: DetailComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule {}
