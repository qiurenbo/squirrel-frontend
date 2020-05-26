import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addr } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { assembleRequestUrl } from './utils';
import { NzCascaderOption } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root',
})
export class AddrService {
  constructor(private http: HttpClient) {}

  getAddrs(
    query: { limit: number; offset: number } = null
  ): Observable<HttpResponse<Addr[]>> {
    return this.http.get<Addr[]>(
      assembleRequestUrl(query, environment.apiurl + 'addrs'),
      {
        observe: 'response',
      }
    );
  }
  postAddr(addr: Addr): Observable<any> {
    return this.http.post(environment.apiurl + 'addrs', addr);
  }

  deleteAddr(addr: Addr): Observable<any> {
    return this.http.delete(environment.apiurl + 'addrs/' + addr.id);
  }

  putAddr(addr: Addr): Observable<any> {
    return this.http.put(environment.apiurl + 'addrs/' + addr.id, addr);
  }

  getDefaultAddrOption(addrs: Addr[], addrId) {
    for (const addr of addrs) {
      if (addr.id === addrId) {
        return [addr.Street.Area.name, addr.Street.name, addr.name];
      }
    }
  }
  getCascaderAddrs(addrs: Addr[]): NzCascaderOption[] {
    let cascader: NzCascaderOption[] = [];
    let hash = {};
    let hash2 = {};
    for (const addr of addrs) {
      let area = addr.Street.Area;
      let street = addr.Street;
      if (!hash[area.id]) {
        hash[area.id] = {};
        hash[area.id].children = [];
        hash[area.id].label = area.name;
        hash[area.id].value = area.id;
      }

      if (!hash2[street.id]) {
        hash2[street.id] = {};
        hash2[street.id].children = [];
        hash2[street.id].label = street.name;
        hash2[street.id].value = street.id;
        hash[area.id].children.push(hash2[street.id]);
      }

      hash2[street.id].children.push({
        label: addr.name,
        value: addr.id,
        isLeaf: true,
      });
    }

    for (const key in hash) {
      if (hash.hasOwnProperty(key)) {
        cascader.push(hash[key]);
      }
    }
    return cascader;
  }
}
