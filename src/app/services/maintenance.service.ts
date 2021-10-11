import { PaginationResources, ResourceFilters } from '../models/inventory';
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
export class MaintenanceService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  /**
   * Create maintenance
   * @param resourceId Resource id
   */
  createMaintenance(resourceId: string): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/maintenances`, { }, { withCredentials: true, });
  }

  /**
   * Create checkups
   * @param resources resources to create checkups
   */
  createMaintenances({ resources }: { resources: { id: string }[] }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}resources/load-maintenances`, { resources }, { withCredentials: true, });
  }

  /**
   * start maintenance
   * @param param Resource
   */
  startMaintenance({ resourceId, maintenanceId }: { resourceId: string, maintenanceId: string }): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/start-maintenance`,
      { maintenanceId }, { withCredentials: true, });
  }

  /**
   * Update maintenance
   * @param resourceId Resource id
   * @param data data
   */
  updateMaintenance(resourceId: string, data: any): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}resources/${resourceId}/maintenances`, data, { withCredentials: true, });
  }

  /**
   * Get History maintenance
   */
  getHistoryMaintenance(
    { page,
      perPage = 10,
      status,
      from,
      to,
      client,
      office,
      reference,
      days,
    }:
      {
        page?: number,
        perPage?: number,
        status?: string,
        from?: string,
        to?: string,
        client?: string,
        office?: string,
        reference?: string,
        days?: string,
      }
  ): Observable<any> {
    let query = '';
    if (page) {
      query += '&page=' + page;
    }
    if (perPage) {
      query += '&perPage=' + perPage;
    }
    if (status) {
      query += '&status=' + status;
    }
    if (from) {
      query += '&from=' + from;
    }
    if (to) {
      query += '&to=' + to;
    }
    if (client) {
      query += '&client=' + client;
    }
    if (office) {
      query += '&office=' + office;
    }
    if (reference) {
      query += '&reference=' + reference;
    }
    if (days) {
      query += '&days=' + days;
    }
    console.log(`${this.apiUrl}resources/maintenances-history?${query}`);
    return this.http.get<any>(`${this.apiUrl}resources/maintenances-history?${query}`,
      { withCredentials: true, });
  }
}
