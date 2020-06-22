import { Component } from '@angular/core';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { DetailBaseComponent } from 'src/app/core/abstracts/detail-base-component';
import _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
})
export class PurchaseDetailComponent extends DetailBaseComponent<
  Purchase,
  PurchaseService
> {
  constructor(
    private purchaseService: PurchaseService,
    private msgService: NzMessageService
  ) {
    super(purchaseService);
  }
  distributed = 0;
  deleteNoUseProps(): void {}
  ngOnInit() {
    this.cloneDetail = this.detail
      ? _.clone(this.detail)
      : { unitPrice: 0, number: 0, totalPrice: 0 };
    this.selectedDate = this.cloneDetail.date;
    this.distributed = this.detail
      ? this.cloneDetail.number - this.cloneDetail.stock
      : 0;
  }

  calPriceAndStock() {
    if (this.cloneDetail.number - this.distributed < 0) {
      this.msgService.warning('修改后数量小于当前已分配数量!');
      return;
    }
    this.cloneDetail.unitPrice = +this.cloneDetail.unitPrice;
    this.cloneDetail.number = +this.cloneDetail.number;
    this.cloneDetail.totalPrice =
      Math.floor(this.cloneDetail.unitPrice * this.cloneDetail.number * 100) /
      100;
  }
  checkInput() {
    if (
      this.date &&
      this.cloneDetail.productName &&
      this.cloneDetail.projectName &&
      this.cloneDetail.unitPrice &&
      this.cloneDetail.number > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  getResult(): any {
    let result: Purchase = _.clone(this.cloneDetail);
    return result;
  }
}
