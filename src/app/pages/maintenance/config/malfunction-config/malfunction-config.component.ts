import { Component, OnInit } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { v4 as uuidv4 } from 'uuid';
import { Target, Malfunction } from 'src/app/models/maintenance.model';
@Component({
  selector: 'app-malfunction-config',
  templateUrl: './malfunction-config.component.html',
  styleUrls: ['./malfunction-config.component.scss'],
})
export class MalfunctionConfigComponent implements OnInit {
  isMalfunctionsLoading = false;
  malfunctionName: string;
  malfunctions: Malfunction[] = null;
  selectedTargetId: string = null;

  isLoading = false;
  currentId: string = null;
  constructor(private mservice: MaintainceService) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getMaintainceMalfunctions().subscribe((m) => {
      this.malfunctions = m;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    this.mservice
      .postMaintainceMalfunction({
        id: uuidv4(),
        name: this.malfunctionName,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(malfunction: Malfunction) {
    this.mservice.deleteMaintainceMalfunction(malfunction).subscribe(() => {
      this.loadingData();
    });
  }

  makeEditable(id: string) {
    this.currentId = id;
  }

  saveData(malfunction: Malfunction) {
    this.currentId = null;
    this.mservice.putMaintainceMalfunction(malfunction).subscribe(() => {});
  }
}
