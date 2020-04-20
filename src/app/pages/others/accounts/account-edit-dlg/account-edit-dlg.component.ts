import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-account-edit-dlg',
  templateUrl: './account-edit-dlg.component.html',
  styleUrls: ['./account-edit-dlg.component.scss'],
})
export class AccountEditDlgComponent implements OnInit {
  accounts: Account[];

  @Input()
  set passValue(value) {
    this.accounts = _.clone(value);
  }

  @Input()
  onOk: any;

  constructor() {}

  ngOnInit(): void {}
}
