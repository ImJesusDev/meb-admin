import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
import {
  LoadUsers,
  AddAdminStart,
  AddAdminCancel,
} from '../../state/users/user.actions';
/* Selectors */
import {
  getUsers,
  getUserLoader,
  getUserErrors,
  getUserByEmail,
  getUserAdminModal,
} from '../../state/users/users.selector';
import { getLoader } from '../../state/loader/loader.selector';
import {
  getClientsError,
  getClientById,
} from '../state/clients/clients.selector';
/* Actions */
import { AddClient, UpdateClient } from '../state/clients/clients.actions';
import { StartLoader } from '../../state/loader/loader.actions';
/* Models */
import { Client, User, ApiError } from '../../models';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit, OnDestroy {
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* New Client Object */
  client: Client;
  /* New Client Admin */
  clientAdmin: User;
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Observable of clients from store */
  client$: Observable<Client> = of({} as Client);
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Observable of errors from store */
  userErrors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Observable of admin modal from store */
  userAdminModal$: Observable<boolean> = of(false);
  /* Observable of user loader from store */
  userLoader$: Observable<boolean> = of(false);
  /* Form Group */
  clientForm: FormGroup;
  /* Form Group */
  clientAdminForm: FormGroup;
  /* base64 logo */
  base64Logo = '';
  /* Show MEB admin modal */
  showMebAdminModal = false;
  /* Show MEB admin Back Drop */
  showMebAdminBackDrop = false;
  /* Show MEB admin modal */
  showClientAdminModal = false;
  /* Show MEB admin Back Drop */
  showClientAdminBackDrop = false;
  /* Store selected meb admin */
  mebAdmin: User = {} as User;
  edit = false;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.client = {
      id: '',
      name: '',
      nit: '',
      logo: '',
      slug: '',
    };
    this.clientAdmin = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      documentNumber: '',
      documentType: '',
      phone: '',
      role: 'client-admin',
    };
    this.route.params.subscribe((param) => {
      if (param.id) {
        console.log(param);
        this.edit = true;
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client: Client | undefined) => {
              if (client) {
                this.client.name = client.name;
                this.client.nit = client.nit;
                this.client.id = client.id;
                this.client.mebAdmin = `${client.meb_admin?.firstName} ${client.meb_admin?.lastName}`;
                this.client.superAdminClient = `${client.super_admin_client?.firstName} ${client.super_admin_client?.lastName}`;
                if (client.meb_admin) {
                  this.mebAdmin = client.meb_admin;
                }
                if (client.super_admin_client) {
                  this.clientAdmin.id = client.super_admin_client.id;
                }
              }
            })
        );
      }
    });
    this.clientForm = this._formBuilder.group({
      name: [this.client.name, [Validators.required]],
      nit: [this.client.nit, [Validators.required]],
      logo: [this.client.logo, [Validators.required]],
      mebAdmin: [
        this.client.mebAdmin ? this.client.mebAdmin : '',
        [Validators.required],
      ],
      clientAdmin: [
        this.client.superAdminClient ? this.client.superAdminClient : '',
        [Validators.required],
      ],
    });
    this.clientAdminForm = this._formBuilder.group({
      firstName: [this.clientAdmin.firstName, [Validators.required]],
      documentType: [this.clientAdmin.documentType, [Validators.required]],
      documentNumber: [this.clientAdmin.documentNumber, [Validators.required]],
      phone: [this.clientAdmin.phone, [Validators.required]],
      lastName: [this.clientAdmin.lastName, [Validators.required]],
      role: [this.clientAdmin.role, [Validators.required]],
      password: [
        this.clientAdmin.password,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      email: [this.clientAdmin.email, [Validators.required, Validators.email]],
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
    // Use selector to get user loader state
    this.userLoader$ = this.store.pipe(select(getUserLoader));
    // Dispatch action to load users
    this.store.dispatch(new LoadUsers());

    // Use selector to get users from state
    this.users$ = this.store.pipe(select(getUsers));
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getClientsError));
    // Use selector to get user errors from state
    this.userErrors$ = this.store.pipe(select(getUserErrors));
    // Use selector to get user errors from state
    this.userAdminModal$ = this.store.pipe(select(getUserAdminModal));
  }

  /* Open modal to select meb admin */
  openMebAdminModal(): void {
    this.showMebAdminBackDrop = true;
    setTimeout(() => {
      this.showMebAdminModal = true;
    }, 100);
  }
  /* Open modal to create client admin */
  openClientAdminModal(): void {
    this.showClientAdminBackDrop = true;
    setTimeout(() => {
      this.showClientAdminModal = true;
    }, 100);
  }
  /* Close modal to select meb admin */
  closeMebAdminModal(): void {
    if (this.mebAdmin.id) {
      this.clientForm.patchValue({
        mebAdmin: `${this.mebAdmin.firstName} ${this.mebAdmin.lastName}`,
      });
    }
    this.showMebAdminModal = false;

    setTimeout(() => {
      this.showMebAdminBackDrop = false;
    }, 100);
  }
  /* Close modal to create client admin */
  closeClientAdminModal(cancel?: boolean): void {
    if (!cancel) {
      if (this.clientAdmin.id) {
        this.clientForm.patchValue({
          clientAdmin: `${this.clientAdmin.firstName} ${this.clientAdmin.lastName}`,
        });
      }
    } else {
      this.clientAdminForm.patchValue({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        documentNumber: '',
        documentType: '',
        phone: '',
        role: 'client-admin',
      });
      this.store.dispatch(new AddAdminCancel());
    }
    this.showClientAdminModal = false;

    setTimeout(() => {
      this.showClientAdminBackDrop = false;
    }, 100);
  }

  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    if (!this.edit) {
      // Dispatch action to add new client
      this.store.dispatch(
        new AddClient({
          logo: this.base64Logo,
          name: this.clientForm.controls['name'].value,
          nit: this.clientForm.controls['nit'].value,
          slug: '',
          id: '',
          mebAdmin: this.mebAdmin.id,
          superAdminClient: this.clientAdmin.id,
        })
      );
    } else {
      this.store.dispatch(
        new UpdateClient({
          logo: this.base64Logo,
          name: this.clientForm.controls['name'].value,
          nit: this.clientForm.controls['nit'].value,
          slug: '',
          id: this.client.id,
          mebAdmin: this.mebAdmin.id,
          superAdminClient: this.clientAdmin.id,
        })
      );
    }
  }
  /* Handle file change */
  fileChanged(event: any): void {
    // Instance of reader
    const reader = new FileReader();
    // Check if any file is selected
    if (event.target && event.target.files.length) {
      // Get file name
      const filename = event.target.files[0].name;
      // Initialize the base64 string with data type
      this.base64Logo = `data:${event.target.files[0].type};base64,`;
      // Bind function to execute on file load
      reader.onload = this._handleReaderLoaded.bind(this);
      // Read selected file
      reader.readAsBinaryString(event.target.files[0]);
      // Set as value of the form the name of the file
      this.clientForm.patchValue({
        logo: filename,
      });
    }
  }

  /**
   * Function to convert image file to
   * base 64 string
   */
  _handleReaderLoaded(readerEvt: any) {
    // Get binary string from FileReader
    var binaryString = readerEvt.target.result;
    // Convert binary to base64
    const base64String = btoa(binaryString);
    // Set the final base64 string
    this.base64Logo = `${this.base64Logo}${base64String}`;
  }
}
