import { Office } from './../../models/office';
import { getClients } from './../../clients/state/clients/clients.selector';
import { LoadClients } from './../../clients/state/clients/clients.actions';
import { Client } from './../../models/client';
import { Navigation } from './../../utils/helpers/navigation.helper';
import { CreateCheckup, UpdateResource, UpdateResourceSuccess } from './../state/inventory/inventory.actions';
import { ResourceType } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* rxjs */
import { Observable, of } from 'rxjs';
/* Models */
import { Resource } from '../../models';
import { RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
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
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);


  resourceStatus = RESOURCE_STATUS;
  resourceStatusNames = RESOURCE_STATUS_NAMES;

  page: number;
  perPage: number;

  resourceTypeId: string;
  client: string;
  clientSelected: Client;
  office: string;
  state: string;


  showBackDrop = false;
  showModal = false;

  checkedResources: Resource[];

  constructor(
    private store: Store<State>,
    private router: Router,
    private navigation: Navigation,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.resourceTypeId = '';
    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.state = '';
    this.resourceLength = 0;
    this.checkedResources = [];
    this.route.queryParams.subscribe(
      params => {
        this.client = params.client;
        this.office = params.office;
        this.state = params.status;
        this.resourceTypeId = params.type;
      });
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({
      page: this.page,
      perPage: this.perPage,
      client: this.client,
      office: this.office,
      status: this.state,
      type: this.resourceTypeId
    }));
    this.store.dispatch(new LoadResourcesTypes());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
    // this.navigation.setQueryParams({ client: null, office: null, status: null, type: null });
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    this.resourcesTypes$ = this.store.pipe(select(getResourceTypes));
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    this.resources$.subscribe(data => {
      this.resourceLength = data.length;
      Object.assign(this.checkedResources, data);
    });
    this.clients$.subscribe(clients => this.clientSelected = clients.find(c => c.name === this.client) as Client);
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

  cleanFilter(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({
      client: '',
      office: '',
      status: '',
      type: ''
    }));
    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.state = '';
    this.resourceTypeId = '';
  }

  filterResources(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({
      client: this.client,
      office: this.office,
      status: this.state,
      type: this.resourceTypeId
    }));
    this.resources$ = this.store.pipe(select(getResources));
    this.loader$ = this.store.pipe(select(getLoader));
    this.navigation.setQueryParams({
      client: this.client ? this.client : null,
      office: this.office && this.client ? this.office : null,
      status: this.state ? this.state : null,
      type: this.resourceTypeId ? this.resourceTypeId : null
    });
  }

  confirmCreateCheckup(resourceId: string): void {
    this.resourceId = resourceId;
    this.showBackDrop = true;
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }
  onCloseModal(ok?: boolean): void {
    if (ok) {
      this.store.dispatch(new CreateCheckup({ resourceId: this.resourceId }));
    }
    this.showBackDrop = false;
    setTimeout(() => {
      this.showModal = false;
    }, 100);
  }

  selectClient(): void {
    this.clients$.subscribe(clients => this.clientSelected = clients.find(c => c.name === this.client) as Client);
    this.filterResources();
  }

  changeChecked(index: number): any {
    this.checkedResources[index] = { ...this.checkedResources[index], checked: !this.checkedResources[index].checked };
    this.store.dispatch(new UpdateResourceSuccess(this.checkedResources[index]));
  }

  getCheckedResources(): Resource[] {
    return this.checkedResources;
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
