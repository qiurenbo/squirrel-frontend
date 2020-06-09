import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { Operator } from 'src/app/models/order.model';
import { v4 as uuidv4 } from 'uuid';
import { OperatorService } from 'src/app/core/operator.service';
import { OperatorEditDlgComponent } from './operator-edit-dlg/operator-edit-dlg.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-operator-config',
  templateUrl: './operator-config.component.html',
  styleUrls: ['./operator-config.component.scss'],
})
export class OperatorConfigComponent implements OnInit {
  isOperatorsLoading = false;
  name: string;
  total: number;
  tel: string;
  department: string;
  operators: Operator[] = null;
  isLoading = false;
  currentId: string = null;
  pageSize = 6;
  pageIndex = 1;
  constructor(
    private opService: OperatorService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadData() {
    this.isLoading = true;
    this.opService
      .getOperators({
        limit: this.pageSize,
        offset: (this.pageIndex - 1) * this.pageSize,
      })
      .subscribe((o) => {
        this.total = parseInt(o.headers.get('X-Total-Count'));
        this.operators = o.body;
        this.isLoading = false;
      });
  }
  ngOnInit(): void {
    this.loadData();
  }

  checkInput() {
    if (this.name && this.department && this.tel) {
      return true;
    }
    return false;
  }
  onPageIndexChange(index: number) {
    this.loadData();
  }

  add() {
    if (!this.checkInput()) return;
    this.opService
      .postOperator({
        //id: uuidv4(),
        name: this.name,
        department: this.department,
        tel: this.tel,
      })
      .subscribe(() => {
        this.messageService.info('新增成功');
        this.loadData();
      });
  }

  delete(operator: Operator) {
    this.opService.deleteOperator(operator).subscribe(
      () => {
        this.messageService.info('删除成功');
        this.loadData();
      },
      (error) => {
        this.messageService.info('删除失败！关联字段未删除');
      }
    );
  }

  openEditDlg(operator: Operator) {
    const factory = this.resolver.resolveComponentFactory(
      OperatorEditDlgComponent
    );
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = operator;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (operator: Operator) => {
    this.opService.putOperator(operator).subscribe(() => {
      this.messageService.info('修改成功');
      this.loadData();
    });
  };
}
