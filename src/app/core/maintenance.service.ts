import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maintenances, Addr, Target } from '../models/maintenance.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class MaintainceService {
  constructor(private http: HttpClient) {}

  getMaintaincesByFilter(
    filter: {
      target: string;
      type: string;
      name: string;
      addr: string;
      date: string;
      _page: number;
      _limit: number;
    } = null
  ): Observable<Maintenances> {
    return this.http.get<Maintenances>(
      assembleRequestUrl(filter, environment.apiurl + 'maintenances')
    );
  }

  getMaintainceNames(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/names');
  }

  getMaintainceAddrs(): Observable<Addr[]> {
    return this.http.get<Addr[]>(environment.apiurl + 'maintenances/addrs');
  }

  getMaintainceTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(environment.apiurl + 'maintenances/targets');
  }

  getMaintainceActions(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/actions');
  }

  getMaintainceTypes(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/types');
  }

  postMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.post(environment.apiurl + 'maintenances/addrs', addr);
  }

  deleteMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'maintenances/addrs/' + addr.id
    );
  }

  putMaintainceAddr(addr: Addr): Observable<any> {
    return this.http.put(
      environment.apiurl + 'maintenances/addrs/' + addr.id,
      addr
    );
  }

  postMaintainceTarget(target: Target): Observable<any> {
    return this.http.post(environment.apiurl + 'maintenances/targets', target);
  }

  deleteMaintainceTarget(target: Target): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'maintenances/targets/' + target.id
    );
  }

  putMaintainceTarget(target: Target): Observable<any> {
    return this.http.put(
      environment.apiurl + 'maintenances/targets/' + target.id,
      target
    );
  }
}
