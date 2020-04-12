import { Component, OnInit } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import {
  MaintenanceDetail,
  Addr,
  Target,
  Malfunction,
  Operator,
  Action,
} from 'src/app/models/maintenance.model';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dateRange: any;
  listOfData: MaintenanceDetail[] = null;
  isLoading = true;
  pageSize: number;
  pageIndex: number;
  operators: Operator[] = null;
  addrs: Addr[] = null;
  actions: Action[] = null;
  targets: Target[] = null;
  malfunctions: Malfunction[] = null;
  total: number;

  selectedName: string = null;
  selectedAddr: string = null;
  selectedAction: string = null;
  selectedTarget: string = null;
  selectedMalfunction: string = null;

  isNamesLoading = false;
  isAddrsLoading = false;
  isActionsLoading = false;
  isTargetsLoading = false;
  isMalfunctionsLoading = false;

  constructor(private mservice: MaintainceService) {}

  ngOnInit(): void {
    this.pageSize = 7;
    this.pageIndex = 1;
    this.mservice.getMaintainces(this.filter).subscribe((m) => {
      this.isLoading = false;
      this.listOfData = m;
    });
  }

  get filter(): any {
    return {
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      addrId: this.selectedAddr,
      targetId: this.selectedTarget,
      actionId: this.selectedAction,
      operatorId: this.selectedName,
      malfunctionId: this.selectedMalfunction,
      _page: this.pageIndex,
      _limit: this.pageSize,
    };
  }
  get selectedStartDate(): string {
    return this.dateRange ? moment(this.dateRange[0]).format('YYYYMMDD') : null;
  }

  get selectedEndDate(): string {
    return this.dateRange ? moment(this.dateRange[1]).format('YYYYMMDD') : null;
  }

  onNamesOpenChange() {
    this.isNamesLoading = true;
    this.mservice.getMaintainceNames().subscribe((o) => {
      this.operators = o;
      this.isNamesLoading = false;
    });
  }

  onAddrsOpenChange() {
    this.isAddrsLoading = true;
    this.mservice.getMaintainceAddrs().subscribe((a) => {
      this.addrs = a;
      this.isAddrsLoading = false;
    });
  }

  onActionsOpenChange() {
    if (!this.actions) {
      this.isActionsLoading = true;
      this.mservice.getMaintainceActions().subscribe((a) => {
        this.actions = a;
        this.isActionsLoading = false;
      });
    }
  }

  onTargetsOpenChange() {
    this.isTargetsLoading = true;
    this.mservice.getMaintainceTargets().subscribe((d) => {
      this.targets = d;
      this.isTargetsLoading = false;
    });
  }

  onMalfunctionsOpenChange() {
    if (!this.malfunctions) {
      this.isMalfunctionsLoading = true;
      this.mservice.getMaintainceMalfunctions().subscribe((m) => {
        this.malfunctions = m;
        this.isMalfunctionsLoading = false;
      });
    }
  }

  onFilterClick() {
    this.isLoading = true;
    this.mservice.getMaintainces(this.filter).subscribe((m) => {
      this.isLoading = false;
      this.listOfData = m;
    });
  }
}
