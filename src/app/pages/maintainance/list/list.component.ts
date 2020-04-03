import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MaintainceService } from 'src/app/core/maintainances.service';
import { Maintainance } from 'src/app/models/maintainance.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listOfData: Maintainance[] = null;
  isLoading = true;
  pageIndex: number;
  constructor(private mservice: MaintainceService) {}

  ngOnInit(): void {
    this.mservice.getMaintaincesByFilter().subscribe(m => {
      this.isLoading = false;
      this.listOfData = m;
      console.log(this.listOfData);
    });
  }
}
