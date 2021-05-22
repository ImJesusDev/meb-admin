import { Component, OnInit } from '@angular/core';

/* rxjs */
import { Observable, of, forkJoin } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Client, User } from '../../models';
/* State */
import { State } from '../state';
/* Actions */
import { LoadClients, AddClient } from '../state/clients/clients.actions';
import { LoadUsers } from '../../state/users/user.actions';
import { StartLoader } from '../../state/loader/loader.actions';
/* Selectors */
import { getClients } from '../state/clients/clients.selector';
import { getUsers } from '../../state/users/users.selector';
import { getLoader } from '../../state/loader/loader.selector';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Page title */
  title = 'Clientes';
  /* Show / Hide clients form */
  showForm = false;

  constructor(private store: Store<State>) {}

  /* Handle event emitter to create a client */
  onCreateClient(client: Client): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to add new client
    this.store.dispatch(new AddClient(client));
  }

  ngOnInit(): void {
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
    // Dispatch action to load users
    this.store.dispatch(new LoadUsers());
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
    // Use selector to get users from state
    this.users$ = this.store.pipe(select(getUsers));
  }
}
