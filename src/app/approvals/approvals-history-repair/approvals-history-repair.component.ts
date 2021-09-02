import { UpdateCheckup } from './../../inventory/state/inventory/inventory.actions';
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
import { RepairService } from '@services/repair.service';


@Component({
  selector: 'app-approvals-history-repair',
  templateUrl: './approvals-history-repair.component.html',
  styleUrls: ['./approvals-history-repair.component.css']
})
export class ApprovalsHistoryRepairComponent implements OnInit {

  /* Observable of clients from store */
  resources$: Observable<{ page: number, perPage: number, totalResults: number, repairs: Checkup[] }> = of({ } as {
    page: number, perPage: number, totalResults: number, repairs: Checkup[]
  });
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

  showBackDropL = false;
  showModalL = false;

  checkup: Checkup;

  constructor(private store: Store<State>, private router: Router, private repairService: RepairService) {

    this.page = 1;
    this.perPage = 10;
    this.resourceId = '';
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage, status: this.resourceStatus.Repair }));
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
    // this.resources$ = this.store.pipe(select(getResources));
    this.resources$ = this.repairService.getHistoryRepairs({ page: this.page, perPage: 10, status: 'approved' });
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    this.resources$.subscribe(data => this.resourceLength = data.repairs.length);
  }

  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.store.dispatch(new StartLoader());
      this.page = page;
      this.store.dispatch(new LoadResources({ page: this.page, perPage: this.perPage, status: this.resourceStatus.Repair }));
      this.resources$ = this.repairService.getHistoryRepairs({ page: this.page, perPage: 10, status: 'approved' });
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
