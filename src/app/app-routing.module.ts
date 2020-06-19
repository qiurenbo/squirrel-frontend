import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideLayoutComponent } from './shared/layouts/side-layout/side-layout.component';
import { DefaultLayoutComponent } from './shared/layouts/default-layout/default-layout.component';
import { AuthGuardService } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/order/stats' },
  {
    path: '',
    component: SideLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'order',

        loadChildren: () =>
          import('./pages/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'handout',

        loadChildren: () =>
          import('./pages/handout/handout.module').then((m) => m.HandoutModule),
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
