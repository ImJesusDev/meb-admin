import { StopLoader } from './../../state/loader/loader.actions';
import { Navigation } from './../../utils/helpers/navigation.helper';
import { UpdateCheckup } from './../../inventory/state/inventory/inventory.actions';
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

  from: string;
  to: string;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private navigation: Navigation,
    private repairService: RepairService
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
    this.loader$ = this.store.pipe(select(getLoader));
    this.getHistory();
  }

  getHistory(): void {
    this.store.dispatch(new StartLoader());
    this.resources$ = this.repairService.getHistoryRepairs({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: this.perPage,
      status: 'approved'
    });
    this.resources$.subscribe(data => {
      this.resourceLength = data.repairs.length;
      this.store.dispatch(new StopLoader());
    });
  }

  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.page = page;
      this.getHistory();
    }
  }
  filterResources(): void {
    this.page = 1;
    this.store.dispatch(new StartLoader());
    this.getHistory();
    this.navigation.setQueryParams({
      from: this.from,
      to: this.to,
    });
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
