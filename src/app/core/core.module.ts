import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaintainceService } from './maintenance.service';

@NgModule({
  declarations: [MaintainceService],
  imports: [SharedModule],
  exports: [MaintainceService]
})
export class CoreModule {}
