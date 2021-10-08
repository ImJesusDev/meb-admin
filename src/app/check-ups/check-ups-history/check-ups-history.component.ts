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
      }
    );
    this.store.dispatch(new StartLoader());
  }

  ngOnInit(): void {
    this.getHistory();
    this.loader$ = this.store.pipe(select(getLoader));
  }

  getHistory(): void {
    this.store.dispatch(new StartLoader());
    this.resources$ = this.inventoryService.getCheckupHistory({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: this.perPage
    });
    this.resources$.subscribe(data => {
      this.resourceLength = data.checkups?.length;
      this.store.dispatch(new StopLoader());
    });
  }
  filterResources(): void {
    this.page = 1;
    this.store.dispatch(new StartLoader());
    this.getHistory();
    this.navigation.setQueryParams({
      days: this.days ? this.days : null,
      reference: this.reference,
      from: this.from,
      to: this.to,
    });
  }
  selectClient(): void {
      this.filterResources();
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
