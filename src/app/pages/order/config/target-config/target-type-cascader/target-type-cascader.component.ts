import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MinorTargetTypesService } from 'src/app/core/minor-target-type.service';
import { NzCascaderOption } from 'ng-zorro-antd';

@Component({
  selector: 'app-target-type-cascader',
  templateUrl: './target-type-cascader.component.html',
  styleUrls: ['./target-type-cascader.component.scss'],
})
export class TargetTypeCascaderComponent implements OnInit {
  @Input()
  selectedMinorTypeId: any;
  @Output()
  selectedMinorTypeIdChange = new EventEmitter<any>();

  @Input()
  selectedMinorTypeName: any;
  @Output()
  selectedMinorTypeNameChange = new EventEmitter<any>();

  types: NzCascaderOption[];
  dafaultOption: string[];
  constructor(private tservice: MinorTargetTypesService) {}

  ngOnInit(): void {
    this.tservice.getMinorTargetTypes().subscribe((t) => {
      this.types = this.tservice.getCascaderMinorTargetTypes(t.body);
      if (this.selectedMinorTypeId) {
        this.dafaultOption = this.tservice.getOneMinorTargetType(
          t.body,
          this.selectedMinorTypeId
        );
      }
    });
  }

  onChanges(selectedCascaderOptions: NzCascaderOption[]): void {
    if (selectedCascaderOptions[1]) {
      this.selectedMinorTypeId = selectedCascaderOptions[1].value;
      this.selectedMinorTypeIdChange.emit(this.selectedMinorTypeId);

      this.selectedMinorTypeName = selectedCascaderOptions[1].value;
      this.selectedMinorTypeNameChange.emit(this.selectedMinorTypeName);
    }
  }
}
