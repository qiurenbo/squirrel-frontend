import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Operator } from 'src/app/models/order.model';
@Component({
  selector: 'app-operator-edit-dlg',
  templateUrl: './operator-edit-dlg.component.html',
  styleUrls: ['./operator-edit-dlg.component.scss'],
})
export class OperatorEditDlgComponent implements OnInit {
  @Input()
  set passValue(value) {
    this.operator = _.clone(value);
  }

  @Input()
  onOk: any;

  isVisible = true;
  operator: Operator;

  constructor() {}

  ngOnInit(): void {}

  checkInput() {
    if (!this.operator.name) return false;

    return true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    this.onOk(this.operator);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
