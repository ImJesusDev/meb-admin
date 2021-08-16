import { PaginationResources, ResourceFilters } from './../models/inventory';
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
   * @param {{
   * page:number|undefined;
   * perPage:number|undefined;
   * }} filters
   * @returns {Observable<Resource[]>}
   */
  getResources(filters: ResourceFilters = { page: 1, perPage: 10 }): Observable<PaginationResources> {
    let query = '';
    if (filters.client) {
      query += '&client=' + filters.client;
    }
    if (filters.office) {
      query += '&office=' + filters.office;
    }
    if (filters.status) {
      query += '&status=' + filters.status;
    }
    if (filters.type) {
      query += '&type=' + filters.type;
    }
    return this.http.get<PaginationResources>(`${this.apiUrl}resources?page=${filters.page}&perPage=${filters.perPage}${query}`, { withCredentials: true, });
  }
  /**
   * Add new resource
   * @param resource Resource
   */
  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources`, resource, { withCredentials: true, });
  }

}
