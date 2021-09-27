import { getClientById } from './../state/clients/clients.selector';
import { getUserErrors } from './../../state/users/users.selector';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';

import { getUsers } from 'src/app/state/users/users.selector';
/* Models */
import { Office, ApiError, User, Client } from '../../models';
/* State */
import { State } from '../state';
/* Selectors */
import { getLoader } from '../../state/loader/loader.selector';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
@Input() usuarios:any;

  title = "Crear usuario";
  userEdit:any;
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* New User */
  user: User;
  /* Form Group */
  UserGroup: FormGroup;
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

    
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.edit = true;
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client: Client | undefined) => {
              if (client) {
                let users:any = client.users;
                // this.client = client;
                users.forEach((element: any) => {
                  if(element.id == param.userId){
                    this.user = element;
                  }
                });
              }
            })
        );
      }
    });

    this.UserGroup = this.formBuilder.group({
      firstName: [''], //[this.user.firstName, [Validators.required]],
      lastName:[''], // [this.user.lastName],
      email: [''],// [this.user.email, [Validators.required]],
      documentNumber:[''], // [this.user.documentNumber, [Validators.required]],
      password: [''], // [this.user.password, [Validators.required]],
      mainTransportationMethod:  [''],//[this.user.mainTransportationMethod, [Validators.required]],
      secondaryTransportationMethod:[''],  //[this.user.secondaryTransportationMethod, [Validators.required]],
      termsDate: [''], //[this.user.termsDate, [Validators.required]],
      comodatoDate: [''], //[this.user.comodatoDate, [Validators.required]],
      cliente:[''],  //[this.user.client, [Validators.required]],
      sede:  [''] //[this.user.office, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onBack(): void {
    history.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  submitForm(): void {


    console.log(this.UserGroup.controls['documentNumber'].value);

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
