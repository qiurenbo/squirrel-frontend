import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import { Target } from 'src/app/models/order.model';

import { EditDlgComponent } from 'src/app/pages/order/config/edit-dlg/edit-dlg.component';
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
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
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
    if (!this.name) {
      return;
    }

    this.mservice
      .postOrderTarget({
        //id: uuidv4(),
        name: this.name,
      })
      .subscribe(() => {
        this.loadData();
      });
  }

  delete(target: Target) {
    this.mservice.deleteOrderTarget(target).subscribe(() => {
      this.loadData();
    });
  }

  openEditDlg(target: Target) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = target;
    dlg.instance.onOk = this.OnOk;
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }
  OnOk = (target) => {
    this.mservice.putOrderTarget(target).subscribe(() => {
      this.loadData();
    });
  };
}
