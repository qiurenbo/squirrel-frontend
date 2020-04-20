import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import {
  MaintenanceDetail,
  Addr,
  Target,
  Malfunction,
  Operator,
  Action,
} from 'src/app/models/maintenance.model';
import * as moment from 'moment';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
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

  selectedStartDate: string;
  selectedEndDate: string;
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedActionId: string = null;
  selectedTargetId: string = null;
  selectedMalfunctionId: string = null;

  constructor(
    private mservice: MaintenanceService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadData() {
    this.isLoading = true;
    this.mservice.getMaintenances(this.filter).subscribe((m) => {
      this.isLoading = false;
      this.listOfData = m;
    });
  }

  ngOnInit(): void {
    this.pageSize = 7;
    this.pageIndex = 1;
    this.loadData();
  }

  get filter(): any {
    return {
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      addrId: this.selectedAddrId,
      targetId: this.selectedTargetId,
      actionId: this.selectedActionId,
      operatorId: this.selectedOperatorId,
      malfunctionId: this.selectedMalfunctionId,
      _page: this.pageIndex,
      _limit: this.pageSize,
    };
  }

  // get selectedStartDate(): string {
  //   return this.dateRange ? moment(this.dateRange[0]).format('YYYYMMDD') : null;
  // }

  // get selectedEndDate(): string {
  //   return this.dateRange ? moment(this.dateRange[1]).format('YYYYMMDD') : null;
  // }

  set dateRange(range) {
    this.selectedStartDate =
      range.length > 0 ? moment(range[0]).format('YYYYMMDD') : null;
    this.selectedEndDate =
      range.length > 0 ? moment(range[1]).format('YYYYMMDD') : null;
  }

  makeDlg() {
    const factory = this.resolver.resolveComponentFactory(DetailComponent);
    const detailComponentRef = this.viewContainer.createComponent(factory);
    detailComponentRef.instance.dateUpdate.subscribe(() => this.loadData());
    return detailComponentRef;
  }
  showAddDlg() {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '新增维护';
    detailComponentRef.instance.detail = null;
    detailComponentRef.instance.method = 'POST';
  }

  showEditDlg(maintenance: MaintenanceDetail) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.detail = maintenance;
    detailComponentRef.instance.dateUpdate.subscribe(() => this.loadData());
  }

  onFilterClick() {
    this.loadData();
  }

  deleteRecord(maintenance: MaintenanceDetail) {
    this.mservice.deleteMaintenance(maintenance).subscribe(() => {
      this.loadData();
    });
  }
}
