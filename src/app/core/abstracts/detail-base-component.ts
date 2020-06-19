import { Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { IBaseHttpService } from '../interfaces/http-interface.service';
import { IDetail } from '../interfaces/detail-interface';

export abstract class DetailBaseComponent<
  T extends IDetail,
  S extends IBaseHttpService<T>
> {
  @Input()
  title: string = null;
  @Input()
  method: string = null;

  @Input()
  detail: T = null;

  @Output()
  dataUpdate = new EventEmitter();

  isVisible = true;
  date: Date = null;
  cloneDetail: T = null;
  constructor(private service: S) {}

  get final() {
    this.cloneDetail.date = this.selectedDate;
    if (!this.cloneDetail.id) {
      this.cloneDetail.id = uuidv4();
    }
    return this.cloneDetail;
  }

  abstract checkInput(): boolean;

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
        this.service.post(this.final).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;

      case 'PUT':
        this.service.put(this.final).subscribe(() => {
          this.dataUpdate.emit();
        });
        break;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
