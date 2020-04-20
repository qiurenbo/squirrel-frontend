import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import { Action } from 'src/app/models/maintenance.model';

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

  constructor(private mservice: MaintenanceService) {}

  ngOnInit(): void {
    this.isActionsLoading = true;
    this.mservice.getMaintenanceActions().subscribe((a) => {
      this.actions = a;
      this.isActionsLoading = false;
    });
  }
}
