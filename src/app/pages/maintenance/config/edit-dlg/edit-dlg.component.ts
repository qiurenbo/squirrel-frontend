import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-edit-dlg',
  templateUrl: './edit-dlg.component.html',
  styleUrls: ['./edit-dlg.component.scss'],
})
export class EditDlgComponent implements OnInit {
  @Input()
  set passValue(value) {
    this.clone = _.clone(value);
  }

  @Input()
  onOk: any;

  isVisible = true;
  clone: any;
  constructor() {}

  ngOnInit(): void {}

  checkInput() {
    if (!this.clone.name) return false;

    return true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    this.onOk(this.clone);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
