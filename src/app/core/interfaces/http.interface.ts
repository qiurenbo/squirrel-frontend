import { Observable } from 'rxjs';

export interface IBaseHttpService<T> {
  get(filter: any): Observable<any>;
  post(T): Observable<any>;
  put(T): Observable<any>;
  delete(T): Observable<any>;
}
