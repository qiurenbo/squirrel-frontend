import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MinorTargetType } from '../models/minor-target-type.model';
import { environment } from 'src/environments/environment';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

@Injectable({
  providedIn: 'root',
})
export class MinorTargetTypesService {
  constructor(private http: HttpClient) {}

  getMinorTargetTypes(): Observable<HttpResponse<MinorTargetType[]>> {
    return this.http.get<MinorTargetType[]>(
      environment.apiurl + 'minorTargetTypes',
      {
        observe: 'response',
      }
    );
  }

  getCascaderMinorTargetTypes(types: MinorTargetType[]): NzCascaderOption[] {
    let cascaders: NzCascaderOption[] = [];
    let hash = {};
    for (const type of types) {
      if (!hash[type.MajorTargetType.id]) {
        hash[type.MajorTargetType.id] = {};
        hash[type.MajorTargetType.id].label = type.MajorTargetType.name;
        hash[type.MajorTargetType.id].value = type.MajorTargetType.id;
        hash[type.MajorTargetType.id].children = [];
      }

      hash[type.MajorTargetType.id].children.push({
        value: type.id,
        label: type.name,
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

  getOneMinorTargetType(
    types: MinorTargetType[],
    majorTargetTypeId: string
  ): string[] {
    if (!majorTargetTypeId) {
      return [];
    }
    for (const type of types) {
      if (type.id === majorTargetTypeId) {
        return [type.MajorTargetType.name, type.name];
      }
    }

    return [];
  }
}
