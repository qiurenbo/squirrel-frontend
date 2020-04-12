import { NgModule } from '@angular/core';

import { MaintenanceRoutingModule } from './maintenance-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigComponent } from './config/config.component';
import { TargetConfigComponent } from './config/target-config/target-config.component';
import { MalfunctionConfigComponent } from './config/malfunction-config/malfunction-config.component';
import { ActionConfigComponent } from './config/action-config/action-config.component';
import { AddrSelectComponent } from './list/addr-select/addr-select.component';

@NgModule({
  imports: [MaintenanceRoutingModule, SharedModule],
  declarations: [
    ListComponent,
    DetailComponent,
    StatsComponent,
    ConfigComponent,
    TargetConfigComponent,
    MalfunctionConfigComponent,
    ActionConfigComponent,
    AddrSelectComponent,
  ],
  exports: [],
})
export class MaintenanceModule {}
