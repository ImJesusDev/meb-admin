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
export class ApproveService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  /**
   * approve repair
   * @param resourceId Resource id
   */
  approveRepair({ resourceId, repairId }: { resourceId: string, repairId: string }): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/approve-repair`, { repairId }, { withCredentials: true, });
  }

  /**
   * approve maintenance
   * @param param Resource
   */
  approveMaintenance({ resourceId, maintenanceId }: { resourceId: string, maintenanceId: string }): Observable<Resource> {
    return this.http.post<Resource>(`${this.apiUrl}resources/${resourceId}/approve-maintenance`, { maintenanceId },
      { withCredentials: true, });
  }

}
