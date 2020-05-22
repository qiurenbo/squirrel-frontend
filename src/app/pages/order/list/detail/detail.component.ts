import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { OrderService } from 'src/app/core/order.service';
import { OrderDetail } from 'src/app/models/order.model';
import * as moment from 'moment';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input()
  title: string = null;

  @Input()
  method: string = null;

  @Input()
  detail: OrderDetail = null;

  @Output()
  dateUpdate = new EventEmitter();

  isVisible = true;
  date: Date;
  remarks: string = null;
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedActionId: string = '181d4a19-49a9-475e-bfdc-13f7e597eb4e';
  selectedTargetId: string = null;
  selectedMalfunctionId: string = null;
  selectedStatusId: string = null;
  constructor(private mservice: OrderService) {}

  ngOnInit() {
    this.selectedDate = this.detail?.date;
    this.selectedOperatorId = this.detail?.operatorId;
    this.selectedAddrId = this.detail?.addrId;
    // this.selectedActionId = this.detail?.actionId;
    this.selectedActionId = '181d4a19-49a9-475e-bfdc-13f7e597eb4e';
    this.selectedTargetId = this.detail?.targetId;
    this.selectedMalfunctionId = this.detail?.malfunctionId;
    this.selectedStatusId = this.detail?.statusId;
    this.remarks = this.detail?.remarks;
  }

  get selectedDate() {
    return moment(this.date).format('YYYYMMDD');
  }

  set selectedDate(date: string) {
    this.date = date
      ? new Date(
          parseInt(date.slice(0, 4)),
          parseInt(date.slice(4, 6)) - 1, // the month is 0-indexed https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
          parseInt(date.slice(6))
        )
      : null;
  }

  get order() {
    return <OrderDetail>{
      id: this.detail?.id ? this.detail.id : uuidv4(),
      date: this.selectedDate,
      operatorId: this.selectedOperatorId,
      addrId: this.selectedAddrId,
      // actionId: this.selectedActionId,
      actionId: '181d4a19-49a9-475e-bfdc-13f7e597eb4e', // compatible with api, deprecate this action id
      targetId: this.selectedTargetId,
      malfunctionId: this.selectedMalfunctionId,
      statusId: this.selectedStatusId,
      remarks: this.remarks,
    };
  }

  checkInput() {
    if (
      this.selectedDate &&
      this.selectedOperatorId &&
      this.selectedAddrId &&
      this.selectedActionId &&
      this.selectedTargetId &&
      this.selectedMalfunctionId &&
      this.selectedStatusId
    ) {
      return true;
    }
    return false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    switch (this.method) {
      case 'POST':
        this.mservice.postOrder(this.order).subscribe(() => {
          this.dateUpdate.emit();
        });
        break;

      case 'PUT':
        this.mservice.putOrder(this.order).subscribe(() => {
          this.dateUpdate.emit();
        });
        break;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
