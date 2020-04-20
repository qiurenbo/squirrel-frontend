import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/app/core/maintenance.service';
import { Stats } from 'src/app/models/maintenance.model';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(private mservice: MaintenanceService) {}

  stats: Stats = null;

  ngOnInit(): void {
    this.mservice.getMaintenanceStats().subscribe((stats) => {
      this.stats = stats;
    });
  }
}
