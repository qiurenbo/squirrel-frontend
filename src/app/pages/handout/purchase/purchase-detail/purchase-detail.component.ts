import { Component, OnInit } from '@angular/core';

import _ from 'lodash';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseService } from 'src/app/core/purchase.service';
import { AbstractDetailComponent } from 'src/app/core/abstract/detail-base-component';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
})
export class PurchaseDetailComponent
  extends AbstractDetailComponent<Purchase, PurchaseService>
  implements OnInit {
  constructor(private purchaseService: PurchaseService) {
    super(purchaseService);
  }
  ngOnInit() {
    this.cloneDetail = this.detail ? _.clone(this.detail) : {};
    this.selectedDate = this.cloneDetail.date;
  }
  calPrice() {
    this.cloneDetail.unitPrice = +this.cloneDetail.unitPrice;
    this.cloneDetail.number = +this.cloneDetail.number;
    this.cloneDetail.totalPrice =
      Math.floor(this.cloneDetail.unitPrice * this.cloneDetail.number * 100) /
      100;
  }
  checkInput() {
    return true;
  }
}
