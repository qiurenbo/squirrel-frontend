import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import { v4 as uuidv4 } from 'uuid';
import { Action, Malfunction } from 'src/app/models/order.model';
import { NzCascaderOption } from 'ng-zorro-antd';
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
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getOrderActions().subscribe((a) => {
      this.actions = a;
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
        id: uuidv4(),
        name: this.actionName,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(action: Action) {
    this.mservice.deleteOrderAction(action).subscribe(() => {
      this.loadingData();
    });
  }

  openEditDlg(malfunction: Malfunction) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = malfunction;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (action: Action) => {
    this.mservice.putOrderAction(action).subscribe(() => {
      this.loadingData();
    });
  };
}
