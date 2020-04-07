import { Component, OnInit } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { Addr } from 'src/app/models/maintenance.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-addr-config',
  templateUrl: './addr-config.component.html',
  styleUrls: ['./addr-config.component.scss'],
})
export class AddrConfigComponent implements OnInit {
  isAddrsLoading = false;
  name: string;
  addr: string;
  tel: string;
  type: string;
  addrs: Addr[] = null;
  isLoading = false;
  currentId: string = null;
  constructor(private mservice: MaintainceService) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getMaintainceAddrs().subscribe((a) => {
      this.addrs = a;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    this.mservice
      .postMaintainceAddr({
        id: uuidv4(),
        name: this.name,
        addr: this.addr,
        tel: this.tel,
        type: this.type,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(addr: Addr) {
    this.mservice.deleteMaintainceAddr(addr).subscribe(() => {
      this.loadingData();
    });
  }

  makeEditable(id: string) {
    this.currentId = id;
  }

  saveData(addr: Addr) {
    this.currentId = null;
    this.mservice.putMaintainceAddr(addr).subscribe(() => {});
  }
}
