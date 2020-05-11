import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Operator } from '../models/order.model';
import { Observable } from 'rxjs';
import { assembleRequestUrl } from './utils';
@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  constructor(private http: HttpClient) {} // Operator
  getOperators(
    query: { limit: number; offset: number } = null
  ): Observable<HttpResponse<Operator[]>> {
    return this.http.get<Operator[]>(
      assembleRequestUrl(query, environment.apiurl + 'operators'),
      {
        observe: 'response',
      }
    );
  }

  postOperator(operator: Operator): Observable<any> {
    return this.http.post(environment.apiurl + 'operators', operator);
  }

  deleteOperator(operator: Operator): Observable<any> {
    return this.http.delete(environment.apiurl + 'operators/' + operator.id);
  }

  putOperator(operator: Operator): Observable<any> {
    return this.http.put(
      environment.apiurl + 'operators/' + operator.id,
      operator
    );
  }
}
