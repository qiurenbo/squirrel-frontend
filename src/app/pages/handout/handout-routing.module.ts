import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [{ path: 'purchase', component: PurchaseComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandoutRoutingModule {}
