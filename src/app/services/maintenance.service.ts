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
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/maintenances`, {}, { withCredentials: true, });
  }

  /**
   * start maintenance
   * @param param Resource
   */
  startMaintenance({ resourceId, maintenanceId }: { resourceId: string, maintenanceId: string }): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/start-maintenance`, { maintenanceId }, { withCredentials: true, });
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
  getHistoryMaintenance({ page }: { page: number }): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}resources/maintenances-history?page=${page}`, { withCredentials: true, });
  }
}
