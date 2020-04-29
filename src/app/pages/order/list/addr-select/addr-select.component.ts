import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Addr } from 'src/app/models/order.model';
import { AddrService } from 'src/app/core/addr.service';

@Component({
  selector: 'app-addr-select',
  templateUrl: './addr-select.component.html',
  styleUrls: ['./addr-select.component.scss'],
})
export class AddrSelectComponent implements OnInit {
  constructor(private addrService: AddrService) {}
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

  ngOnInit(): void {
    this.isAddrsLoading = true;
    this.addrService.getAddrs().subscribe((a) => {
      this.addrs = a;
      this.isAddrsLoading = false;
    });
  }
}
