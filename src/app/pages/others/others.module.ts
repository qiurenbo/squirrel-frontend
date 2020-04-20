import { NgModule } from '@angular/core';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { OthersRoutingModule } from './others-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddrConfigComponent } from './global-config/addr-config/addr-config.component';
import { AddrEditDlgComponent } from './global-config/addr-config/addr-edit-dlg/addr-edit-dlg.component';
import { OperatorConfigComponent } from './global-config/operator-config/operator-config.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountEditDlgComponent } from './accounts/account-edit-dlg/account-edit-dlg.component';

@NgModule({
  declarations: [GlobalConfigComponent, AddrConfigComponent, AddrEditDlgComponent, OperatorConfigComponent, AccountsComponent, AccountEditDlgComponent],
  imports: [OthersRoutingModule, SharedModule],
})
export class OthersModule {}
