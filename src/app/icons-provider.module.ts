import { NgModule } from '@angular/core';
import { NZ_ICONS } from 'ng-zorro-antd';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  ToolOutline,
  VideoCameraOutline,
  ShopOutline,
  PlusSquareOutline,
  EditOutline,
  DeleteOutline,
  SaveOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  ToolOutline,
  VideoCameraOutline,
  ShopOutline,
  PlusSquareOutline,
  EditOutline,
  DeleteOutline,
  SaveOutline,
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
