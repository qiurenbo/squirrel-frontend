import { Component, OnInit, Input } from '@angular/core';
import { CardStat } from 'src/app/models/card-stat.model';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  stat: CardStat;

  @Input()
  bgColor: any;
  data: number;
  range = '本周';
  constructor() {}

  ngOnInit(): void {
    this.data = this.stat.week;
  }

  onSelectChange(event) {
    console.log(event);
    switch (event) {
      case '本周':
        this.data = this.stat.week;
        break;
      case '本月':
        this.data = this.stat.month;
        break;
      case '本年':
        this.data = this.stat.year;
        break;
    }
  }
}
