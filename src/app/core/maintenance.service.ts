import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.mock';
import {
  Addr,
  Target,
  MaintenanceDetail,
  Operator,
  Malfunction,
  Action,
} from '../models/maintenance.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class MaintainceService {
  constructor(private http: HttpClient) {}

  getMaintainces(filter: any = null): Observable<MaintenanceDetail[]> {
    if (environment.mock) {
      // convert pagination to slice because json-server didn't support pagination to get total
      // https://github.com/typicode/json-server/pull/1080
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      return this.http.get<MaintenanceDetail[]>(
        assembleRequestUrl(
          filter,
          environment.apiurl + 'maintenances',
          '_expand=addr&_expand=operator&_expand=action&_expand=malfunction&_expand=target'
        )
      );
    }
  }

  getMaintainceNames(): Observable<Operator[]> {
    return this.http.get<Operator[]>(environment.apiurl + 'operators');
  }

  getMaintainceAddrs(): Observable<Addr[]> {
    return this.http.get<Addr[]>(environment.apiurl + 'addrs');
  }

  getMaintainceTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(environment.apiurl + 'targets');
  }

  getMaintainceActions(filter: any = null): Observable<Action[]> {
    if (environment.mock) {
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      return this.http.get<Action[]>(
        assembleRequestUrl(
          filter,
          environment.apiurl + 'actions',
          '_expand=malfunction&_expand=target'
        )
      );
    }
  }

  getMaintainceMalfunctions(filter: any = null): Observable<Malfunction[]> {
    if (environment.mock) {
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      return this.http.get<Malfunction[]>(
        assembleRequestUrl(
          filter,
          environment.apiurl + 'malfunctions',
          '_expand=target'
        )
      );
    }
  }

  postMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.post(environment.apiurl + 'addrs', addr);
  }

  deleteMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.delete(environment.apiurl + 'addrs/' + addr.id);
  }

  putMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.put(environment.apiurl + 'addrs/' + addr.id, addr);
  }

  postMaintainceTarget(target: Target): Observable<any> {
    return this.http.post(environment.apiurl + 'targets', target);
  }

  deleteMaintainceTarget(target: Target): Observable<any> {
    return this.http.delete(environment.apiurl + 'targets/' + target.id);
  }

  putMaintainceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.put(
      environment.apiurl + 'malfunctions/' + malfunction.id,
      malfunction
    );
  }

  postMaintainceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.post(environment.apiurl + 'malfunctions', malfunction);
  }

  deleteMaintainceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'malfunctions/' + malfunction.id
    );
  }

  putMaintainceTarget(target: Target): Observable<any> {
    return this.http.put(environment.apiurl + 'targets/' + target.id, target);
  }

  postMaintainceAction(action: Action): Observable<any> {
    return this.http.post(environment.apiurl + 'actions', action);
  }

  deleteMaintainceAction(action: Action): Observable<any> {
    return this.http.delete(environment.apiurl + 'actions/' + action.id);
  }

  putMaintainceAction(action: Action): Observable<any> {
    return this.http.put(environment.apiurl + 'actions/' + action.id, action);
  }
}
