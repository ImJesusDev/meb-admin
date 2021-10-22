import { getClients } from 'src/app/clients/state/clients/clients.selector';
import { LoadClients } from 'src/app/clients/state/clients';
import { Navigation } from './../../utils/helpers/navigation.helper';
import { Client } from './../../models/client';
import { ApproveRepair } from './../../inventory/state/inventory/inventory.actions';
import { Checkup } from './../../models/chekoups';
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
import { State } from '../../inventory/state';
import { StartLoader } from '@state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
/* Selectors */
import { getResources } from '../../inventory/state/inventory/inventory.selector';
/* Actions */
import {
  LoadResources,
} from '../../inventory/state/inventory/inventory.actions';

@Component({
  selector: 'app-approvals-pending-repair',
  templateUrl: './approvals-pending-repair.component.html',
  styleUrls: ['./approvals-pending-repair.component.css']
})
export class ApprovalsPendingRepairComponent implements OnInit {

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

  showBackDrop = false;
  showModal = false;

  showBackDropL = false;
  showModalL = false;

  checkup: Checkup;

  client: string;
  clientSelected: Client;
  office: string;
  state: string;
  from: string;
  to: string;
  reference: string;
  days: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    private navigation: Navigation,
    private route: ActivatedRoute
  ) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.resourceLength = 0;
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
    };

    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.state = '';
    this.from = '';
    this.to = '';
    this.reference = '';
    this.days = '';

    this.store.dispatch(new StartLoader());
    this.setQueryParams();
    this.loadResources();
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    this.resources$.subscribe(data => this.resourceLength = data.length);
  }

  setQueryParams(): void {
    this.route.queryParams.subscribe(
      params => {
        this.client = params.client;
        this.office = params.office;
        this.from = params.from;
        this.to = params.to;
        this.reference = params.reference;
      }
    );
  }
  loadResources(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({
      page: this.page,
      perPage: this.perPage,
      status: this.resourceStatus.WaitingApprovalRepair,
      client: this.client,
      office: this.office,
      from: this.from,
      to: this.to,
      reference: this.reference,
      days: this.days,
    }));
  }

  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.page = page;
      this.loadResources();
    }
  }

  cleanFilter(): void {
    this.page = 1;    
    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.days = '';
    this.from = '';
    this.to = '';
    this.reference = '';
    this.loadResources();
  }

  validateRangeDays(num:number): boolean{
    let dayval = this.days;
    if(parseInt(dayval) > 0){
      if(parseInt(dayval) == 0 && num == 0){
        return true;
      }else if(parseInt(dayval) == 3 && num >= 1 && num <= 3){
        return true;
      }else if(parseInt(dayval) == 5 && num >= 4 && num <= 6){
        return true;
      }else if(parseInt(dayval) == 6 && num >= 7){
        return true;
      }
      return false;
    }else{
      return true;
    }
  }

  filterResources(): void {
    this.page = 1;
    this.loadResources();
    this.navigation.setQueryParams({
      client: this.client ? this.client : null,
      office: this.office && this.client ? this.office : null,
      status: this.state ? this.state : null,
      from: this.from,
      to: this.to,
      reference: this.reference,
      days: this.days,
    });
  }
  selectClient(): void {
    this.clients$.subscribe(clients => this.clientSelected = clients.find(c => c.name === this.client) as Client);
    this.filterResources();
  }



  calcDays(date: string): number {
    const checkUpDate = new Date(date);
    const currentDate = new Date();

    const sub = currentDate.getTime() - checkUpDate.getTime();
    const results = Math.round(sub / (1000 * 60 * 60 * 24));
    return results;
  }




  /* MODALS */

  openLastCheckup(checkup: Checkup, resourceId: string): void {
    if (checkup) {
      this.resourceId = resourceId;
      this.checkup = checkup;
      this.showBackDropL = true;
      setTimeout(() => {
        this.showModalL = true;
      }, 100);
    }
  }
  onCloseLastModal(): void {
    this.showBackDropL = false;
    setTimeout(() => {
      this.showModalL = false;
    }, 100);
  }


  openConfirmModal(checkup: Checkup, resourceId: string): void {
    this.resourceId = resourceId;
    this.checkup = checkup;
    this.showBackDrop = true;
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }
  onCloseConfirmModal(ok?: boolean): void {
    if (ok) {
      this.store.dispatch(new ApproveRepair({ resourceId: this.resourceId, repairId: this.checkup.id }));
    }
    this.showBackDrop = false;
    setTimeout(() => {
      this.showModal = false;
    }, 100);
  }

}
