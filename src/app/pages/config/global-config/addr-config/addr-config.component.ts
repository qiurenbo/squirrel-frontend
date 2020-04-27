import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { Addr } from 'src/app/models/maintenance.model';
import { v4 as uuidv4 } from 'uuid';
import { AddrEditDlgComponent } from './addr-edit-dlg/addr-edit-dlg.component';
import { AddrService } from 'src/app/core/addr.service';
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
  constructor(
    private addrService: AddrService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.addrService.getAddrs().subscribe((a) => {
      this.addrs = a;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.loadingData();
  }

  checkInput() {
    if (this.name && this.addr && this.tel && this.type) {
      return true;
    }
    return false;
  }

  add() {
    if (!this.checkInput()) return;
    this.addrService
      .postAddr({
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
    this.addrService.deleteAddr(addr).subscribe(() => {
      this.loadingData();
    });
  }

  openEditDlg(addr: Addr) {
    const factory = this.resolver.resolveComponentFactory(AddrEditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = addr;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (addr: Addr) => {
    this.addrService.putAddr(addr).subscribe(() => {
      this.loadingData();
    });
  };
}
