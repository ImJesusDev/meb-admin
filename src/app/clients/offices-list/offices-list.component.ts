import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Client, Email } from 'src/app/models';
/* State */
import { State } from '../state';
import { getClientById } from '../state/clients/clients.selector';
import { AddEmails, DeleteOffice, LoadClients } from '../state/clients';
/* Alerts */
import Swal from 'sweetalert2';
@Component({
  selector: 'app-offices-list',
  templateUrl: './offices-list.component.html',
  styleUrls: ['./offices-list.component.css'],
})
export class OfficesListComponent implements OnInit, OnDestroy {
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* OfficeName */
  officeName = '';
  /* New Emails to add */
  newEmails: Email[] = [];
  emailsToShow: Email[] = [];
  showEmailModalBackdrop = false;
  showEmailModal = false;
  showEmailListBackDrop = false;
  showEmailListModal = false;
  /* Domain file name */
  fileName = '';
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.client = {
      id: '',
      name: '',
      nit: '',
      logo: '',
      slug: '',
    };
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client: Client | undefined) => {
              if (client) {
                this.client = client;
              }
            })
        );
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadClients());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  confirmDelete(id: string): void {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar la sede?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Eliminar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#50b848',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.store.dispatch(
          new DeleteOffice({ clientId: this.client.id, officeId: id })
        );
      }
    });
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
    this.newEmails = [];
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
          this.newEmails.push({
            client: this.client.name!,
            office: this.officeName,
            email: arr.join(''),
            active: true,
            id: '',
          });
        }
      }
    }
  }

  /* Open modal to create client admin */
  openEmailListModal(emails: Email[] | undefined): void {
    if (emails?.length) {
      this.emailsToShow = emails;
      this.showEmailListBackDrop = true;
      setTimeout(() => {
        this.showEmailListModal = true;
      }, 100);
    }
  }

  /* Open modal to create client admin */
  openEmailModal(name: string): void {
    this.officeName = name;
    this.newEmails = [];
    this.showEmailModalBackdrop = true;
    setTimeout(() => {
      this.showEmailModal = true;
    }, 100);
  }

  closeEmailListModal(): void {
    this.emailsToShow = [];
    this.showEmailListBackDrop = false;
    setTimeout(() => {
      this.showEmailListModal = false;
    }, 100);
  }

  /* Close modal to select meb admin */
  closeEmailModal(save?: boolean): void {
    this.fileName = '';
    this.showEmailModal = false;

    setTimeout(() => {
      this.showEmailModalBackdrop = false;
    }, 100);
    if (save) {
      Swal.fire({
        title: `¿Estás seguro que deseas agregar ${this.newEmails.length} correos?`,
        showCancelButton: false,
        showDenyButton: true,
        confirmButtonText: `Agregar`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#50b848',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.store.dispatch(
            new AddEmails({
              emails: this.newEmails,
            })
          );
        }
      });
    }
  }
}
