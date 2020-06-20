import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { DistributeService } from 'src/app/core/services/distribute.service';
import { Distribute } from 'src/app/models/distribute.model';

import { DistributeDetailComponent } from './distribute-detail/distribute-detail.component';
import { NzMessageService } from 'ng-zorro-antd';
import { ListBaseComponent } from 'src/app/core/abstracts/list-base-component';

@Component({
  selector: 'app-distribute',
  templateUrl: './distribute.component.html',
  styleUrls: ['./distribute.component.scss'],
})
export class DistributeComponent
  extends ListBaseComponent<Distribute, DistributeDetailComponent>
  implements OnInit {
  constructor(
    service: DistributeService,
    resolver: ComponentFactoryResolver,
    viewContainer: ViewContainerRef,
    msgService: NzMessageService
  ) {
    super(
      service,
      resolver,
      viewContainer,
      msgService,
      DistributeDetailComponent
    );
  }
}
