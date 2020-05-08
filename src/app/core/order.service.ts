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
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  /*stats*/
  getstats(): Observable<any> {
    return this.http.get<any>(environment.apiurl + 'orders/stats');
  }

  /*orders*/
  getOrders(query: string = null): Observable<OrderDetail[]> {
    query = query ? '?' + query : '';
    return this.http.get<OrderDetail[]>(environment.apiurl + 'orders' + query);
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
  getOrderActions(query: string = null): Observable<Action[]> {
    query = query ? '?' + query : '';
    return this.http.get<Action[]>(
      environment.apiurl + 'orders/actions?' + query
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
  getOrderTargets(query: string = null): Observable<Target[]> {
    query = query ? '?' + query : '';
    return this.http.get<Target[]>(
      environment.apiurl + 'orders/targets' + query
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
  getOrderMalfunctions(query: string = null): Observable<Malfunction[]> {
    query = query ? '?' + query : '';
    return this.http.get<Malfunction[]>(
      environment.apiurl + 'orders/malfunctions' + query
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
