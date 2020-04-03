import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/maintainance/list' },
  {
    path: 'maintainance',
    loadChildren: () =>
      import('./pages/maintainance/maintainance.module').then(
        m => m.MaintainanceModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
