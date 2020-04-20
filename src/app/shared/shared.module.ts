import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { PieComponent } from './components/graph/pie/pie.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [PieComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule,
    NgxEchartsModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    NgxEchartsModule,
    FormsModule,
    NgZorroAntdModule,
    PieComponent,
  ],
})
export class SharedModule {}
