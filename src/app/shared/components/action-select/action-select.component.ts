import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Action } from 'src/app/models/order.model';

@Component({
  selector: 'app-action-select',
  templateUrl: './action-select.component.html',
  styleUrls: ['./action-select.component.scss'],
})
export class ActionSelectComponent implements OnInit {
  isActionsLoading = false;
  actions: Action[];
  actionIdValue: string;

  @Output()
  actionIdChange = new EventEmitter<string>();

  @Input()
  get actionId() {
    return this.actionIdValue;
  }

  set actionId(value) {
    this.actionIdValue = value;
    this.actionIdChange.emit(value);
  }

  constructor(private mservice: OrderService) {}

  ngOnInit(): void {
    this.isActionsLoading = true;
    this.mservice.getOrderActions().subscribe((a) => {
      this.actions = a.body;
      this.isActionsLoading = false;
    });
  }
}
