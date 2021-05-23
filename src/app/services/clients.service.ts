import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Client } from '../models';
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Load all clients
   */
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}clients`, {
      withCredentials: true,
    });
  }

  /**
   * Add new client
   */
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}clients`, client, {
      withCredentials: true,
    });
  }
  /**
   * Update client
   */
  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}clients/${client.id}`, client, {
      withCredentials: true,
    });
  }
  /**
   * Delete a client
   */
  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}clients/${id}`, {
      withCredentials: true,
    });
  }
}
