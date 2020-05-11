import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addr } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { assembleRequestUrl } from './utils';

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
}
