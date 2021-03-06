import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Operator } from 'src/app/models/order.model';
import { OperatorService } from 'src/app/core/services/operator.service';

@Component({
  selector: 'app-operator-select',
  templateUrl: './operator-select.component.html',
  styleUrls: ['./operator-select.component.scss'],
})
export class OperatorSelectComponent implements OnInit {
  isNamesLoading = false;
  operators: Operator[];

  operatorIdValue: string;

  @Output()
  operatorIdChange = new EventEmitter<string>();

  @Input()
  get operatorId() {
    return this.operatorIdValue;
  }

  set operatorId(value) {
    this.operatorIdValue = value;
    this.operatorIdChange.emit(value);
  }

  constructor(private opService: OperatorService) {}

  ngOnInit(): void {
    this.isNamesLoading = true;
    this.opService.getOperators().subscribe((o) => {
      this.operators = o.body;
      this.isNamesLoading = false;
    });
  }
}
