import { Component, OnInit } from '@angular/core';

/* rxjs */
import { Observable, of } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Client } from '../../models';
/* State */
import { State } from '../state';
/* Actions */
import { LoadClients } from '../state/clients/clients.actions';
import { StartLoader } from '../../state/loader/loader.actions';
/* Selectors */
import { getClients } from '../state/clients/clients.selector';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Page title */
  title = 'Clientes';

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
  }
}
