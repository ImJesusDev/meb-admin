import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* rxjs */
import { Observable, of } from 'rxjs';
/* Models */
import { Resource } from '../../models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
import { StartLoader } from '@state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
/* Selectors */
import { getResources } from '../state/inventory/inventory.selector';
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

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);


  constructor(private store: Store<State>, private router: Router) {

    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadResources());
    this.resourceId = '';

  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

}
