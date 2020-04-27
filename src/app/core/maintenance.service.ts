import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Target,
  MaintenanceDetail,
  Malfunction,
  Action,
} from '../models/maintenance.model';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(private http: HttpClient) {}

  getMaintenanceStats(): Observable<any> {
    return this.http.get<any>(environment.apiurl + 'maintenanceStats');
  }

  getMaintenances(filter: any = null): Observable<MaintenanceDetail[]> {
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

      return this.http.get<MaintenanceDetail[]>(
        assembleRequestUrl(
          filter,
          environment.apiurl + 'maintenances',
          relations
        )
      );
    }
  }

  postMaintenance(maintenance: MaintenanceDetail): Observable<any> {
    return this.http.post(environment.apiurl + 'maintenances', maintenance);
  }

  putMaintenance(maintenance: MaintenanceDetail): Observable<any> {
    return this.http.put(
      environment.apiurl + 'maintenances/' + maintenance.id,
      maintenance
    );
  }

  deleteMaintenance(maintenance: MaintenanceDetail): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'maintenances/' + maintenance.id
    );
  }

  getMaintenanceTargets(): Observable<Target[]> {
    return this.http.get<Target[]>(environment.apiurl + 'targets');
  }

  getMaintenanceActions(filter: any = null): Observable<Action[]> {
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

  getMaintenanceMalfunctions(filter: any = null): Observable<Malfunction[]> {
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

  postMaintenanceTarget(target: Target): Observable<any> {
    return this.http.post(environment.apiurl + 'targets', target);
  }

  deleteMaintenanceTarget(target: Target): Observable<any> {
    return this.http.delete(environment.apiurl + 'targets/' + target.id);
  }

  putMaintenanceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.put(
      environment.apiurl + 'malfunctions/' + malfunction.id,
      malfunction
    );
  }

  postMaintenanceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.post(environment.apiurl + 'malfunctions', malfunction);
  }

  deleteMaintenanceMalfunction(malfunction: Malfunction): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'malfunctions/' + malfunction.id
    );
  }

  putMaintenanceTarget(target: Target): Observable<any> {
    return this.http.put(environment.apiurl + 'targets/' + target.id, target);
  }

  postMaintenanceAction(action: Action): Observable<any> {
    return this.http.post(environment.apiurl + 'actions', action);
  }

  deleteMaintenanceAction(action: Action): Observable<any> {
    return this.http.delete(environment.apiurl + 'actions/' + action.id);
  }

  putMaintenanceAction(action: Action): Observable<any> {
    return this.http.put(environment.apiurl + 'actions/' + action.id, action);
  }
}
