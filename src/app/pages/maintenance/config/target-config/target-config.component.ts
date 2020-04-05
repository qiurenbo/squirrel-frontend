import { Component, OnInit } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { Target } from 'src/app/models/maintenance.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-target-config',
  templateUrl: './target-config.component.html',
  styleUrls: ['./target-config.component.scss'],
})
export class TargetConfigComponent implements OnInit {
  isTargetsLoading = false;
  name: string;
  target: string;
  brand: string;
  type: string;
  targets: Target[] = null;
  selectedTarget: string = null;
  selectedType: string = null;
  isLoading = false;
  currentId: string = null;
  constructor(private mservice: MaintainceService) {}

  loadingData() {
    this.isLoading = true;
    this.mservice.getMaintainceTargets().subscribe((a) => {
      this.targets = a;
      this.isLoading = false;
    });
  }
  ngOnInit(): void {
    this.loadingData();
  }

  add() {
    this.mservice
      .postMaintainceTarget({
        id: uuidv4(),
        name: this.name,
        type: this.type,
        brand: this.brand,
      })
      .subscribe(() => {
        this.loadingData();
      });
  }

  delete(target: Target) {
    this.mservice.deleteMaintainceTarget(target).subscribe(() => {
      this.loadingData();
    });
  }

  makeEditable(id: string) {
    this.currentId = id;
  }

  saveData(target: Target) {
    this.currentId = null;
    this.mservice.putMaintainceTarget(target).subscribe(() => {});
  }
}
