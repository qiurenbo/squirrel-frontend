import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(environment.apiurl + 'accounts');
  }
  postAccount(account: Account): Observable<any> {
    return this.http.post(environment.apiurl + 'accounts', account);
  }

  deleteAccount(account: Account): Observable<any> {
    return this.http.delete(environment.apiurl + 'accounts/' + account.id);
  }

  putAccount(account: Account): Observable<any> {
    return this.http.put(
      environment.apiurl + 'accounts/' + account.id,
      account
    );
  }
}
