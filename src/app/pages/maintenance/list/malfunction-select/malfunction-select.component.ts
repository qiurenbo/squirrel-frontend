import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Malfunction } from 'src/app/models/maintenance.model';
import { MaintenanceService } from 'src/app/core/maintenance.service';

@Component({
  selector: 'app-malfunction-select',
  templateUrl: './malfunction-select.component.html',
  styleUrls: ['./malfunction-select.component.scss'],
})
export class MalfunctionSelectComponent implements OnInit {
  isMalfunctionsLoading = false;
  malfunctions: Malfunction[];

  malfunctionIdValue: string;

  @Output()
  malfunctionIdChange = new EventEmitter<string>();

  @Input()
  get malfunctionId() {
    return this.malfunctionIdValue;
  }

  set malfunctionId(value) {
    this.malfunctionIdValue = value;
    this.malfunctionIdChange.emit(value);
  }

  constructor(private mservice: MaintenanceService) {}

  ngOnInit(): void {
    this.isMalfunctionsLoading = true;
    this.mservice.getMaintenanceMalfunctions().subscribe((m) => {
      this.malfunctions = m;
      this.isMalfunctionsLoading = false;
    });
  }

  o;
}
