import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase } from '../../models/purchase.model';
import { environment } from 'src/environments/environment';
import { assembleRequestUrl } from '../utils';
import { IBaseHttpService } from '../interfaces/http.interface';
import { NzCascaderOption } from 'ng-zorro-antd';

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

  getDefaultOption(purchases: Purchase[], purchaseId) {
    for (const purchase of purchases) {
      if (purchase.id === purchaseId) {
        return [
          purchase.date.slice(0, 4), // 20200101 -> 2020
          purchase.projectName,
          purchase.productName,
        ];
      }
    }
  }
  getCascader(purchases: Purchase[]): NzCascaderOption[] {
    let cascader: NzCascaderOption[] = [];
    let hash = {};

    for (const purchase of purchases) {
      let year = purchase.date.slice(0, 4);

      if (!hash[year]) {
        hash[year] = {};
        hash[year].children = [];
        hash[year].label = year;
        hash[year].value = year;
      }

      if (!hash[year][purchase.projectName]) {
        hash[year][purchase.projectName] = {};
        hash[year][purchase.projectName].children = [];
        hash[year][purchase.projectName].label = purchase.projectName;
        hash[year][purchase.projectName].value = purchase.projectName;
        hash[year].children.push(hash[year][purchase.projectName]);
      }

      hash[year][purchase.projectName].children.push({
        label: purchase.productName,
        value: purchase.id,
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
