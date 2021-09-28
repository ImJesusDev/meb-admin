import { getClientById } from './../../state/clients/clients.selector';
import { getUserErrors } from './../../../state/users/users.selector';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Selectors */
import { getClientsError, getClients } from '../../state/clients/clients.selector';
import { getUsers } from 'src/app/state/users/users.selector';
/* Models */
import { Office, ApiError, Country, User, Client } from '../../../models';
/* State */
import { State } from '../../state';
/* Selectors */
import { getLoader } from '../../../state/loader/loader.selector';
import { getCountries } from '../../../state/locations/locations.selector';
/* Actions */
import { LoadCountries } from '../../../state/locations/locations.actions';
import { LoadUsers } from 'src/app/state/users';
import { StartLoader } from '../../../state/loader/loader.actions';
import { AddOffice, AddOfficeSuccess } from '../../state/clients';

@Component({
  selector: 'app-user-form-new',
  templateUrl: './user-form-new.component.html',
  styleUrls: ['./user-form-new.component.css']
})
export class UserFormNewComponent implements OnInit, OnDestroy {
@Input() usuarios:any;

  title = "Nuevo usuario";
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* New User */
  user: User;
  /* Form Group */
  formGroup: FormGroup;
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);
  edit = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = { } as User;
    this.client = { } as Client;

    this.formGroup = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName],
      email: [this.user.email, [Validators.required]],
      password: [this.user.password, [Validators.required]],
      mainTransportationMethod: [this.user.mainTransportationMethod, [Validators.required]],
      secondaryTransportationMethod: [this.user.secondaryTransportationMethod, [Validators.required]],
      termsDate: [this.user.termsDate, [Validators.required]],
      comodatoDate: [this.user.comodatoDate, [Validators.required]],
      client: [this.user.client, [Validators.required]],
      office: [this.user.office, [Validators.required]],
    });
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.edit = true;
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
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getUserErrors));
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }
  onBack(): void {
    history.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submitForm(): void { 
     // this.store.dispatch(
    //   new AddUser({
    //     firstName: string;
    //     lastName: string;
    //     email: string;
    //     password: string;
    //     documentType?: string;
    //     documentNumber?: string;
    //     phone?: string;
    //     photo?: string;
    //     role: string;
    //     client?: string;
    //     office?: string;
    //     mainTransportationMethod?: string;
    //     secondaryTransportationMethod?: string;
    //     termsDate?: boolean;
    //     comodatoDate?: boolean;
    //   })
    // );
  }

}
