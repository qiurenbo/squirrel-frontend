import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Camera } from 'src/app/models/order.model';
import * as moment from 'moment';
import { OrderService } from 'src/app/core/order.service';
@Component({
  selector: 'app-camera-detail',
  templateUrl: './camera-detail.component.html',
  styleUrls: ['./camera-detail.component.scss'],
})
export class CameraDetailComponent implements OnInit {
  @Input()
  title: string = null;

  @Input()
  method: string = null;

  @Input()
  camera: Camera = null;

  @Output()
  dataUpdate = new EventEmitter();

  isVisible = true;
  date: Date;
  cameraName: string = null;
  remarks: string = null;
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedStatusId: string = null;
  constructor(private pservice: OrderService) {}

  ngOnInit() {
    this.selectedDate = this.camera?.date;
    this.selectedOperatorId = this.camera?.operatorId;
    this.selectedAddrId = this.camera?.addrId;
    this.selectedStatusId = this.camera?.statusId;
    this.remarks = this.camera?.remarks;
    this.cameraName = this.camera?.name;
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

  get finalCamera() {
    return <Camera>{
      id: this.camera?.id ? this.camera.id : uuidv4(),
      name: this.cameraName,
      date: this.selectedDate,
      operatorId: this.selectedOperatorId,
      addrId: this.selectedAddrId,
      statusId: this.selectedStatusId,
      remarks: this.remarks,
    };
  }

  checkInput() {
    if (
      this.selectedDate &&
      this.selectedOperatorId &&
      this.selectedAddrId &&
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
        this.pservice.postOrderCamera(this.finalCamera).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;

      case 'PUT':
        this.pservice.putOrderCamera(this.finalCamera).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
