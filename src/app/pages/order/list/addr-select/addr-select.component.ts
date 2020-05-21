import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Addr } from 'src/app/models/order.model';
import { AddrService } from 'src/app/core/addr.service';
import { NzCascaderOption } from 'ng-zorro-antd';
import { DivisionService } from 'src/app/core/divisons.service';
import { map } from 'rxjs/operators';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-addr-select',
  templateUrl: './addr-select.component.html',
  styleUrls: ['./addr-select.component.scss'],
})
export class AddrSelectComponent implements OnInit {
  constructor(
    private addrService: AddrService,
    private divisionService: DivisionService
  ) {}
  division: string[] = null;
  divisions: NzCascaderOption[];
  addrs: Addr[];

  addrIdValue: string;

  @Output()
  addrIdChange = new EventEmitter();

  @Input()
  get addrId() {
    return this.addrIdValue;
  }

  set addrId(val) {
    this.addrIdValue = val;
    this.addrIdChange.emit(this.addrIdValue);
  }

  appendTodivisions(addr: Addr) {
    for (const area of this.divisions) {
      for (const street of area.children) {
        if (street.value === addr.streetId) {
          if (!street.children) {
            street.children = [];
          }
          street.isLeaf = false;
          street.children.push({
            value: addr.id,
            label: addr.name,
            isLeaf: true,
          });
        }
      }
    }
  }

  getOptions() {
    this.addrService.getAddrs().subscribe((a) => {
      this.addrs = a.body;

      this.divisionService
        .getDivisions()
        .pipe(
          map((http) => http.body),
          map((divisions) =>
            this.divisionService.getCascaderDivsions(divisions)
          )
        )
        .subscribe((divisions) => {
          this.divisions = divisions;
          for (const addr of this.addrs) {
            this.appendTodivisions(addr);
          }

          if (this.addrId) {
            this.getDefaultDivsion();
          }
        });
    });
  }

  getDefaultDivsion() {
    for (const area of this.divisions) {
      for (const street of area.children) {
        if (street.children) {
          for (const addr of street.children) {
            if (addr.value === this.addrId) {
              this.division = [area.label, street.label, addr.label];
              return;
            }
          }
        }
      }
    }
  }

  ngOnInit(): void {
    this.getOptions();
  }
  onChanges(selectedCascaderOptions: any): void {
    if (selectedCascaderOptions[2]) {
      this.addrId = selectedCascaderOptions[2].value;
    }

    if (selectedCascaderOptions.length === 0) {
      this.addrId = null;
    }
  }
}
