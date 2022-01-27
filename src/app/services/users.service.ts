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

  constructor(private http: HttpClient) { }

  /* Get All Users */
  getUsers(role?: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}users?role=${role ? role : ''}`,
      {
        withCredentials: true,
      }
    );
  }

  /* Get All Eps List */
  getEps(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users/eps-list`, {
      withCredentials: true,
    });
  }

  /* Get All Transport Methods */
  getTransportMethods(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}users/transport-methods`, {
      withCredentials: true,
    });
  }

  /* Get All Countries */
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}locations/countries`, {
      withCredentials: true,
    });
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

  /**
   * Add user
   * @param user User to create
   * @returns Observable<User>
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}users/signup`, user, {
      withCredentials: true,
    });
  }

  /**
   * Add user
   * @param user User to create
   * @returns Observable<User>
   */
   updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}users/${user.id}`, user, {
      withCredentials: true,
    });
  }

  /**
   * Add user
   * @param user User to create
   * @returns Observable<User>
   */
   activeStateUser(ids: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}users/enable-users`, {users: ids}, {
        withCredentials: true,
      });
    }

    inactiveStateUser(ids: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}users/archive-users`, {users: ids}, {
        withCredentials: true,
      });
    }

    LoadMassiveUsers(users: any): Observable<any> {
      console.log(users);
      return this.http.post<any>(`${this.apiUrl}users/load-users`, {role: 'user', users: users}, {
        withCredentials: true,
      });
    }
}
