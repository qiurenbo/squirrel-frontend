import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { NzCascaderOption } from 'ng-zorro-antd';

@Component({
  selector: 'app-target-select',
  templateUrl: './target-select.component.html',
  styleUrls: ['./target-select.component.scss'],
})
export class TargetSelectComponent implements OnInit {
  targets: NzCascaderOption[];

  @Output()
  targetIdChange = new EventEmitter<string>();

  @Input()
  targetId: string;

  defaultOption: string[];
  constructor(private mservice: OrderService) {}

  ngOnInit(): void {
    this.mservice.getOrderTargets().subscribe((t) => {
      let targets = t.body;
      this.targets = this.mservice.getOrderTargetsCascader(targets);

      if (this.targetId) {
        this.defaultOption = this.mservice.getDefaultOption(
          t.body,
          this.targetId
        );
      }
    });
  }

  onChanges(selectedTarget: NzCascaderOption[]) {
    if (selectedTarget[2]) {
      this.targetId = selectedTarget[2].value;
    }
    if (selectedTarget.length === 0) {
      this.targetId = null;
    }
    this.targetIdChange.emit(this.targetId);
  }
}
