import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addr } from '../models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddrService {
  constructor(private http: HttpClient) {}

  getAddrs(query: string = null): Observable<Addr[]> {
    query = query ? '?' + query : '';
    return this.http.get<Addr[]>(environment.apiurl + 'addrs' + query);
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
