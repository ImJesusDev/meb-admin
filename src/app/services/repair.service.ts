import { PaginationResources, ResourceFilters } from './../models/inventory';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Resource } from '@models/index';
import { Checkup } from '@models/chekoups';

@Injectable({
  providedIn: 'root',
})
export class RepairService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  /**
   * Create repair
   * @param resourceId Resource id
   */
  createRepair(resourceId: string): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/repairs`, {}, { withCredentials: true, });
  }


  /**
   * start repair
   * @param resourceId Resource id
   */
  startRepair({ resourceId, repairId }: { resourceId: string, repairId: string }): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/start-repair`, { repairId }, { withCredentials: true, });
  }

  /**
   * Update repair
   * @param resourceId Resource id
   * @param data data
   */
  updateRepair(resourceId: string, data: any): Observable<Resource> {
    return this.http.put<Resource>(`${this.apiUrl}resources/${resourceId}/repairs`, data, { withCredentials: true, });
  }

  /**
   * Get History repairs
   */
  getHistoryRepairs(page: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}resources/repairs-history?page=${page}`, { withCredentials: true, });
  }
}
