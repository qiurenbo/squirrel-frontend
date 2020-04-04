import { NgModule } from '@angular/core';

import { MaintenanceRoutingModule } from './maintenance-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigComponent } from './config/config.component';

@NgModule({
  imports: [MaintenanceRoutingModule, SharedModule],
  declarations: [ListComponent, DetailComponent, StatsComponent, ConfigComponent],
  exports: []
})
export class MaintenanceModule {}
