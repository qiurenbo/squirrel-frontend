import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Operator } from '../models/maintenance.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OperatorService {
  constructor(private http: HttpClient) {} // Operator
  getOperators(): Observable<Operator[]> {
    return this.http.get<Operator[]>(environment.apiurl + 'operators');
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