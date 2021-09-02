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
    if (filters.page) {
      query += '&page=' + filters.page;
    }
    if (filters.perPage) {
      query += '&perPage=' + filters.perPage;
    }
    return this.http.get<PaginationResources>(`${this.apiUrl}resources?${query}`,
      { withCredentials: true, });
  }

  /**
   * Get resource by id
   * @param resourceId string
   */
  getResourceById(resourceId: string): Observable<Resource> {
    return this.http.get<Resource>(`${this.apiUrl}resources/find/${resourceId}`, { withCredentials: true, });
  }

  /**
   * Add new resource
   * @param resource Resource
   */
  addResource(resource: Resource): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources`, resource, { withCredentials: true, });
  }



  /**
   * Create checkup
   * @param resourceId Resource id
   */
  createCheckup(resourceId: string): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/checkups`, { }, { withCredentials: true, });
  }

  /**
   * Create checkups
   * @param resources resources to create checkups
   */
  createCheckups({ resources }: { resources: Resource[] }): Observable<Resource[]> {
    return this.http.post<Resource[]>(`${this.apiUrl}resources/load-resources`, { resources }, { withCredentials: true, });
  }

  /**
   * Get checkup history
   * @param page Page
   * @param perPage Per page
   */
  getCheckupHistory(page: number, perPage: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}resources/checkups-history?page=${page}&perPage=${perPage}`, { withCredentials: true, });
  }

  /**
   * Update checkup
   * @param resourceId Resource id
   * @param data data
   */
  updateCheckup(resourceId: string, data: any): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}resources/${resourceId}/checkups`, data, { withCredentials: true, });
  }

  /**
   * approve
   * @param resourceId Resource id
   */
  approve(resourceId: string): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/approve`, { }, { withCredentials: true, });
  }

}
