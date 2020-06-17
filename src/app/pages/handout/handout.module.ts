import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandoutRoutingModule } from './handout-routing.module';
import { PurchaseComponent } from './purchase/purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PurchaseDetailComponent } from './purchase/purchase-detail/purchase-detail.component';

@NgModule({
  declarations: [PurchaseComponent, PurchaseDetailComponent],
  imports: [CommonModule, HandoutRoutingModule, SharedModule],
})
export class HandoutModule {}
