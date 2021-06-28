import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { Country } from '../models';
/* Environment */
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Load all clients
   */
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}locations/countries`, {
      withCredentials: true,
    });
  }
}
