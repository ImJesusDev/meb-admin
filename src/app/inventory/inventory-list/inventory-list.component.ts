import { CreateCheckup } from './../state/inventory/inventory.actions';
import { ResourceType } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* rxjs */
import { Observable, of } from 'rxjs';
/* Models */
import { Resource } from '../../models';
import { RESOURCE_STATUS } from './../../models/inventory';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
import { StartLoader } from '@state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
/* Selectors */
import { getResources } from '../state/inventory/inventory.selector';
import {
  LoadResources as LoadResourcesTypes,
} from '../../resources/state/resources/resources.actions';
import { getResources as getResourceTypes } from '../../resources/state/resources/resources.selector';
/* Actions */
import {
  LoadResources,
} from '../state/inventory/inventory.actions';


@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  /* Observable of clients from store */
  resources$: Observable<Resource[]> = of([] as Resource[]);
  resourceId: string;
  resourceLength: number;

  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[]);

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  resourceStatus = RESOURCE_STATUS;

  page: number;
  perPage: number;

  resourceTypeId: string;
  client: string;
  office: string;
  state: string;


  showBackDrop = false;
  showModal = false;

  constructor(private store: Store<State>, private router: Router) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage }));
    this.store.dispatch(new LoadResourcesTypes());
    this.resourceTypeId = '';
    this.client = '';
    this.office = '';
    this.state = '';
    this.resourceLength = 0;
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    this.resourcesTypes$ = this.store.pipe(select(getResourceTypes));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    this.resources$.subscribe(data => this.resourceLength = data.length);
  }


  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.store.dispatch(new StartLoader());
      this.page = page;
      this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage }));
      this.resources$ = this.store.pipe(select(getResources));
      this.loader$ = this.store.pipe(select(getLoader));
    }
  }

  filterResources(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({
      page: this.page,
      perPage: this.perPage,
      client: this.client,
      office: this.office,
      status: this.state,
      type: this.resourceTypeId
    }));
    this.resources$ = this.store.pipe(select(getResources));
    this.loader$ = this.store.pipe(select(getLoader));
  }

  confirmCreateCheckup(resourceId: string): void {
    this.resourceId = resourceId;
    this.showBackDrop = true;
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }
  onCloseModal(ok?: boolean): void {
    console.log(ok)
    if (ok) {
      this.store.dispatch(new CreateCheckup({ resourceId: this.resourceId }));
    }
    this.showBackDrop = false;
    setTimeout(() => {
      this.showModal = false;
    }, 100);
  }

}
