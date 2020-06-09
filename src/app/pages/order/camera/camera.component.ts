import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { OrderService } from 'src/app/core/order.service';
import { Operator, Addr, Camera } from 'src/app/models/order.model';
import * as moment from 'moment';
import { CameraDetailComponent } from './camera-detail/camera-detail.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  listOfData: Camera[] = null;
  isLoading = true;
  pageSize: number;
  pageIndex: number;
  operators: Operator[] = null;
  addrs: Addr[] = null;
  total: number;

  selectedStartDate: string;
  selectedEndDate: string;
  selectedOperatorId: string = null;
  selectedAddrId: string = null;
  selectedActionId: string = null;
  selectedStatusId: string = null;

  constructor(
    private mservice: OrderService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadData() {
    this.isLoading = true;
    this.mservice.getOrderCameras(this.filter).subscribe((p: any) => {
      this.total = p.headers.get('X-Total-Count');
      this.isLoading = false;
      this.listOfData = p.body;
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

    if (this.selectedActionId) {
      fiter.actionId = this.selectedActionId;
    }

    if (this.selectedOperatorId) {
      fiter.operatorId = this.selectedOperatorId;
    }

    if (this.selectedStatusId) {
      fiter.statusId = this.selectedStatusId;
    }

    if (this.pageIndex) {
      fiter.offset = (this.pageIndex - 1) * this.pageSize;
    }
    if (this.pageSize) {
      fiter.limit = this.pageSize;
    }

    return fiter;
  }

  set dateRange(range) {
    this.selectedStartDate =
      range.length > 0 ? moment(range[0]).format('YYYYMMDD') : null;
    this.selectedEndDate =
      range.length > 0 ? moment(range[1]).format('YYYYMMDD') : null;
  }

  makeDlg(): ComponentRef<CameraDetailComponent> {
    const factory = this.resolver.resolveComponentFactory(
      CameraDetailComponent
    );
    const detailComponentRef = this.viewContainer.createComponent(factory);
    detailComponentRef.instance.dataUpdate.subscribe(() => this.loadData());
    return detailComponentRef;
  }

  showAddDlg() {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '新增日志';
    detailComponentRef.instance.camera = null;
    detailComponentRef.instance.method = 'POST';
    detailComponentRef.instance.dataUpdate.subscribe(() => {
      this.messageService.info('新增成功');
      this.loadData();
    });
  }

  showEditDlg(camera: Camera) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.camera = camera;
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

  deleteRecord(camera: Camera) {
    this.mservice.deleteOrderCamera(camera).subscribe(() => {
      this.messageService.info('删除成功');
      this.loadData();
    });
  }
}
