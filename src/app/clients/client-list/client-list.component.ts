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
import {
  LoadClients,
  DeleteClient,
  AddDomains,
} from '../state/clients/clients.actions';
/* Alerts */
import Swal from 'sweetalert2';
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
  /* Show domain modal */
  showDomainModal = false;
  /* Show domain Back Drop */
  showDomainModalBackdrop = false;
  /* New domain to add */
  newDomain = '';
  /* Client id to add domain */
  clientId = '';

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

  /* Close modal to select meb admin */
  closeDomainModal(save?: boolean): void {
    this.showDomainModal = false;

    setTimeout(() => {
      this.showDomainModalBackdrop = false;
    }, 100);
    if (save) {
      this.store.dispatch(
        new AddDomains({
          domains: [
            {
              client: this.clientId,
              domain: this.newDomain,
              active: true,
              id: '',
            },
          ],
        })
      );
      console.log('add domain', this.clientId, this.newDomain);
    }
  }

  /* Open modal to create client admin */
  openDomainModal(clientId: string): void {
    this.clientId = clientId;
    this.newDomain = '';
    this.showDomainModalBackdrop = true;
    setTimeout(() => {
      this.showDomainModal = true;
    }, 100);
  }

  confirmDelete(id: string): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar el cliente?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#50b848',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(new DeleteClient(id));
      }
    });
  }
}
