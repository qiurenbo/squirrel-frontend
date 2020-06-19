import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { Purchase } from 'src/app/models/purchase.model';
import * as moment from 'moment';
import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  listOfData: Purchase[] = null;
  isLoading = true;
  pageSize: number;
  pageIndex: number;

  total: number;

  selectedStartDate: string;
  selectedEndDate: string;
  inputProjectName: string = null;
  inputProductName: string = null;
  inputUnitPrice: number = null;
  inputNumber: number = null;
  inputTotalPrice: number = null;
  inputSource: string = null;
  inputRemarks: string = null;

  constructor(
    private pservice: PurchaseService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService
  ) {}

  loadData() {
    this.isLoading = true;
    this.pservice.get(this.filter).subscribe((p: any) => {
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

  makeDlg(): ComponentRef<PurchaseDetailComponent> {
    const factory = this.resolver.resolveComponentFactory(
      PurchaseDetailComponent
    );
    const detailComponentRef = this.viewContainer.createComponent(factory);
    detailComponentRef.instance.dataUpdate.subscribe(() => this.loadData());
    return detailComponentRef;
  }

  showAddDlg() {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '新增日志';
    detailComponentRef.instance.detail = null;
    detailComponentRef.instance.method = 'POST';
    detailComponentRef.instance.dataUpdate.subscribe(() => {
      this.messageService.info('新增成功');
      this.loadData();
    });
  }

  showEditDlg(purchase: Purchase) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.detail = purchase;
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

  deleteRecord(purchase: Purchase) {
    this.pservice.delete(purchase).subscribe(() => {
      this.messageService.info('删除成功');
      this.loadData();
    });
  }
}
