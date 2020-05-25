import { Component, OnInit, Input } from '@angular/core';

import { Target } from 'src/app/models/order.model';
@Component({
  selector: 'app-target-edit-dlg',
  templateUrl: './target-edit-dlg.component.html',
  styleUrls: ['./target-edit-dlg.component.scss'],
})
export class TargetEditDlgComponent implements OnInit {
  @Input()
  target: Target;

  @Input()
  onOk: any;

  isVisible = true;

  constructor() {}

  ngOnInit(): void {}

  checkInput() {
    if (!this.target.name || !this.target.minorTargetTypeId) return false;

    return true;
  }

  handleOk(): void {
    if (!this.checkInput()) {
      return;
    }

    this.isVisible = false;

    this.onOk(this.target);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
