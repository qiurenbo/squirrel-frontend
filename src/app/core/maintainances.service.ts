import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Maintainance } from '../models/maintainance.model';
@Injectable({
  providedIn: 'root'
})
export class MaintainceService {
  constructor(private http: HttpClient) {}

  getMaintaincesByFilter(): Observable<Maintainance[]> {
    return this.http.get<Maintainance[]>(environment.apiurl + 'maintainances');
  }
}
