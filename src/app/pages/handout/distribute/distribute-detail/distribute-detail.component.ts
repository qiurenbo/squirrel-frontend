import { Component, OnInit } from '@angular/core';
import { Distribute } from 'src/app/models/distribute.model';
import { DistributeService } from 'src/app/core/services/distribute.service';
import { DetailBaseComponent } from 'src/app/core/abstracts/detail-base-component';
import _ from 'lodash';
import { PurchaseService } from 'src/app/core/services/purchase.service';
@Component({
  selector: 'app-distribute-detail',
  templateUrl: './distribute-detail.component.html',
  styleUrls: ['./distribute-detail.component.scss'],
})
export class DistributeDetailComponent extends DetailBaseComponent<
  Distribute,
  DistributeService
> {
  constructor(
    private distributeService: DistributeService,
    private purchaseSerive: PurchaseService
  ) {
    super(distributeService);
  }

  stock = 0;
  ngOnInit() {
    this.cloneDetail = this.detail
      ? _.clone(this.detail)
      : { Purchase: {}, Addr: {}, Operator: {} };
    this.selectedDate = this.cloneDetail.date;
  }

  onChanges(purchase) {
    this.cloneDetail.Purchase.stock = purchase.stock;
    this.stock = this.cloneDetail.Purchase.stock;
  }
  calStock() {
    if (this.stock - this.cloneDetail.number >= 0) {
      this.cloneDetail.Purchase.stock = this.stock - this.cloneDetail.number;
    }
  }
  checkInput() {
    if (
      this.date &&
      this.cloneDetail.addrId &&
      this.cloneDetail.operatorId &&
      this.cloneDetail.purchaseId &&
      this.cloneDetail.number &&
      this.stock - this.cloneDetail.number >= 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
