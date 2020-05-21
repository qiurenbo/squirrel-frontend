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
} from 'ng-zorro-antd';
import { PieComponent } from './components/graph/pie/pie.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SideLayoutComponent } from './layouts/side-layout/side-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';

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
];
@NgModule({
  declarations: [PieComponent, SideLayoutComponent, DefaultLayoutComponent],
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
  ],
})
export class SharedModule {}
