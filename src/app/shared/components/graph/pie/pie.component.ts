import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieComponent implements OnInit {
  @Input()
  legend: string[];

  @Input()
  series: any[];

  options = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      show: false,
      orient: 'horizontal',
      left: 10,
      data: ['无法开机', '无法联网', '软件异常'],
    },
    series: [
      {
        name: '故障占比',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        // label: {
        //   show: false,
        //   position: 'center',
        // },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: '30',
        //     fontWeight: 'bold',
        //   },
        // },
        labelLine: {
          show: true,
        },
        data: [
          { value: 335, name: '无法开机' },
          { value: 310, name: '无法联网' },
          { value: 234, name: '软件启动' },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit() {
    this.options.series[0].data = this.series;
    // this.options.legend.data = this.legend;
  }
}
