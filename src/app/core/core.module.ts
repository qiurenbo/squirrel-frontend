import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceService } from './maintenance.service';

@NgModule({
  declarations: [MaintenanceService],
  imports: [SharedModule],
  exports: [MaintenanceService],
})
export class CoreModule {}
