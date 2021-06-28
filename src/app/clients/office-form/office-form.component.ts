import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Selectors */
import { getClientsError, getClients } from '../state/clients/clients.selector';
import { getUsers } from 'src/app/state/users/users.selector';
/* Models */
import { Office, ApiError, Country, User, Client } from '../../models';
/* State */
import { State } from '../state';
/* Selectors */
import { getLoader } from '../../state/loader/loader.selector';
import { getCountries } from '../../state/locations/locations.selector';
/* Actions */
import { LoadCountries } from '../../state/locations/locations.actions';
import { LoadUsers } from 'src/app/state/users';
import { StartLoader } from '../../state/loader/loader.actions';
import { AddOffice, AddOfficeSuccess } from '../state/clients';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.css'],
})
export class OfficeFormComponent implements OnInit, OnDestroy {
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[]);
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* Observable of countries from store */
  countries$: Observable<Country[]> = of([] as Country[]);
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  /* Client id */
  clientId: string = '';
  /* New Office object */
  office: Office;
  /* Office Form Group */
  officeForm: FormGroup;
  /* Selected country */
  country: Country | undefined;
  /* Current client */
  client: Client | undefined = {} as Client;
  /* Observable of users from store */
  users$: Observable<User[]> = of([] as User[]);
  /* Show MEB admin Back Drop */
  showMebAdminBackDrop = false;
  /* Show MEB admin modal */
  showMebAdminModal = false;
  /* Show Repair admin Back Drop */
  showRepairAdminBackDrop = false;
  /* Show Repair admin modal */
  showRepairAdminModal = false;
  /* Store selected meb admin */
  mebAdmin: User = {} as User;
  /* Show Client admin Back Drop */
  showClientAdminBackDrop = false;
  /* Show Client admin modal */
  showClientAdminModal = false;
  /* Show Inventory admin Back Drop */
  showInventoryAdminBackDrop = false;
  /* Show Inventory admin modal */
  showInventoryAdminModal = false;
  /* Show Maintenance admin Back Drop */
  showMaintenanceAdminBackDrop = false;
  /* Show Maintenance admin modal */
  showMaintenanceAdminModal = false;
  /* Store selected client admin */
  clientAdmin: User = {} as User;
  /* Store selected repair admin */
  repairAdmin: User = {} as User;
  /* Store selected inventory admin */
  inventoryAdmin: User = {} as User;
  /* Store selected maintenance admin */
  maintenanceAdmin: User = {} as User;
  /* Edit / Create mode */
  edit = false;

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.country = {
      id: '',
      cities: [],
      name: '',
      slug: '',
    };
    // Dispatch action to load clients
    this.store.dispatch(new LoadCountries());

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.clientId = param.id;
      }
    });
    this.office = {
      id: '',
      name: '',
      country: '',
      city: '',
      location: {
        lat: null,
        lng: null,
      },
      client: this.clientId,
    };
    this.officeForm = this._formBuilder.group({
      name: [this.office.name, [Validators.required]],
      country: [this.office.country, [Validators.required]],
      city: [this.office.city, [Validators.required]],
      lat: [this.office.location.lat, [Validators.required]],
      lng: [this.office.location.lng, [Validators.required]],
      mebAdmin: [
        this.office.mebAdmin ? this.office.mebAdmin : '',
        [Validators.required],
      ],
      clientAdmin: [
        this.office.clientAdmin ? this.office.clientAdmin : '',
        [Validators.required],
      ],
      repairAdmin: [
        this.office.repairAdmin ? this.office.repairAdmin : '',
        [Validators.required],
      ],
      inventoryAdmin: [
        this.office.inventoryAdmin ? this.office.inventoryAdmin : '',
        [Validators.required],
      ],
      maintenanceAdmin: [
        this.office.maintenanceAdmin ? this.office.maintenanceAdmin : '',
        [Validators.required],
      ],
    });
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.clients$.subscribe((clients) => {
        this.client = clients.find((c: Client) => c.id === this.clientId);
      })
    );
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getClientsError));
    // Use selector to get clients from state
    this.countries$ = this.store.pipe(select(getCountries));
    // Dispatch action to load users
    this.store.dispatch(new LoadUsers());
    // Use selector to get users from state
    this.users$ = this.store.pipe(select(getUsers));
    this.clients$ = this.store.pipe(select(getClients));
  }

  /* Open modal to select meb admin */
  openMebAdminModal(): void {
    this.showMebAdminBackDrop = true;
    setTimeout(() => {
      this.showMebAdminModal = true;
    }, 100);
  }
  /* Open modal to select repair admin */
  openRepairAdminModal(): void {
    this.showRepairAdminBackDrop = true;
    setTimeout(() => {
      this.showRepairAdminModal = true;
    }, 100);
  }
  /* Open modal to select inventory admin */
  openInventoryAdminModal(): void {
    this.showInventoryAdminBackDrop = true;
    setTimeout(() => {
      this.showInventoryAdminModal = true;
    }, 100);
  }
  /* Open modal to select maintenance admin */
  openMaintenanceAdminModal(): void {
    this.showMaintenanceAdminBackDrop = true;
    setTimeout(() => {
      this.showMaintenanceAdminModal = true;
    }, 100);
  }
  /* Open modal to select client admin */
  openClientAdminModal(): void {
    this.showClientAdminBackDrop = true;
    setTimeout(() => {
      this.showClientAdminModal = true;
    }, 100);
  }

  /* Function to handle country selection */
  countryChanged(): void {
    const country = this.officeForm.get('country')?.value;
    if (country) {
      this.subscriptions.add(
        this.countries$.subscribe((countries) => {
          this.country = countries.find((c: Country) => c.name === country);
        })
      );
    }
  }

  /* Close modal to select meb admin */
  closeMebAdminModal(confirm?: boolean): void {
    if (this.mebAdmin.id && confirm) {
      this.officeForm.patchValue({
        mebAdmin: `${this.mebAdmin.firstName} ${this.mebAdmin.lastName}`,
      });
    }
    this.showMebAdminModal = false;

    setTimeout(() => {
      this.showMebAdminBackDrop = false;
    }, 100);
  }
  /* Close modal to select client admin */
  closeClientAdminModal(confirm?: boolean): void {
    if (this.clientAdmin.id && confirm) {
      this.officeForm.patchValue({
        clientAdmin: `${this.clientAdmin.firstName} ${this.clientAdmin.lastName}`,
      });
    }
    this.showClientAdminModal = false;

    setTimeout(() => {
      this.showClientAdminBackDrop = false;
    }, 100);
  }

  /* Close modal to select repair admin */
  closeRepairAdminModal(confirm?: boolean): void {
    if (this.repairAdmin.id && confirm) {
      this.officeForm.patchValue({
        repairAdmin: `${this.repairAdmin.firstName} ${this.repairAdmin.lastName}`,
      });
    }
    this.showRepairAdminModal = false;

    setTimeout(() => {
      this.showRepairAdminBackDrop = false;
    }, 100);
  }
  /* Close modal to select inventory admin */
  closeInventoryAdminModal(confirm?: boolean): void {
    if (this.inventoryAdmin.id && confirm) {
      this.officeForm.patchValue({
        inventoryAdmin: `${this.inventoryAdmin.firstName} ${this.inventoryAdmin.lastName}`,
      });
    }
    this.showInventoryAdminModal = false;

    setTimeout(() => {
      this.showInventoryAdminBackDrop = false;
    }, 100);
  }
  /* Close modal to select maintenance admin */
  closeMaintenanceAdminModal(confirm?: boolean): void {
    if (this.maintenanceAdmin.id && confirm) {
      this.officeForm.patchValue({
        maintenanceAdmin: `${this.maintenanceAdmin.firstName} ${this.maintenanceAdmin.lastName}`,
      });
    }
    this.showMaintenanceAdminModal = false;

    setTimeout(() => {
      this.showMaintenanceAdminBackDrop = false;
    }, 100);
  }

  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    if (!this.edit) {
      // Dispatch action to add new client
      this.store.dispatch(
        new AddOffice({
          id: this.clientId,
          office: {
            id: '',
            name: this.officeForm.controls['name'].value,
            city: this.officeForm.controls['city'].value,
            country: this.officeForm.controls['country'].value,
            mebAdmin: this.mebAdmin.id,
            clientAdmin: this.clientAdmin.id,
            inventoryAdmin: this.inventoryAdmin.id,
            repairAdmin: this.repairAdmin.id,
            maintenanceAdmin: this.maintenanceAdmin.id,
            location: {
              lat: this.officeForm.controls['lat'].value,
              lng: this.officeForm.controls['lng'].value,
            },
            client: this.client?.name!,
          },
        })
      );
    } else {
      // Update logic
    }
  }
}
