import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaintainceService } from './maintainances.service';

@NgModule({
  declarations: [MaintainceService],
  imports: [SharedModule],
  exports: [MaintainceService]
})
export class CoreModule {}
