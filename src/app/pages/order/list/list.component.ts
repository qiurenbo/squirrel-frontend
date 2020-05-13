import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import {
  OrderDetail,
  Addr,
  Target,
  Malfunction,
  Operator,
  Action,
} from 'src/app/models/order.model';
import * as moment from 'moment';
import { DetailComponent } from './detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listOfData: OrderDetail[] = null;
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
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadData() {
    this.isLoading = true;
    this.mservice.getOrders(this.filter).subscribe((m: any) => {
      this.total = m.headers.get('X-Total-Count');
      this.isLoading = false;
      this.listOfData = m.body;
    });
  }

  ngOnInit(): void {
    this.pageSize = 7;
    this.pageIndex = 1;
    this.loadData();
  }

  get filter(): any {
    let fiter: any = {};

    if (this.selectedStartDate) {
      fiter.startDate = this.selectedStartDate;
    }

    if (this.selectedEndDate) {
      fiter.endDate = this.selectedEndDate;
    }

    if (this.selectedAddrId) {
      fiter.addrId = this.selectedAddrId;
    }

    if (this.selectedTargetId) {
      fiter.targetId = this.selectedTargetId;
    }

    if (this.selectedActionId) {
      fiter.actionId = this.selectedActionId;
    }

    if (this.selectedOperatorId) {
      fiter.operatorId = this.selectedOperatorId;
    }
    if (this.selectedMalfunctionId) {
      fiter.malfunctionId = this.selectedMalfunctionId;
    }
    if (this.pageIndex) {
      fiter.offset = (this.pageIndex - 1) * this.pageSize;
    }
    if (this.pageSize) {
      fiter.limit = this.pageSize;
    }

    return fiter;
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

  showEditDlg(order: OrderDetail) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.detail = order;
    detailComponentRef.instance.dateUpdate.subscribe(() => this.loadData());
  }

  onFilterClick() {
    this.loadData();
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }
  deleteRecord(order: OrderDetail) {
    this.mservice.deleteOrder(order).subscribe(() => {
      this.loadData();
    });
  }
}
