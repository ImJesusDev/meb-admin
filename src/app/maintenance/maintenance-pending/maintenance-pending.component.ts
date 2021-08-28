import { Checkup } from './../../models/chekoups';
import { ResourceType } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
import { StartMaintenance, UpdateMaintenance } from '../state/maintenance';

@Component({
  selector: 'app-maintenance-pending',
  templateUrl: './maintenance-pending.component.html',
  styleUrls: ['./maintenance-pending.component.css']
})
export class MaintenancePendingComponent implements OnInit {

  /* Observable of clients from store */
  resources$: Observable<Resource[]> = of([] as Resource[]);
  resourceId: string;
  resourceLength: number;

  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[]);

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  resourceStatus = RESOURCE_STATUS;
  resourceStatusNames = RESOURCE_STATUS_NAMES;

  page: number;
  perPage: number;

  /* Modals */
  showBackDrop = false;
  showModal = false;

  showBackDropL = false;
  showModalL = false;

  showBackDropStart = false;
  showModalStart = false;


  checkup: Checkup;

  constructor(private store: Store<State>, private router: Router) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage, status: this.resourceStatus.PendingMaintenance }));
    this.resourceLength = 0;
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
    };
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
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
      this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage, status: this.resourceStatus.PendingMaintenance }));
      this.resources$ = this.store.pipe(select(getResources));
      this.loader$ = this.store.pipe(select(getLoader));
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

  openStartMaintenance(checkup: Checkup, resourceId: string): void {
    this.resourceId = resourceId;
    this.checkup = checkup;
    this.showBackDropStart = true;
    setTimeout(() => {
      this.showModalStart = true;
    }, 100);
  }
  onCloseModalStartMaintenance(ok?: boolean): void {
    if (ok) {
      this.store.dispatch(new StartMaintenance({ resourceId: this.resourceId, maintenanceId: this.checkup.id }));
    }
    this.showBackDropStart = false;
    setTimeout(() => {
      this.showModalStart = false;
    }, 100);
  }

  openFinishMaintenance(checkup: Checkup, resourceId: string): void {
    this.resourceId = resourceId;
    this.checkup = checkup;
    this.showBackDrop = true;
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }
  onCloseModalFinish(data?: any): void {
    if (data) {
      data.maintenanceId = this.checkup.id;
      this.store.dispatch(new UpdateMaintenance({ resourceId: this.resourceId, data }));
    }
    this.showBackDrop = false;
    setTimeout(() => {
      this.showModal = false;
    }, 100);
  }
}