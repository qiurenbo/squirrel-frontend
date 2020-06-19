import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Division } from '../../models/division.model';
import { environment } from 'src/environments/environment';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

@Injectable({
  providedIn: 'root',
})
export class DivisionService {
  constructor(private http: HttpClient) {}

  getDivisions(): Observable<HttpResponse<Division[]>> {
    return this.http.get<Division[]>(environment.apiurl + 'divisions', {
      observe: 'response',
    });
  }

  getCascaderDivsions(divisions: Division[]): NzCascaderOption[] {
    let cascaders: NzCascaderOption[] = [];
    let hash = {};
    for (const division of divisions) {
      if (!hash[division.Area.id]) {
        hash[division.Area.id] = {};
        hash[division.Area.id].label = division.Area.name;
        hash[division.Area.id].value = division.Area.id;
        hash[division.Area.id].children = [];
      }

      hash[division.Area.id].children.push({
        value: division.id,
        label: division.name,
        isLeaf: true,
      });
    }

    for (const key in hash) {
      if (hash.hasOwnProperty(key)) {
        cascaders.push(hash[key]);
      }
    }

    return cascaders;
  }
}
