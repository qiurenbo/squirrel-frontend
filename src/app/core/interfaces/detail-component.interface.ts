import { EventEmitter } from '@angular/core';
import { IDetail } from './detail.interface';

export interface IDetailBaseComponent<DataType extends IDetail> {
  title: string;

  method: string;

  detail: DataType;

  dataUpdate: EventEmitter<any>;
}
