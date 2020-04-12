import { Component, OnInit } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintenance.service';
import { v4 as uuidv4 } from 'uuid';
import { Target, Malfunction, Action } from 'src/app/models/maintenance.model';
import { NzCascaderOption, arraysEqual } from 'ng-zorro-antd';
@Component({
  selector: 'app-action-config',
  templateUrl: './action-config.component.html',
  styleUrls: ['./action-config.component.scss'],
})
export class ActionConfigComponent implements OnInit {
  actionName: string;
  actions: Action[] = null;
  isLoading = false;
  currentId: string = null;
  option: NzCascaderOption = null;
  constructor(private mservice: MaintainceService) {}

  loadingTableData() {
    this.isLoading = true;
    this.mservice.getMaintainceActions().subscribe((a) => {
      this.actions = a;
      this.isLoading = false;
    });
  }

  createArr(arr: { id: string; name: string }[], isLeaf) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      newArr.push({ value: arr[i].id, label: arr[i].name, isLeaf: isLeaf });
    }
    return newArr;
  }

  loadCascaderData = (node: NzCascaderOption, index: number) => {
    return new Promise((resolve) => {
      if (index < 0) {
        // if index less than 0 it is root node
        this.mservice.getMaintainceTargets().subscribe((t) => {
          node.children = this.createArr(t, false);
          resolve();
        });
      } else if (index === 0) {
        this.mservice
          .getMaintainceMalfunctions({ targetId: node.value })
          .subscribe((m) => {
            node.children = this.createArr(m, true);
            resolve();
          });
      }
    });
  };

  ngOnInit(): void {
    this.loadingTableData();
  }

  onSelectionChange(option: NzCascaderOption) {
    this.option = option;
  }

  get selectedTargetId() {
    return this.option[0].value;
  }

  get selectedMalfunctionId() {
    return this.option[1].value;
  }

  add() {
    this.mservice
      .postMaintainceAction({
        id: uuidv4(),
        name: this.actionName,
      })
      .subscribe(() => {
        this.loadingTableData();
      });
  }

  delete(action: Action) {
    this.mservice.deleteMaintainceAction(action).subscribe(() => {
      this.loadingTableData();
    });
  }

  makeEditable(id: string) {
    this.currentId = id;
  }

  saveData(action: Action) {
    this.currentId = null;
    this.mservice.putMaintainceAction(action).subscribe(() => {});
  }
}
