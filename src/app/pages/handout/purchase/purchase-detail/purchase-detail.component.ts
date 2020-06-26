import { Component } from '@angular/core';
import { Purchase } from 'src/app/models/purchase.model';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { DetailBaseComponent } from 'src/app/core/abstracts/detail-base-component';
import _ from 'lodash';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.scss'],
})
export class PurchaseDetailComponent extends DetailBaseComponent<
  Purchase,
  PurchaseService
> {
  distributed = 0;
  number = 0;
  numberChanged: Subject<number> = new Subject<number>();

  constructor(
    private purchaseService: PurchaseService,
    private msgService: NzMessageService
  ) {
    super(purchaseService);
    this.numberChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((number) => {
        this.number = number;
        this.calPriceAndStock(number);
      });
  }

  checkNumber(number) {
    if (number - this.distributed < 0) {
      this.msgService.warning('修改后数量小于当前已分配数量!');
      return false;
    } else {
      return true;
    }
  }

  ngOnInit() {
    this.cloneDetail = this.detail
      ? _.clone(this.detail)
      : { unitPrice: 0, number: 0, totalPrice: 0 };
    this.selectedDate = this.cloneDetail.date;
    this.distributed = this.detail
      ? this.cloneDetail.number - this.cloneDetail.stock
      : 0;

    this.number = this.cloneDetail.number;
  }

  onNumberChange(number) {
    this.numberChanged.next(number);
  }

  calPriceAndStock(number) {
    if (!this.checkNumber(number)) {
      return false;
    }
    this.cloneDetail.unitPrice = +this.cloneDetail.unitPrice;
    this.cloneDetail.number = +number;
    // new stock should be the new number minus distributed number
    this.cloneDetail.stock = +number - this.distributed;
    this.cloneDetail.totalPrice =
      Math.floor(this.cloneDetail.unitPrice * number * 100) / 100;
  }

  checkInput() {
    if (!this.checkNumber(this.number)) {
      return false;
    }
    if (
      this.date &&
      this.cloneDetail.productName &&
      this.cloneDetail.projectName &&
      this.cloneDetail.unitPrice
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
