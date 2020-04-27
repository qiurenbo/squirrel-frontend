import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { Operator } from 'src/app/models/maintenance.model';
import { v4 as uuidv4 } from 'uuid';
import { OperatorService } from 'src/app/core/operator.service';
import { OperatorEditDlgComponent } from './operator-edit-dlg/operator-edit-dlg.component';

@Component({
  selector: 'app-operator-config',
  templateUrl: './operator-config.component.html',
  styleUrls: ['./operator-config.component.scss'],
})
export class OperatorConfigComponent implements OnInit {
  isOperatorsLoading = false;
  name: string;

  tel: string;
  department: string;
  operators: Operator[] = null;
  isLoading = false;
  currentId: string = null;
  constructor(
    private opService: OperatorService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.opService.getOperators().subscribe((o) => {
      this.operators = o;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.loadingData();
  }

  checkInput() {
    if (this.name && this.department && this.tel) {
      return true;
    }
    return false;
  }

  add() {
    if (!this.checkInput()) return;
    this.opService
      .postOperator({
        id: uuidv4(),
        name: this.name,
        department: this.department,
        tel: this.tel,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(operator: Operator) {
    this.opService.deleteOperator(operator).subscribe(() => {
      this.loadingData();
    });
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
      this.loadingData();
    });
  };
}
