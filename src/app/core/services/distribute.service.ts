import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distribute } from '../../models/distribute.model';
import { environment } from 'src/environments/environment';
import { assembleRequestUrl } from '../utils';
import { IBaseHttpService } from '../interfaces/http.interface';

@Injectable({
  providedIn: 'root',
})
export class DistributeService implements IBaseHttpService<Distribute> {
  constructor(private http: HttpClient) {}

  get(
    query: { limit: number; offset: number } = null
  ): Observable<HttpResponse<Distribute[]>> {
    return this.http.get<Distribute[]>(
      assembleRequestUrl(query, environment.apiurl + 'handouts/distributes'),
      {
        observe: 'response',
      }
    );
  }
  post(distribute: Distribute): Observable<any> {
    return this.http.post(
      environment.apiurl + 'handouts/distributes',
      distribute
    );
  }

  delete(distribute: Distribute): Observable<any> {
    return this.http.delete(
      environment.apiurl + 'handouts/distributes/' + distribute.id
    );
  }

  put(distribute: Distribute): Observable<any> {
    return this.http.put(
      environment.apiurl + 'handouts/distributes/' + distribute.id,
      distribute
    );
  }
}
