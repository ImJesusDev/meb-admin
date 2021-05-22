import { Component, OnInit } from '@angular/core';
/* rxjs */
import { Observable, of } from 'rxjs';
/* Models */
import { Client } from '../../models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
/* Selectors */
import { getClients } from '../state/clients/clients.selector';
import { StartLoader } from '../../state/loader/loader.actions';
import { getLoader } from '../../state/loader/loader.selector';
/* Actions */
import { LoadClients, AddClient } from '../state/clients/clients.actions';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  constructor(private store: Store<State>) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
  }

  ngOnInit(): void {
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }
}
