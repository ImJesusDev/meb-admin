import { Navigation } from './../../utils/helpers/navigation.helper';
import { Checkup } from './../../models/chekoups';
import { Client, ResourceType } from 'src/app/models';
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
import { StartLoader, StopLoader } from '@state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
/* Selectors */
import { getResources } from '../../inventory/state/inventory/inventory.selector';
/* Actions */
import {
  LoadResources,
} from '../../inventory/state/inventory/inventory.actions';
import { InventoryService } from '@services/inventory.service';
import { LoadClients } from 'src/app/clients/state/clients/clients.actions';
import { getClients } from 'src/app/clients/state/clients/clients.selector';


@Component({
  selector: 'app-check-ups-history',
  templateUrl: './check-ups-history.component.html',
  styleUrls: ['./check-ups-history.component.css']
})
export class CheckUpsHistoryComponent implements OnInit {


  /* Observable of clients from store */
  // resources$: Observable<Resource[]> = of([] as Resource[]);
  resources$: Observable<{ page: number, perPage: number, totalResults: number, checkups: Checkup[] }> = of({ } as {
    page: number, perPage: number, totalResults: number, checkups: Checkup[]
  });
  resourceId: string;
  resourceLength: number;

  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[]);
  clients$: Observable<Client[]> = of([] as Client[]);

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  resourceStatus = RESOURCE_STATUS;
  resourceStatusNames = RESOURCE_STATUS_NAMES;

  page: number;
  perPage: number;

  showBackDropL = false;
  showModalL = false;

  checkup: Checkup;
  
  client: string | undefined;
  clientSelected: Client | undefined;
  office: string;
  days: string;
  from: string;
  to: string;
  reference: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private navigation: Navigation
  ) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.resourceLength = 0;
    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.days = '';
    this.from = '';
    this.to = '';
    this.reference = '';
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
    };
    this.from = '';
    this.to = '';
    this.route.queryParams.subscribe(
      params => {
        this.from = params.from;
        this.to = params.to;
        this.reference = params.reference;
        this.days = params.days;
        this.client = params.client;
        this.office = params.office;
        this.days = params.days;
      }
    );
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
  }

  ngOnInit(): void {
    this.getHistory();
    this.loader$ = this.store.pipe(select(getLoader));
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
  }

  cleanFilter(): void {
    this.store.dispatch(new StartLoader());
    this.resources$ = this.inventoryService.getCheckupHistory({
      from: '',
      to: '',
      page: this.page,
      perPage: this.perPage,
      reference:'',
      days: '',
      client: '',
      office: ''
    });
    this.resources$.subscribe(data => {
      this.resourceLength = data.checkups?.length;
      this.store.dispatch(new StopLoader());
    });
    this.client = '';
    this.clientSelected = { } as Client;
    this.office = '';
    this.days = '';
    this.from = '';
    this.to = '';
    this.reference = '';
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

  getHistory(): void {
    this.store.dispatch(new StartLoader());
    this.resources$ = this.inventoryService.getCheckupHistory({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: this.perPage,
      reference: this.reference,
      days: this.days,
      client: this.client,
      office: this.office,
    });
    this.resources$.subscribe(data => {
      this.resourceLength = data.checkups?.length;
      this.store.dispatch(new StopLoader());
    });
  }
  selectClient(): void {
    this.clients$.subscribe(clients => this.clientSelected = clients.find(c => c.name === this.client) as Client);
    this.getHistory();
  }

  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.store.dispatch(new StartLoader());
      this.page = page;
      this.getHistory();
    }
  }

  calcDays(date: string): number {
    const checkUpDate = new Date(date);
    const currentDate = new Date();

    const sub = currentDate.getTime() - checkUpDate.getTime();
    const results = Math.round(sub / (1000 * 60 * 60 * 24));
    return results;
  }


  openLastCheckup(checkup: Checkup, resourceId: string): void {
    this.resourceId = resourceId;
    this.checkup = checkup;
    this.showBackDropL = true;
    setTimeout(() => {
      this.showModalL = true;
    }, 100);
  }
  onCloseLastModal(): void {
    this.showBackDropL = false;
    setTimeout(() => {
      this.showModalL = false;
    }, 100);
  }

}
