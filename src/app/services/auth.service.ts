import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Login, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * login function
   */
  login(login: Login): Observable<User> {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post<User>(`${this.apiUrl}users/signin`, login, {
      headers: headers,
      withCredentials: true,
    });
  }
  /**
   * Log out function
   */
  logOut(): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}users/signout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
