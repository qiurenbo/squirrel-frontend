import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

import { Malfunction } from 'src/app/models/order.model';
import * as _ from 'lodash';
import { EditDlgComponent } from 'src/app/pages/order/config/edit-dlg/edit-dlg.component';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-malfunction-config',
  templateUrl: './malfunction-config.component.html',
  styleUrls: ['./malfunction-config.component.scss'],
})
export class MalfunctionConfigComponent implements OnInit {
  malfunctionName: string;
  malfunctions: Malfunction[] = null;
  selectedMalfunctionId: string = null;
  total: number;
  isLoading = false;
  editMalfunction: Malfunction;
  pageSize = 6;
  pageIndex = 1;
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadData() {
    this.isLoading = true;
    this.mservice
      .getOrderMalfunctions({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((m) => {
        this.total = parseInt(m.headers.get('X-Total-Count'));
        this.malfunctions = m.body;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  add() {
    if (!this.malfunctionName) {
      return;
    }

    this.mservice
      .postOrderMalfunction({
        //id: uuidv4(),
        name: this.malfunctionName,
      })
      .subscribe(() => {
        this.messageService.info('新增成功');
        this.loadData();
      });
  }

  delete(malfunction: Malfunction) {
    this.mservice.deleteOrderMalfunction(malfunction).subscribe(
      () => {
        this.messageService.info('删除成功');
        this.loadData();
      },
      (err) => {
        this.messageService.info('删除失败！关联字段未删除');
      }
    );
  }

  saveData(malfunction: Malfunction) {
    this.mservice.putOrderMalfunction(malfunction).subscribe(() => {});
  }

  openEditDlg(malfunction: Malfunction) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = malfunction;
    dlg.instance.onOk = this.OnOk;
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }
  OnOk = (malfunction) => {
    this.mservice.putOrderMalfunction(malfunction).subscribe(() => {
      this.messageService.info('修改成功');
      this.loadData();
    });
  };
}
