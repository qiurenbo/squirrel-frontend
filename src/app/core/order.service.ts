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
  Project,
} from '../models/order.model';
import { assembleRequestUrl } from './utils';
import { NzCascaderOption } from 'ng-zorro-antd';
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
  getDefaultOption(targets: Target[], targetId: string): string[] {
    for (const target of targets) {
      if (target.id === targetId) {
        return [
          target.MinorTargetType.MajorTargetType.name,
          target.MinorTargetType.name,
          target.name,
        ];
      }
    }
  }
  getOrderTargetsCascader(targets: Target[]): NzCascaderOption[] {
    let cascader: NzCascaderOption[] = [];
    let hash = {};
    let hash2 = {};
    for (const target of targets) {
      let majorTargetType = target.MinorTargetType.MajorTargetType;
      let minorTargetType = target.MinorTargetType;
      if (!hash[majorTargetType.id]) {
        hash[majorTargetType.id] = {};
        hash[majorTargetType.id].children = [];
        hash[majorTargetType.id].label = majorTargetType.name;
        hash[majorTargetType.id].value = majorTargetType.id;
      }

      if (!hash2[minorTargetType.id]) {
        hash2[minorTargetType.id] = {};
        hash2[minorTargetType.id].children = [];
        hash2[minorTargetType.id].label = minorTargetType.name;
        hash2[minorTargetType.id].value = minorTargetType.id;
        hash[majorTargetType.id].children.push(hash2[minorTargetType.id]);
      }

      hash2[minorTargetType.id].children.push({
        label: target.name,
        value: target.id,
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

  /*projects*/
  getOrderProjects(query: any = null): Observable<HttpResponse<Project[]>> {
    return this.http.get<Project[]>(
      assembleRequestUrl(query, environment.apiurl + 'orders/projects'),
      {
        observe: 'response',
      }
    );
  }

  putOrderProject(project: Project): Observable<any> {
    return this.http.put(
      environment.apiurl + 'orders/projects/' + project.id,
      project
    );
  }

  postOrderProject(project: Project): Observable<any> {
    return this.http.post(environment.apiurl + 'orders/projects', project);
  }

  deleteOrderProject(project: Project): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'orders/projects/' + project.id
    );
  }
}
