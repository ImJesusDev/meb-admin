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
import { getLoader } from '../../state/loader/loader.selector';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Page title */
  title = 'Clientes';
  /* Show / Hide clients form */
  showForm = true;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
  }
}
