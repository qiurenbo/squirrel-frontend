import {
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import * as moment from 'moment';
import { IDetailBaseComponent } from '../interfaces/detail-component.interface';
import { NzMessageService } from 'ng-zorro-antd';
import { IBaseHttpService } from '../interfaces/http.interface';

export abstract class ListBaseComponent<
  DataType,
  DetailComponent extends IDetailBaseComponent<DataType>
> implements OnInit {
  listOfData: DataType[] = null;
  isLoading = true;
  pageSize: number;
  pageIndex: number;
  total: number;

  selectedStartDate: string;
  selectedEndDate: string;
  private _filter: any = {};

  constructor(
    private httpService: IBaseHttpService<DataType>,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef,
    private messageService: NzMessageService,
    private component: any
  ) {}

  loadData() {
    this.isLoading = true;
    this.httpService.get(this.filter).subscribe((p: any) => {
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

  get filter() {
    if (this.selectedStartDate) {
      this._filter.startDate = this.selectedStartDate;
    }

    if (this.selectedEndDate) {
      this._filter.endDate = this.selectedEndDate;
    }

    if (this.pageIndex) {
      this._filter.offset = (this.pageIndex - 1) * this.pageSize;
    }
    if (this.pageSize) {
      this._filter.limit = this.pageSize;
    }

    return this._filter;
  }

  set dateRange(range) {
    this.selectedStartDate =
      range.length > 0 ? moment(range[0]).format('YYYYMMDD') : null;
    this.selectedEndDate =
      range.length > 0 ? moment(range[1]).format('YYYYMMDD') : null;
  }

  makeDlg(): ComponentRef<DetailComponent> {
    const factory = this.resolver.resolveComponentFactory<DetailComponent>(
      this.component
    );
    const detailComponentRef = this.viewContainer.createComponent<
      DetailComponent
    >(factory);
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

  showEditDlg(detail: DataType) {
    const detailComponentRef = this.makeDlg();
    detailComponentRef.instance.title = '修改当前';
    detailComponentRef.instance.method = 'PUT';
    detailComponentRef.instance.detail = detail;
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

  deleteRecord(detail: DataType) {
    this.httpService.delete(detail).subscribe(() => {
      this.messageService.info('删除成功');
      this.loadData();
    });
  }
}
