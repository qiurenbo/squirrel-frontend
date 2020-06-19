import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { Project } from 'src/app/models/order.model';
import * as moment from 'moment';
import { OrderService } from 'src/app/core/services/order.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  @Input()
  title: string = null;

  @Input()
  method: string = null;

  @Input()
  project: Project = null;

  @Output()
  dataUpdate = new EventEmitter();

  isVisible = true;
  date: Date;
  projectName: string = null;
  remarks: string = null;
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedStatusId: string = null;
  constructor(private pservice: OrderService) {}

  ngOnInit() {
    this.selectedDate = this.project?.date;
    this.selectedOperatorId = this.project?.operatorId;
    this.selectedAddrId = this.project?.addrId;
    this.selectedStatusId = this.project?.statusId;
    this.remarks = this.project?.remarks;
    this.projectName = this.project?.name;
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

  get finalProject() {
    return <Project>{
      id: this.project?.id ? this.project.id : uuidv4(),
      name: this.projectName,
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
        this.pservice.postOrderProject(this.finalProject).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;

      case 'PUT':
        this.pservice.putOrderProject(this.finalProject).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
