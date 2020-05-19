import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Target,
  OrderDetail,
  Malfunction,
  Action,
  Status,
} from '../models/order.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  /*statuses*/
  getOrderStatuses(): Observable<HttpResponse<Status[]>> {
    return this.http.get<any>(environment.apiurl + 'orders/statuses', {
      observe: 'response',
    });
  }

  /*stats*/
  getstats(): Observable<any> {
    return this.http.get<any>(environment.apiurl + 'orders/stats');
  }

  /*orders*/
  getOrders(query: any = null): Observable<HttpResponse<OrderDetail[]>> {
    return this.http.get<OrderDetail[]>(
      assembleRequestUrl(query, environment.apiurl + 'orders'),
      {
        observe: 'response',
      }
    );
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

  /*actions*/
  getOrderActions(query: any = null): Observable<HttpResponse<Action[]>> {
    return this.http.get<Action[]>(
      assembleRequestUrl(query, environment.apiurl + 'orders/actions'),
      { observe: 'response' }
    );
  }

  postOrderAction(action: Action): Observable<any> {
    return this.http.post(environment.apiurl + 'orders/actions', action);
  }

  deleteOrderAction(action: Action): Observable<any> {
    return this.http.delete(environment.apiurl + 'orders/actions/' + action.id);
  }

  putOrderAction(action: Action): Observable<any> {
    return this.http.put(
      environment.apiurl + 'orders/actions/' + action.id,
      action
    );
  }

  /*targets*/
  getOrderTargets(query: any = null): Observable<HttpResponse<Target[]>> {
    return this.http.get<Target[]>(
      assembleRequestUrl(query, environment.apiurl + 'orders/targets'),
      {
        observe: 'response',
      }
    );
  }

  postOrderTarget(target: Target): Observable<any> {
    return this.http.post(environment.apiurl + 'orders/targets', target);
  }

  deleteOrderTarget(target: Target): Observable<any> {
    return this.http.delete(environment.apiurl + 'orders/targets/' + target.id);
  }

  putOrderTarget(target: Target): Observable<any> {
    return this.http.put(
      environment.apiurl + 'orders/targets/' + target.id,
      target
    );
  }

  /*malfunctions*/
  getOrderMalfunctions(
    query: any = null
  ): Observable<HttpResponse<Malfunction[]>> {
    return this.http.get<Malfunction[]>(
      assembleRequestUrl(query, environment.apiurl + 'orders/malfunctions'),
      {
        observe: 'response',
      }
    );
  }

  putOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.put(
      environment.apiurl + 'orders/malfunctions/' + malfunction.id,
      malfunction
    );
  }

  postOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.post(
      environment.apiurl + 'orders/malfunctions',
      malfunction
    );
  }

  deleteOrderMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'orders/malfunctions/' + malfunction.id
    );
  }
}
