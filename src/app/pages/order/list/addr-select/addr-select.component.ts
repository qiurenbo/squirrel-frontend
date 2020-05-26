import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Addr } from 'src/app/models/order.model';
import { AddrService } from 'src/app/core/addr.service';
import { NzCascaderOption, NzButtonModule } from 'ng-zorro-antd';
import { DivisionService } from 'src/app/core/divisons.service';
@Component({
  selector: 'app-addr-select',
  templateUrl: './addr-select.component.html',
  styleUrls: ['./addr-select.component.scss'],
})
export class AddrSelectComponent implements OnInit {
  constructor(private addrService: AddrService) {}
  addrs: NzCascaderOption[];
  defaultAddrOption: string[];

  @Output()
  addrIdChange = new EventEmitter();

  @Input()
  addrId: string;

  getOptions() {
    this.addrService.getAddrs().subscribe((a) => {
      this.addrs = this.addrService.getCascaderAddrs(a.body);
      if (this.addrId) {
        this.defaultAddrOption = this.addrService.getDefaultAddrOption(
          a.body,
          this.addrId
        );
      }
    });
  }

  ngOnInit(): void {
    this.getOptions();
  }
  onChanges(selectedCascaderOptions: any): void {
    if (selectedCascaderOptions[2]) {
      this.addrId = selectedCascaderOptions[2].value;
    }

    if (selectedCascaderOptions.length === 0) {
      this.addrId = null;
    }

    this.addrIdChange.emit(this.addrId);
  }
}
