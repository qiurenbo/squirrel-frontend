import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model';
import { environment } from 'src/environments/environment';
import { assembleRequestUrl } from './utils';
import { IBaseHttpService } from './interface/http-interface.service';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService implements IBaseHttpService<Purchase> {
  constructor(private http: HttpClient) {}

  get(
    query: { limit: number; offset: number } = null
  ): Observable<HttpResponse<Purchase[]>> {
    return this.http.get<Purchase[]>(
      assembleRequestUrl(query, environment.apiurl + 'handouts/purchases'),
      {
        observe: 'response',
      }
    );
  }
  post(purchase: Purchase): Observable<any> {
    return this.http.post(environment.apiurl + 'handouts/purchases', purchase);
  }

  delete(purchase: Purchase): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'handouts/purchases/' + purchase.id
    );
  }

  put(purchase: Purchase): Observable<any> {
    return this.http.put(
      environment.apiurl + 'handouts/purchases/' + purchase.id,
      purchase
    );
  }
}
