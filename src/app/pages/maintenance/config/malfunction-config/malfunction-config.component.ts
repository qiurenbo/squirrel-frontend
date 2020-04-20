import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import { v4 as uuidv4 } from 'uuid';
import { Malfunction } from 'src/app/models/maintenance.model';
import * as _ from 'lodash';
import { EditDlgComponent } from 'src/app/pages/maintenance/config/edit-dlg/edit-dlg.component';
@Component({
  selector: 'app-malfunction-config',
  templateUrl: './malfunction-config.component.html',
  styleUrls: ['./malfunction-config.component.scss'],
})
export class MalfunctionConfigComponent implements OnInit {
  malfunctionName: string;
  malfunctions: Malfunction[] = null;
  selectedMalfunctionId: string = null;

  isLoading = false;
  editMalfunction: Malfunction;

  constructor(
    private mservice: MaintenanceService,
    private resolver: ComponentFactoryResolver,
    private viewContainer: ViewContainerRef
  ) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getMaintenanceMalfunctions().subscribe((m) => {
      this.malfunctions = m;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    if (!this.malfunctionName) {
      return;
    }

    this.mservice
      .postMaintenanceMalfunction({
        id: uuidv4(),
        name: this.malfunctionName,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(malfunction: Malfunction) {
    this.mservice.deleteMaintenanceMalfunction(malfunction).subscribe(() => {
      this.loadingData();
    });
  }

  saveData(malfunction: Malfunction) {
    this.mservice.putMaintenanceMalfunction(malfunction).subscribe(() => {});
  }

  openEditDlg(malfunction: Malfunction) {
    const factory = this.resolver.resolveComponentFactory(EditDlgComponent);
    const dlg = this.viewContainer.createComponent(factory);
    dlg.instance.passValue = malfunction;
    dlg.instance.onOk = this.OnOk;
  }

  OnOk = (malfunction) => {
    this.mservice.putMaintenanceMalfunction(malfunction).subscribe(() => {
      this.loadingData();
    });
  };
}
