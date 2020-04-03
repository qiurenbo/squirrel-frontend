import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, NgZorroAntdModule],
  exports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule
  ]
})
export class SharedModule {}
