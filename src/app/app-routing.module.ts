import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/maintenance/list' },
  {
    path: 'maintenance',
    loadChildren: () =>
      import('./pages/maintenance/maintenance.module').then(
        m => m.MaintenanceModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
