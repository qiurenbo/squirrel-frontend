import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { Purchase } from 'src/app/models/purchase.model';

import { PurchaseDetailComponent } from './purchase-detail/purchase-detail.component';
import { NzMessageService } from 'ng-zorro-antd';
import { ListBaseComponent } from 'src/app/core/abstracts/list-base-component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent
  extends ListBaseComponent<Purchase, PurchaseDetailComponent>
  implements OnInit {
  purchaseId: string = null;
  constructor(
    pservice: PurchaseService,
    resolver: ComponentFactoryResolver,
    viewContainer: ViewContainerRef,
    msgService: NzMessageService
  ) {
    super(
      pservice,
      resolver,
      viewContainer,
      msgService,
      PurchaseDetailComponent
    );
  }
}
