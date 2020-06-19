import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzInputModule,
  NzModalModule,
  NzTableModule,
  NzButtonModule,
  NzFormModule,
  NzTabsModule,
  NzDividerModule,
  NzSelectModule,
  NzStatisticModule,
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzCardModule,
  NzDatePickerModule,
  NzCascaderModule,
  NzMessageModule,
} from 'ng-zorro-antd';
import { PieComponent } from './components/graph/pie/pie.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SideLayoutComponent } from './layouts/side-layout/side-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { ActionConfigComponent } from '../pages/order/config/action-config/action-config.component';
import { AddrSelectComponent } from './components/addr-select/addr-select.component';
import { TargetSelectComponent } from './components/target-select/target-select.component';
import { MalfunctionSelectComponent } from './components/malfunction-select/malfunction-select.component';
import { ActionSelectComponent } from './components/action-select/action-select.component';
import { OperatorSelectComponent } from './components/operator-select/operator-select.component';
import { PurchaseSelectComponent } from './components/purchase-select/purchase-select.component';

const NzModules = [
  NzInputModule,
  NzModalModule,
  NzTableModule,
  NzButtonModule,
  NzFormModule,
  NzDividerModule,
  NzTabsModule,
  NzSelectModule,
  NzStatisticModule,
  NzLayoutModule,
  NzMenuModule,
  NzIconModule,
  NzCardModule,
  NzDatePickerModule,
  NzCardModule,
  NzCascaderModule,
  NzMessageModule,
];
@NgModule({
  declarations: [
    PieComponent,
    SideLayoutComponent,
    DefaultLayoutComponent,
    ActionConfigComponent,
    AddrSelectComponent,
    OperatorSelectComponent,
    TargetSelectComponent,
    MalfunctionSelectComponent,
    ActionSelectComponent,
    PurchaseSelectComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ...NzModules,
    NgxEchartsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    ...NzModules,
    PieComponent,
    RouterModule,
    ReactiveFormsModule,
    AddrSelectComponent,
    OperatorSelectComponent,
    TargetSelectComponent,
    MalfunctionSelectComponent,
    ActionSelectComponent,
    PurchaseSelectComponent,
  ],
})
export class SharedModule {}
