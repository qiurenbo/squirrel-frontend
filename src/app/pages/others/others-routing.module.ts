import { Routes, RouterModule } from '@angular/router';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { NgModule } from '@angular/core';
import { AccountsComponent } from './accounts/accounts.component';
const routes: Routes = [
  { path: 'global-config', component: GlobalConfigComponent },
  { path: 'accounts', component: AccountsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthersRoutingModule {}
