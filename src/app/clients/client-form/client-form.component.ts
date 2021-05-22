import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* rxjs */
import { Observable, of } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
import { LoadUsers } from '../../state/users/user.actions';
/* Selectors */
import { getUsers } from '../../state/users/users.selector';
import { getLoader } from '../../state/loader/loader.selector';
import { getClientsError } from '../state/clients/clients.selector';
/* Actions */
import { AddClient } from '../state/clients/clients.actions';
import { StartLoader } from '../../state/loader/loader.actions';
/* Models */
import { Client, User, ApiError } from '../../models';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  /* New Client Object */
  client: Client;
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Form Group */
  clientForm: FormGroup;
  /* base64 logo */
  base64Logo = '';
  /* Show MEB admin modal */
  showMebAdminModal = false;
  /* Show Back Drop */
  showBackDrop = false;
  /* Store selected meb admin */
  mebAdmin: User = {} as User;
  constructor(private _formBuilder: FormBuilder, private store: Store<State>) {
    this.client = {
      id: '',
      name: '',
      nit: '',
      logo: '',
      slug: '',
    };
    this.clientForm = this._formBuilder.group({
      name: [this.client.name, [Validators.required]],
      nit: [this.client.nit, [Validators.required]],
      logo: [this.client.logo, [Validators.required]],
      mebAdmin: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
    // Dispatch action to load users
    this.store.dispatch(new LoadUsers());

    // Use selector to get users from state
    this.users$ = this.store.pipe(select(getUsers));
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getClientsError));
  }

  openModal(): void {
    this.showBackDrop = true;
    setTimeout(() => {
      this.showMebAdminModal = true;
    }, 100);
  }
  closeModal(): void {
    if (this.mebAdmin.id) {
      this.clientForm.patchValue({
        mebAdmin: `${this.mebAdmin.firstName} ${this.mebAdmin.lastName}`,
      });
    }
    this.showMebAdminModal = false;

    setTimeout(() => {
      this.showBackDrop = false;
    }, 100);
  }

  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to add new client
    this.store.dispatch(
      new AddClient({
        logo: this.base64Logo,
        name: this.clientForm.controls['name'].value,
        nit: this.clientForm.controls['nit'].value,
        slug: '',
        id: '',
        mebAdmin: this.clientForm.controls['mebAdmin'].value,
        // superAdminClient: this.clientForm.controls['mebAdmin'].value,
      })
    );
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
