import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { Addr } from 'src/app/models/maintenance.model';

@Component({
  selector: 'app-addr-select',
  templateUrl: './addr-select.component.html',
  styleUrls: ['./addr-select.component.scss'],
})
export class AddrSelectComponent implements OnInit {
  constructor(private mservice: MaintainceService) {}
  isAddrsLoading = false;

  addrs: Addr[];

  addrIdValue: string;

  @Output()
  addrIdChange = new EventEmitter();

  @Input()
  get addrId() {
    return this.addrIdValue;
  }

  set addrId(val) {
    this.addrIdValue = val;
    this.addrIdChange.emit(this.addrIdValue);
  }

  ngOnInit(): void {}

  onAddrsOpenChange() {
    this.isAddrsLoading = true;
    this.mservice.getMaintainceAddrs().subscribe((a) => {
      this.addrs = a;
      this.isAddrsLoading = false;
    });
  }
}
