import { Observable } from 'rxjs';

export interface IBaseHttpService<T> {
  get(): Observable<any>;
  post(T): Observable<any>;
  put(T): Observable<any>;
  delete(T): Observable<any>;
}
