import { NgModule } from '@angular/core';

import { MaintainanceRoutingModule } from './maintainance-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [MaintainanceRoutingModule, SharedModule],
  declarations: [ListComponent, DetailComponent, StatsComponent],
  exports: []
})
export class MaintainanceModule {}
