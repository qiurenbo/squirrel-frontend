import { NgModule } from '@angular/core';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { ConfigRoutingModule } from './config-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddrConfigComponent } from './global-config/addr-config/addr-config.component';
import { AddrEditDlgComponent } from './global-config/addr-config/addr-edit-dlg/addr-edit-dlg.component';
import { OperatorConfigComponent } from './global-config/operator-config/operator-config.component';
import { AccountsComponent } from './access-control/accounts/accounts.component';
import { AccountEditDlgComponent } from './access-control/accounts/account-edit-dlg/account-edit-dlg.component';
import { OperatorEditDlgComponent } from './global-config/operator-config/operator-edit-dlg/operator-edit-dlg.component';
import { AccessControlComponent } from './access-control/access-control.component';

@NgModule({
  declarations: [
    GlobalConfigComponent,
    AddrConfigComponent,
    AddrEditDlgComponent,
    OperatorConfigComponent,
    AccountsComponent,
    AccountEditDlgComponent,
    OperatorEditDlgComponent,
    AccessControlComponent,
  ],
  imports: [ConfigRoutingModule, SharedModule],
})
export class ConfigModule {}
