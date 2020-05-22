import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-side-layout',
  templateUrl: './side-layout.component.html',
  styleUrls: ['./side-layout.component.scss'],
})
export class SideLayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
  isCollapsed = true;

  openMap: { [name: string]: boolean } = {
    order: true,
    camera: false,
    allocations: false,
    config: false,
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
