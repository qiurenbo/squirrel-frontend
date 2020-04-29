import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import { Target } from 'src/app/models/order.model';
import { v4 as uuidv4 } from 'uuid';

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
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getOrderTargets().subscribe((t) => {
      this.targets = t;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    if (!this.name) {
      return;
    }

    this.mservice
      .postOrderTarget({
        id: uuidv4(),
        name: this.name,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(target: Target) {
    this.mservice.deleteOrderTarget(target).subscribe(() => {
      this.loadingData();
    });
  }

  openEditDlg(target: Target) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = target;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (target) => {
    this.mservice.putOrderTarget(target).subscribe(() => {
      this.loadingData();
    });
  };
}
