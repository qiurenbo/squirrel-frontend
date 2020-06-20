import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
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
import { NzMessageService } from 'ng-zorro-antd';

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
  selectedStatusId: string = null;
  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
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
    let filter: any = {};

    if (this.selectedStartDate) {
      filter.startDate = this.selectedStartDate;
    }

    if (this.selectedEndDate) {
      filter.endDate = this.selectedEndDate;
    }

    if (this.selectedAddrId) {
      filter.addrId = this.selectedAddrId;
    }

    if (this.selectedTargetId) {
      filter.targetId = this.selectedTargetId;
    }

    if (this.selectedActionId) {
      filter.actionId = this.selectedActionId;
    }

    if (this.selectedOperatorId) {
      filter.operatorId = this.selectedOperatorId;
    }
    if (this.selectedMalfunctionId) {
      filter.malfunctionId = this.selectedMalfunctionId;
    }
    if (this.selectedStatusId) {
      filter.statusId = this.selectedStatusId;
    }

    if (this.pageIndex) {
      filter.offset = (this.pageIndex - 1) * this.pageSize;
    }
    if (this.pageSize) {
      filter.limit = this.pageSize;
    }

    return filter;
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
    detailComponentRef.instance.dataUpdate.subscribe(() => this.loadData());
    return detailComponentRef;
  }

  showAddDlg() {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '新增维护';
    detailComponentRef.instance.detail = null;
    detailComponentRef.instance.method = 'POST';
    detailComponentRef.instance.dataUpdate.subscribe(() => {
      this.messageService.info('新增成功');
      this.loadData();
    });
  }

  showEditDlg(order: OrderDetail) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.detail = order;
    detailComponentRef.instance.dataUpdate.subscribe(() => {
      this.messageService.info('修改成功');
      this.loadData();
    });
  }

  onFilterClick() {
    this.loadData();
  }

  onPageIndexChange(index: number) {
    this.loadData();
  }

  deleteRecord(order: OrderDetail) {
    this.mservice.deleteOrder(order).subscribe(() => {
      this.messageService.info('删除成功');
      this.loadData();
    });
  }
}
