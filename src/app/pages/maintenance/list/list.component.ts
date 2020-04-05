import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { Maintenance, Addr, Target } from 'src/app/models/maintenance.model';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  dateRange: any;
  date: string = null;
  listOfData: Maintenance[] = null;
  isLoading = true;
  pageSize: number;
  pageIndex: number;
  names: string[] = null;
  addrs: Addr[] = null;
  actions: string[] = null;
  targets: Target[] = null;
  types: string[] = null;
  total: number;
  selectedName: string = null;
  selectedAddr: string = null;
  selectedAction: string = null;
  selectedTarget: string = null;
  selectedType: string = null;

  isNamesLoading = false;
  isAddrsLoading = false;
  isActionsLoading = false;
  isTargetsLoading = false;
  isTypesLoading = false;

  constructor(private mservice: MaintainceService) {}

  ngOnInit(): void {
    this.pageSize = 7;
    this.pageIndex = 1;
    this.mservice.getMaintaincesByFilter(this.filter).subscribe((m) => {
      this.isLoading = false;
      this.listOfData = m.list;
      this.total = m.total;
    });
  }

  get filter(): any {
    return {
      date: this.selectedDate,
      addr: this.selectedAddr,
      target: this.selectedTarget,
      action: this.selectedAction,
      name: this.selectedName,
      type: this.selectedType,
      _page: this.pageIndex,
      _limit: this.pageSize,
    };
  }
  get selectedDate(): string {
    return this.date ? moment(this.date).format('YYYYMMDD') : null;
  }

  onNamesOpenChange() {
    this.isNamesLoading = true;
    this.mservice.getMaintainceNames().subscribe((n) => {
      this.names = n;
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
    this.isActionsLoading = true;
    this.mservice.getMaintainceActions().subscribe((a) => {
      this.actions = a;
      this.isActionsLoading = false;
    });
  }

  onTargetsOpenChange() {
    this.isTargetsLoading = true;
    this.mservice.getMaintainceTargets().subscribe((d) => {
      this.targets = d;
      this.isTargetsLoading = false;
    });
  }

  onTypesOpenChange() {
    this.isTypesLoading = true;
    this.mservice.getMaintainceTypes().subscribe((t) => {
      this.types = t;
      this.isTypesLoading = false;
    });
  }

  onFilterClick() {
    this.isLoading = true;
    this.mservice.getMaintaincesByFilter(this.filter).subscribe((m) => {
      this.isLoading = false;
      this.listOfData = m.list;
    });
  }
}
