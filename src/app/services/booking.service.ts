import { PaginationResources, ResourceFilters } from '../models/inventory';
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
export class BookingService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}resources/reservation-list`, {
      withCredentials: true,
    });
  }



}
