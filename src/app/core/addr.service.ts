import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addr } from '../models/maintenance.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddrService {
  constructor(private http: HttpClient) {}

  getAddrs(): Observable<Addr[]> {
    return this.http.get<Addr[]>(environment.apiurl + 'addrs');
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
}
