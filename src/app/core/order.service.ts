import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Target,
  OrderDetail,
  Malfunction,
  Action,
} from '../models/order.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrderStats(): Observable<any> {
    return this.http.get<any>(environment.apiurl + 'orderStats');
  }

  getOrders(filter: any = null): Observable<OrderDetail[]> {
    let relations =
      '_expand=addr&_expand=operator&_expand=action&_expand=malfunction&_expand=target&_sort=date&_order=desc';
    if (environment.mock) {
      // convert pagination to slice because json-server didn't support pagination to get total
      // https://github.com/typicode/json-server/pull/1080
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      if (filter?.startDate && filter?.endDate) {
        relations +=
          '&date_gte=' + filter.startDate + '&date_lte=' + filter.endDate;
        delete filter.startDate;
        delete filter.endDate;
      }

      return this.http.get<OrderDetail[]>(
        assembleRequestUrl(filter, environment.apiurl + 'orders', relations)
      );
    }
  }

  postOrder(order: OrderDetail): Observable<any> {
    return this.http.post(environment.apiurl + 'orders', order);
  }

  putOrder(order: OrderDetail): Observable<any> {
    return this.http.put(environment.apiurl + 'orders/' + order.id, order);
  }

  deleteOrder(order: OrderDetail): Observable<any> {
    return this.http.delete(environment.apiurl + 'orders/' + order.id);
  }

  getOrderTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(environment.apiurl + 'targets');
  }

  getOrderActions(filter: any = null): Observable<Action[]> {
    if (environment.mock) {
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      return this.http.get<Action[]>(
        assembleRequestUrl(filter, environment.apiurl + 'actions')
      );
    }
  }

  getOrderMalfunctions(filter: any = null): Observable<Malfunction[]> {
    if (environment.mock) {
      if (filter?._page && filter?._limit) {
        filter.start = (filter._page - 1) * filter._limit;
        filter.end = (filter._page - 1) * filter._limit;
        delete filter._limit;
        delete filter._page;
      }

      return this.http.get<Malfunction[]>(
        assembleRequestUrl(filter, environment.apiurl + 'malfunctions')
      );
    }
  }

  postOrderTarget(target: Target): Observable<any> {
    return this.http.post(environment.apiurl + 'targets', target);
  }

  deleteOrderTarget(target: Target): Observable<any> {
    return this.http.delete(environment.apiurl + 'targets/' + target.id);
  }

  putOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.put(
      environment.apiurl + 'malfunctions/' + malfunction.id,
      malfunction
    );
  }

  postOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.post(environment.apiurl + 'malfunctions', malfunction);
  }

  deleteOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'malfunctions/' + malfunction.id
    );
  }

  putOrderTarget(target: Target): Observable<any> {
    return this.http.put(environment.apiurl + 'targets/' + target.id, target);
  }

  postOrderAction(action: Action): Observable<any> {
    return this.http.post(environment.apiurl + 'actions', action);
  }

  deleteOrderAction(action: Action): Observable<any> {
    return this.http.delete(environment.apiurl + 'actions/' + action.id);
  }

  putOrderAction(action: Action): Observable<any> {
    return this.http.put(environment.apiurl + 'actions/' + action.id, action);
  }
}
