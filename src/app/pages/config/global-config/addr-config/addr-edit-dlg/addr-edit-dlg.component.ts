import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-addr-edit-dlg',
  templateUrl: './addr-edit-dlg.component.html',
  styleUrls: ['./addr-edit-dlg.component.scss'],
})
export class AddrEditDlgComponent implements OnInit {
  @Input()
  set passValue(value) {
    this.addr = _.clone(value);
  }

  @Input()
  onOk: any;

  isVisible = true;
  addr: any;
  constructor() {}

  ngOnInit(): void {}

  checkInput() {
    if (!this.addr.name) return false;

    return true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    this.onOk(this.addr);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
