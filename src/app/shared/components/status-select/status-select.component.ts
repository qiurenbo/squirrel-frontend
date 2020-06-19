import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Status } from 'src/app/models/order.model';
@Component({
  selector: 'app-status-select',
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss'],
})
export class StatusSelectComponent implements OnInit {
  isStatusesLoading = false;
  statuses: Status[];
  statusIdValue: string;

  @Output()
  statusIdChange = new EventEmitter<string>();

  @Input()
  get statusId() {
    return this.statusIdValue;
  }

  set statusId(value) {
    this.statusIdValue = value;
    this.statusIdChange.emit(value);
  }

  constructor(private mservice: OrderService) {}

  ngOnInit(): void {
    this.isStatusesLoading = true;
    this.mservice.getOrderStatuses().subscribe((s) => {
      this.statuses = s.body;
      this.isStatusesLoading = false;
    });
  }
}
