import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maintenances } from '../models/maintenance.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root'
})
export class MaintainceService {
  constructor(private http: HttpClient) {}

  getMaintaincesByFilter(
    filter: {
      device: string;
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

  getMaintainceAddrs(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/addrs');
  }

  getMaintainceDevices(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/devices');
  }

  getMaintainceActions(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/actions');
  }

  getMaintainceTypes(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiurl + 'maintenances/types');
  }
}
