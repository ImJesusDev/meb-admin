import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Resource } from '@models/index';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Load all resources
   */
  getResources(): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.apiUrl}resources`, { withCredentials: true, });
  }
  /**
   * Add new resource
   * @param resource Resource
   */
  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources`, resource, { withCredentials: true, });
  }

}
