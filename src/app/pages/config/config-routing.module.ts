import { Routes, RouterModule } from '@angular/router';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { NgModule } from '@angular/core';
import { AccessControlComponent } from './access-control/access-control.component';
const routes: Routes = [
  { path: 'global-config', component: GlobalConfigComponent },
  { path: 'access-control', component: AccessControlComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigRoutingModule {}
