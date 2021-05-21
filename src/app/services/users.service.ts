import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/* Environment */
import { environment } from '../../environments/environment';
/* Models */
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /* Get All Users */
  getUsers(role?: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}users?role=${role ? role : ''}`
    );
  }
}
