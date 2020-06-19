import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { NzCascaderOption } from 'ng-zorro-antd';
import { Purchase } from 'src/app/models/purchase.model';
@Component({
  selector: 'app-purchase-select',
  templateUrl: './purchase-select.component.html',
  styleUrls: ['./purchase-select.component.scss'],
})
export class PurchaseSelectComponent implements OnInit {
  constructor(private purchaseService: PurchaseService) {}
  purchaseDetails: Purchase[];
  purchases: NzCascaderOption[];
  defaultOption: string[];

  @Output()
  purchaseIdChange = new EventEmitter();

  @Input()
  purchaseId: string;

  @Output()
  onSelectChanges = new EventEmitter<Purchase>();

  getOptions() {
    this.purchaseService.get().subscribe((a) => {
      this.purchaseDetails = a.body;
      this.purchases = this.purchaseService.getCascader(a.body);
      if (this.purchaseId) {
        this.defaultOption = this.purchaseService.getDefaultOption(
          a.body,
          this.purchaseId
        );
      }
    });
  }

  ngOnInit(): void {
    this.getOptions();
  }
  onChanges(selectedCascaderOptions: any): void {
    let purchaseDetail: Purchase = null;
    if (selectedCascaderOptions[2]) {
      this.purchaseId = selectedCascaderOptions[2].value;
    }
    this.purchaseDetails.every((purchase) => {
      if (purchase.id === this.purchaseId) {
        purchaseDetail = purchase;
        return false;
      }
      return true;
    });
    if (selectedCascaderOptions.length === 0) {
      this.purchaseId = null;
    }

    this.purchaseIdChange.emit(this.purchaseId);
    this.onSelectChanges.emit(purchaseDetail);
  }
}
