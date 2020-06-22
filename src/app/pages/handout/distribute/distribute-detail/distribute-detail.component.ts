import { Component, OnInit } from '@angular/core';
import { Distribute } from 'src/app/models/distribute.model';
import { DistributeService } from 'src/app/core/services/distribute.service';
import { DetailBaseComponent } from 'src/app/core/abstracts/detail-base-component';
import _ from 'lodash';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-distribute-detail',
  templateUrl: './distribute-detail.component.html',
  styleUrls: ['./distribute-detail.component.scss'],
})
export class DistributeDetailComponent extends DetailBaseComponent<
  Distribute,
  DistributeService
> {
  isValidStock = true;
  max = 0;
  number = 0;
  numberChanged: Subject<number> = new Subject<number>();
  constructor(
    private distributeService: DistributeService,
    private purchaseSerive: PurchaseService,
    private msgService: NzMessageService
  ) {
    super(distributeService);
    this.numberChanged
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((number) => {
        this.number = number;
        this.calStock(number);
      });
  }

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

  onNumberChanged(number) {
    this.numberChanged.next(number);
  }

  onChanges(purchase) {
    // Change purchase then change distribute number
    this.cloneDetail.number = 0;
    this.cloneDetail.Purchase.stock = purchase.stock;
    this.max = this._max;
  }

  checkNumber(number): boolean {
    if (number > 0 && this.max - number >= 0) {
      return true;
    } else if (number <= 0) {
      this.msgService.warning('当前分配必须大于0');
      return false;
    } else {
      this.msgService.warning('当前已分配大于最大库存!');
      return false;
    }
  }

  calStock(number) {
    if (this.checkNumber(number)) {
      this.cloneDetail.Purchase.stock = this.max - number;
      this.cloneDetail.number = number;
    }
  }
  checkInput() {
    if (!this.checkNumber(this.number)) {
      return false;
    }

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
