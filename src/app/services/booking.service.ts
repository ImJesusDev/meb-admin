import { PaginationBooking, BookingFilters } from '../models/booking';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Checkup } from '@models/chekoups';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // getBookings(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}resources/reservation-list`, {
  //     withCredentials: true,
  //   });
  // }

   /**
   * Load all resources
   */
    getBookings(filters: BookingFilters = { page: 1, perPage: 20 }): Observable<PaginationBooking> {
      let query = '';
      if (filters.client) {
        query += '&client=' + filters.client;
      }
      if (filters.office) {
        query += '&office=' + filters.office;
      }
      if (filters.page) {
        query += '&page=' + filters.page;
      }
      if (filters.perPage) {
        query += '&perPage=' + filters.perPage;
      }
      if (filters.from) {
        query += '&from=' + filters.from;
      }
      if (filters.to) {
        query += '&to=' + filters.to;
      }
      if (filters.reference) {
        query += '&reference=' + filters.reference;
      }
      console.log(`${this.apiUrl}resources/reservation-list?${query}`);
      return this.http.get<PaginationBooking>(`${this.apiUrl}resources/reservation-list?${query}`,
        { withCredentials: true, });
    }



}
