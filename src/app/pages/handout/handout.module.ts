import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandoutRoutingModule } from './handout-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseDetailComponent } from './purchase/purchase-detail/purchase-detail.component';
import { DistributeComponent } from './distribute/distribute.component';
import { DistributeDetailComponent } from './distribute/distribute-detail/distribute-detail.component';

@NgModule({
  declarations: [PurchaseComponent, PurchaseDetailComponent, DistributeComponent, DistributeDetailComponent],
  imports: [CommonModule, HandoutRoutingModule, SharedModule],
})
export class HandoutModule {}
