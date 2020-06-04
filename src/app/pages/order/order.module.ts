import { NgModule } from '@angular/core';

import { OrderRoutingModule } from './order-routing.module';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './list/detail/detail.component';
import { StatsComponent } from './stats/stats.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigComponent } from './config/config.component';
import { TargetConfigComponent } from './config/target-config/target-config.component';
import { MalfunctionConfigComponent } from './config/malfunction-config/malfunction-config.component';

import { EditDlgComponent } from './config/edit-dlg/edit-dlg.component';
import { StatusSelectComponent } from '../../shared/components/status-select/status-select.component';
import { TargetTypeCascaderComponent } from './config/target-config/target-type-cascader/target-type-cascader.component';
import { TargetEditDlgComponent } from './config/target-config/target-edit-dlg/target-edit-dlg.component';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
@NgModule({
  imports: [OrderRoutingModule, SharedModule],
  declarations: [
    ListComponent,
    DetailComponent,
    StatsComponent,
    ConfigComponent,
    TargetConfigComponent,
    MalfunctionConfigComponent,

    EditDlgComponent,
    StatusSelectComponent,
    TargetTypeCascaderComponent,
    TargetEditDlgComponent,
    ProjectComponent,
    ProjectDetailComponent,
  ],
  exports: [],
})
export class OrderModule {}
