import { NgModule } from '@angular/core';
import { GlobalConfigComponent } from './global-config/global-config.component';
import { OthersRoutingModule } from './others-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddrConfigComponent } from './global-config/addr-config/addr-config.component';

@NgModule({
  declarations: [GlobalConfigComponent, AddrConfigComponent],
  imports: [OthersRoutingModule, SharedModule],
})
export class OthersModule {}
