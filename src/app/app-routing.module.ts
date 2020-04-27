import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideLayoutComponent } from './shared/layouts/side-layout/side-layout.component';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/maintenance/stats' },
  {
    path: '',
    component: SideLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'maintenance',

        loadChildren: () =>
          import('./pages/maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule
          ),
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./pages/config/config.module').then((m) => m.ConfigModule),
      },
    ],
  },
  {
    path: '',
    component: DefaultLayoutComponent,

    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/others/others.module').then((m) => m.OthersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
