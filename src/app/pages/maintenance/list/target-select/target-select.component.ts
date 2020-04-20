import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import { Target } from 'src/app/models/maintenance.model';

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

  constructor(private mservice: MaintenanceService) {}

  ngOnInit(): void {
    this.isTargetsLoading = true;
    this.mservice.getMaintenanceTargets().subscribe((d) => {
      this.targets = d;
      this.isTargetsLoading = false;
    });
  }
}
