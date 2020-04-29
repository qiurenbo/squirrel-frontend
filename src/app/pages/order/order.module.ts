import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './list/detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigComponent } from './config/config.component';
import { TargetConfigComponent } from './config/target-config/target-config.component';
import { MalfunctionConfigComponent } from './config/malfunction-config/malfunction-config.component';
import { ActionConfigComponent } from './config/action-config/action-config.component';
import { AddrSelectComponent } from './list/addr-select/addr-select.component';
import { OperatorSelectComponent } from './list/operator-select/operator-select.component';
import { TargetSelectComponent } from './list/target-select/target-select.component';
import { MalfunctionSelectComponent } from './list/malfunction-select/malfunction-select.component';
import { ActionSelectComponent } from './list/action-select/action-select.component';

import { EditDlgComponent } from './config/edit-dlg/edit-dlg.component';
@NgModule({
  imports: [OrderRoutingModule, SharedModule],
  declarations: [
    ListComponent,
    DetailComponent,
    StatsComponent,
    ConfigComponent,
    TargetConfigComponent,
    MalfunctionConfigComponent,
    ActionConfigComponent,
    AddrSelectComponent,
    OperatorSelectComponent,
    TargetSelectComponent,
    MalfunctionSelectComponent,
    ActionSelectComponent,
    EditDlgComponent,
  ],
  exports: [],
})
export class OrderModule {}
