import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Login, User, Domain } from '../models';

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
   * Activate account
   */
  activate(activation: {
    activationCode: string;
    email: string;
  }): Observable<User> {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post<User>(`${this.apiUrl}users/activate`, activation, {
      headers: headers,
      withCredentials: true,
    });
  }
  /**
   * Change password
   */
  changePassword(passwordChange: {
    activationCode: string;
    email: string;
    password: string;
  }): Observable<User> {
    let headers: HttpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post<User>(
      `${this.apiUrl}users/update-password`,
      passwordChange,
      {
        headers: headers,
        withCredentials: true,
      }
    );
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

  /* Add Authorized Domains */
  addDomains(domains: { domains: Domain[] }): Observable<Domain[]> {
    return this.http.post<Domain[]>(`${this.apiUrl}users/domains`, domains, {
      withCredentials: true,
    });
  }
}
