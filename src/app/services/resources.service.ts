import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Environment */
import { environment } from '../../environments/environment';
/* rxjs */
import { Observable } from 'rxjs';
/* Models */
import { ResourceComponent, ResourceType, DocumentType } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Load all resource types
   */
  getResourceTypes(): Observable<ResourceType[]> {
    return this.http.get<ResourceType[]>(
      `${this.apiUrl}resources/resource-types`,
      {
        withCredentials: true,
      }
    );
  }
  /**
   * Add new resource type
   */
  addResourceType(resourceType: ResourceType): Observable<ResourceType> {
    return this.http.post<ResourceType>(`${this.apiUrl}resources/resource-types`, resourceType, {
      withCredentials: true,
    });
  }

  /**
   * Add component
   * @param resourceComponent ResourceComponent
   */
  addComponent(resourceComponent: ResourceComponent): Observable<ResourceComponent> {
    return this.http.post<ResourceComponent>(`${this.apiUrl}resources/resource-types/${resourceComponent.resourceTypeId}/components`, resourceComponent, {
      withCredentials: true,
    });
  }

  /**
   * Add document
   * @param document DocumentType
   */
  addDocument(document: DocumentType): Observable<DocumentType> {
    return this.http.post<DocumentType>(`${this.apiUrl}resources/resource-types/${document.resourceTypeId}/document-types`, document, {
      withCredentials: true,
    });
  }
}
