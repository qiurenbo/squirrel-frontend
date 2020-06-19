import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services/order.service';
import { Stats } from 'src/app/models/order.model';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  constructor(private mservice: OrderService) {}

  stats: Stats = null;

  ngOnInit(): void {
    this.mservice.getstats().subscribe((stats) => {
      this.stats = stats;
    });
  }
}
