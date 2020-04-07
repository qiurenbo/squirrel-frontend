import { Routes, RouterModule } from '@angular/router';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { NgModule } from '@angular/core';
const routes: Routes = [
  { path: 'global-config', component: GlobalConfigComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersRoutingModule {}
