import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { Addr } from 'src/app/models/order.model';
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
  total: number;
  addrs: Addr[] = null;
  isLoading = false;
  currentId: string = null;

  pageSize = 6;
  pageIndex = 1;
  constructor(
    private addrService: AddrService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadData() {
    this.isLoading = true;
    this.addrService
      .getAddrs({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((a) => {
        this.total = parseInt(a.headers.get('X-Total-Count'));
        this.addrs = a.body;
        this.isLoading = false;
      });
  }
  ngOnInit(): void {
    this.loadData();
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
        //id: uuidv4(),
        name: this.name,
        addr: this.addr,
        tel: this.tel,
        type: this.type,
      })
      .subscribe(() => {
        this.loadData();
      });
  }

  delete(addr: Addr) {
    this.addrService.deleteAddr(addr).subscribe(() => {
      this.loadData();
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
      this.loadData();
    });
  };

  onPageIndexChange(index: number) {
    this.loadData();
  }
}
