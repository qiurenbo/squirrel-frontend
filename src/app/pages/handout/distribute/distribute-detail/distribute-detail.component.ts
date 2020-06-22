import { Component, OnInit } from '@angular/core';
import { Distribute } from 'src/app/models/distribute.model';
import { DistributeService } from 'src/app/core/services/distribute.service';
import { DetailBaseComponent } from 'src/app/core/abstracts/detail-base-component';
import _ from 'lodash';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { NzMessageService } from 'ng-zorro-antd';
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
    private purchaseSerive: PurchaseService,
    private msgService: NzMessageService
  ) {
    super(distributeService);
  }

  isValidStock = true;
  max = 0;

  get _max() {
    if (this.method === 'POST') {
      return this.cloneDetail.Purchase.stock;
    }

    if (this.method === 'PUT') {
      return this.cloneDetail.Purchase.stock + this.cloneDetail.number;
    }
  }
  ngOnInit() {
    this.cloneDetail = this.detail
      ? _.clone(this.detail)
      : { Purchase: { stock: 0 }, Addr: {}, Operator: {} };
    this.selectedDate = this.cloneDetail.date;
    this.max = this._max;
  }

  onChanges(purchase) {
    // Change purchase then change distribute number
    this.cloneDetail.number = 0;
    this.cloneDetail.Purchase.stock = purchase.stock;
    this.max = this._max;
  }
  calStock() {
    if (
      this.cloneDetail.number > 0 &&
      this.max - this.cloneDetail.number >= 0
    ) {
      this.cloneDetail.Purchase.stock = this.max - this.cloneDetail.number;
      this.isValidStock = true;
    } else {
      this.msgService.warning('当前已分配大于最大库存!');
      this.isValidStock = false;
    }
  }
  checkInput() {
    if (
      this.date &&
      this.cloneDetail.addrId &&
      this.cloneDetail.operatorId &&
      this.cloneDetail.purchaseId &&
      this.cloneDetail.number > 0 &&
      this.isValidStock
    ) {
      return true;
    } else {
      return false;
    }
  }

  getResult(): any {
    let result: Distribute = _.clone(this.cloneDetail);
    delete result.Addr;
    delete result.Operator;
    delete result.Purchase;

    return result;
  }
}
