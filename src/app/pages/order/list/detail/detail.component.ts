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
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedActionId: string = null;
  selectedTargetId: string = null;
  selectedMalfunctionId: string = null;

  constructor(private mservice: OrderService) {}

  ngOnInit() {
    this.selectedDate = this.detail?.date;
    this.selectedOperatorId = this.detail?.operatorId;
    this.selectedAddrId = this.detail?.addrId;
    this.selectedActionId = this.detail?.actionId;
    this.selectedTargetId = this.detail?.targetId;
    this.selectedMalfunctionId = this.detail?.malfunctionId;
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
      actionId: this.selectedActionId,
      targetId: this.selectedTargetId,
      malfunctionId: this.selectedMalfunctionId,
    };
  }

  checkInput() {
    if (
      this.selectedDate &&
      this.selectedOperatorId &&
      this.selectedAddrId &&
      this.selectedActionId &&
      this.selectedTargetId &&
      this.selectedMalfunctionId
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

      case 'PUT':
        this.mservice.putOrder(this.order).subscribe(() => {
          this.dateUpdate.emit();
        });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
