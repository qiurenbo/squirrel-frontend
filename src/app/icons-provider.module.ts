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
  ArrowUpOutline,
  EditOutline,
  DeleteOutline,
  SaveOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  ToolOutline,
  VideoCameraOutline,
  ShopOutline,
  ArrowUpOutline,
  PlusSquareOutline,
  EditOutline,
  DeleteOutline,
  SaveOutline,
  UserOutline,
  LockOutline,
  LogoutOutline,
];

@NgModule({
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
