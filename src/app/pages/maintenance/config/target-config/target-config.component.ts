import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import { Target } from 'src/app/models/maintenance.model';
import { v4 as uuidv4 } from 'uuid';

import { EditDlgComponent } from 'src/app/pages/maintenance/config/edit-dlg/edit-dlg.component';
@Component({
  selector: 'app-target-config',
  templateUrl: './target-config.component.html',
  styleUrls: ['./target-config.component.scss'],
})
export class TargetConfigComponent implements OnInit {
  name: string = null;
  targets: Target[] = null;
  selectedTarget: string = null;
  isLoading = false;
  constructor(
    private mservice: MaintenanceService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getMaintenanceTargets().subscribe((t) => {
      this.targets = t;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    if (!this.name) {
      return;
    }

    this.mservice
      .postMaintenanceTarget({
        id: uuidv4(),
        name: this.name,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(target: Target) {
    this.mservice.deleteMaintenanceTarget(target).subscribe(() => {
      this.loadingData();
    });
  }

  openEditDlg(target: Target) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = target;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (target) => {
    this.mservice.putMaintenanceTarget(target).subscribe(() => {
      this.loadingData();
    });
  };
}
