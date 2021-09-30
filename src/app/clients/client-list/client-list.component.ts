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
import { Domain } from '../../models';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  title = 'Clientes';
  showAddBtn = true;
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Show domain modal */
  showDomainModal = false;
  /* Show domain Back Drop */
  showDomainModalBackdrop = false;
  /* New domain to add */
  newDomains: Domain[] = [];
  /* Client id to add domain */
  clientId = '';
  /* Domain file name */
  fileName = '';

  domainsToShow: Domain[] = [];
  showDomainListModal = false;
  showDomainListBackDrop = false;

  constructor(private store: Store<State>) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients());
  }

  ngOnInit(): void {
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients));
    this.clients$.subscribe((element:any) => {
      console.log(element);
    });
    
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

  /* Close modal to select meb admin */
  closeDomainModal(save?: boolean): void {
    this.fileName = '';
    this.showDomainModal = false;

    setTimeout(() => {
      this.showDomainModalBackdrop = false;
    }, 100);
    if (save) {
      Swal.fire({
        title: `¿Estás seguro que deseas agregar ${this.newDomains.length} dominios?`,
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: `Agregar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#50b848',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.store.dispatch(
            new AddDomains({
              domains: this.newDomains,
            })
          );
        }
      });
    }
  }

  closeDomainListModal(): void {
    this.domainsToShow = [];
    this.showDomainListBackDrop = false;
    setTimeout(() => {
      this.showDomainListModal = false;
    }, 100);
  }
  /* Open modal to create domains */
  openDomainModal(clientId: string): void {
    this.clientId = clientId;
    this.newDomains = [];
    this.showDomainModalBackdrop = true;
    setTimeout(() => {
      this.showDomainModal = true;
    }, 100);
  }
  /* Open modal to show domains */
  openDomainListModal(domains: Domain[] | undefined): void {
    if (domains?.length) {
      this.domainsToShow = domains;
      this.showDomainListBackDrop = true;
      setTimeout(() => {
        this.showDomainListModal = true;
      }, 100);
    }
  }

  /* Handle file change */
  fileChanged(event: any): void {
    // Instance of reader
    const reader = new FileReader();
    // Check if any file is selected
    if (event.target && event.target.files.length) {
      // Get file name
      this.fileName = event.target.files[0].name;
      // Bind function to execute on file load
      reader.onload = this._handleReaderLoaded.bind(this);
      // Read selected file
      reader.readAsText(event.target.files[0]);
    }
  }

  /**
   * Function to convert image file to
   * base 64 string
   */
  _handleReaderLoaded(readerEvt: any) {
    this.newDomains = [];
    // Csv as string
    let csv: string = readerEvt.target.result;
    // Get all lines
    let allTextLines = csv.split(/\r|\n|\r/);
    // Get headers
    let headers = allTextLines[0].split(',');

    for (let i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length === headers.length) {
        let arr = [];
        for (let j = 0; j < headers.length; j++) {
          arr.push(data[j]);
        }
        if (arr.join('').length) {
          this.newDomains.push({
            client: this.clientId,
            domain: arr.join(''),
            active: true,
            id: '',
          });
        }
      }
    }
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
