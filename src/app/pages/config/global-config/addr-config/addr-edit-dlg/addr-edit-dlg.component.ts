import { Component, OnInit, Input, setTestabilityGetter } from '@angular/core';
import * as _ from 'lodash';
import { DivisionService } from 'src/app/core/divisons.service';
import { NzCascaderOption } from 'ng-zorro-antd';
import { Addr } from 'src/app/models/order.model';
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

  division: string[] = null;
  divisions: NzCascaderOption[];
  isVisible = true;
  addr: Addr;

  constructor(private divisionService: DivisionService) {}

  ngOnInit(): void {
    this.divisionService.getDivisions().subscribe((d) => {
      this.divisions = this.divisionService.getCascaderDivsions(d.body);
      this.division = this.searchDivision();
    });
  }

  searchDivision() {
    for (const area of this.divisions) {
      for (const street of area.children) {
        if (street.value === this.addr.streetId) {
          return [area.label, street.label];
        }
      }
    }
  }

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

  onChanges(values: any): void {
    if (values[1]) {
      this.addr.streetId = values[1].value;
    }
  }
}
