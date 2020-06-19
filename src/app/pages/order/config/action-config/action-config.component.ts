import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';

import { Action, Malfunction } from 'src/app/models/order.model';
import { NzCascaderOption, NzMessageService } from 'ng-zorro-antd';
import * as _ from 'lodash';
import { EditDlgComponent } from '../edit-dlg/edit-dlg.component';

@Component({
  selector: 'app-action-config',
  templateUrl: './action-config.component.html',
  styleUrls: ['./action-config.component.scss'],
})
export class ActionConfigComponent implements OnInit {
  actionName: string;
  actions: Action[] = null;
  isLoading = false;
  currentId: string = null;
  option: NzCascaderOption = null;
  total: number;
  pageSize: number = 6;
  pageIndex: number = 1;
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadingData() {
    this.isLoading = true;
    this.mservice
      .getOrderActions({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((a) => {
        this.total = parseInt(a.headers.get('X-Total-Count'));
        this.actions = a.body;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  onSelectionChange(option: NzCascaderOption) {
    this.option = option;
  }

  get selectedTargetId() {
    return this.option[0].value;
  }

  get selectedMalfunctionId() {
    return this.option[1].value;
  }

  checkInput() {
    if (!this.actionName) return false;
    return true;
  }

  add() {
    if (!this.checkInput()) return;
    this.mservice
      .postOrderAction({
        //id: uuidv4(),
        name: this.actionName,
      })
      .subscribe(() => {
        this.messageService.info('新增成功');
        this.loadingData();
      });
  }

  delete(action: Action) {
    this.mservice.deleteOrderAction(action).subscribe(() => {
      this.loadingData();
      this.messageService.info('删除成功');
    });
  }

  openEditDlg(malfunction: Malfunction) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = malfunction;
    dlg.instance.onOk = this.OnOk;
  }

  onPageIndexChange($event) {
    this.loadingData();
  }
  OnOk = (action: Action) => {
    this.mservice.putOrderAction(action).subscribe(() => {
      this.messageService.info('修改成功');
      this.loadingData();
    });
  };
}
