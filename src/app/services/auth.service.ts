import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Login } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * login function
   */
  login(login: Login): Observable<any> {
    let enco: any = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}users/signin`, login, {
      headers: enco,
      observe: 'response',
      withCredentials: true,
    });
  }
}
