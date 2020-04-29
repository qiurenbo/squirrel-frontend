import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: User): Observable<void> {
    return this.http
      .post<{ accessToken: string }>(
        environment.apiurl + 'login',
        JSON.stringify(user)
      )
      .pipe(
        map((accessToken) => {
          if (accessToken.accessToken) {
            localStorage.setItem('accessToken', accessToken.accessToken);
            this.router.navigate(['/order/stats']);
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/login');
  }
}
