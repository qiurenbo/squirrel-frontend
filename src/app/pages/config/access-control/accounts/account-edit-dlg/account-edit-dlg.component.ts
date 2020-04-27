import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-account-edit-dlg',
  templateUrl: './account-edit-dlg.component.html',
  styleUrls: ['./account-edit-dlg.component.scss'],
})
export class AccountEditDlgComponent implements OnInit {
  isVisible = true;
  account: any;

  @Input()
  set passValue(value) {
    this.account = _.clone(value);
  }

  @Input()
  onOk: any;

  constructor() {}

  ngOnInit(): void {}

  checkInput() {
    if (!this.account.username) return false;

    return true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    this.onOk(this.account);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
