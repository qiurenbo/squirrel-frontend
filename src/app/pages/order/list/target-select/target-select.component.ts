import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import { Target } from 'src/app/models/order.model';

@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.scss'],
})
export class TargetSelectComponent implements OnInit {
  isTargetsLoading = false;
  targets: Target[];

  targetIdValue: string;

  @Output()
  targetIdChange = new EventEmitter<string>();

  @Input()
  get targetId() {
    return this.targetIdValue;
  }

  set targetId(value) {
    this.targetIdValue = value;
    this.targetIdChange.emit(value);
  }

  constructor(private mservice: OrderService) {}

  ngOnInit(): void {
    this.isTargetsLoading = true;
    this.mservice.getOrderTargets().subscribe((d) => {
      this.targets = d;
      this.isTargetsLoading = false;
    });
  }
}
