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
      `${this.apiUrl}users?role=${role ? role : ''}`,
      {
        withCredentials: true,
      }
    );
  }

  /* Get All Team members */
  getTeam(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/team`, {
      withCredentials: true,
    });
  }
  /* Get All client admins */
  getClientAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/client-admins`, {
      withCredentials: true,
    });
  }
  /* Add Admin User */
  addAdmin(admin: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}users/admin/signup`, admin, {
      withCredentials: true,
    });
  }
}
