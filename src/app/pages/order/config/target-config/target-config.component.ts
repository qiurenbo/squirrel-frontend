import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import * as _ from 'lodash';
import { OrderService } from 'src/app/core/services/order.service';
import { Target } from 'src/app/models/order.model';

import { NzCascaderOption, NzMessageService } from 'ng-zorro-antd';
import { TargetEditDlgComponent } from './target-edit-dlg/target-edit-dlg.component';
@Component({
  selector: 'app-target-config',
  templateUrl: './target-config.component.html',
  styleUrls: ['./target-config.component.scss'],
})
export class TargetConfigComponent implements OnInit {
  name: string = null;
  targets: Target[] = null;
  selectedTarget: string = null;
  isLoading = false;
  total: number;
  pageSize = 6;
  pageIndex = 1;
  minorTargetTypeId: string = null;
  types: NzCascaderOption[];
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadData() {
    this.isLoading = true;

    this.mservice
      .getOrderTargets({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((t) => {
        this.total = parseInt(t.headers.get('X-Total-Count'));
        this.targets = t.body;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    this.loadData();
  }

  add() {
    if (!this.name || !this.minorTargetTypeId) {
      return;
    }

    this.mservice
      .postOrderTarget({
        name: this.name,
        minorTargetTypeId: this.minorTargetTypeId,
      })
      .subscribe(() => {
        this.messageService.info('新增成功');
        this.loadData();
      });
  }

  delete(target: Target) {
    this.mservice.deleteOrderTarget(target).subscribe(
      () => {
        this.messageService.info('删除成功');
        this.loadData();
      },
      (err) => {
        this.messageService.info('删除失败！关联字段未删除');
      }
    );
  }

  openEditDlg(target: Target) {
    const factory = this.resolver.resolveComponentFactory(
      TargetEditDlgComponent
    );
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.target = _.clone(target);
    dlg.instance.onOk = this.OnOk;
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }

  OnOk = (target) => {
    this.mservice.putOrderTarget(target).subscribe(() => {
      this.messageService.info('修改成功');
      this.loadData();
    });
  };
}
