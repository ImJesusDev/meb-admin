import { getClientById } from './../state/clients/clients.selector';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Office, ApiError, User, Client } from '../../models';
/* State */
import { State } from '../state';
/* Selectors */
import { getLoader } from '../../state/loader/loader.selector';
import { AddUser, UpdateUser } from '../state/clients/clients.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {
@Input() usuarios:any;

  title = "";
  userEdit:any;
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  /* Observable of office from store */
  office$: Observable<Office[]> = of([] as Office[]);
  /* New User */
  user: User;
  office: any;
  clients:any;
  actualizar:boolean = false;

  /* Form Group */
  UserGroup: FormGroup;
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
      if(param.userId){
        this.title = "Actualizar usuario";
      }else{
        this.title = "Crear usuario";
      }
      if (param.id) {
        this.edit = true;
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client: Client | undefined) => {
              if (client) {
                this.clients = client;
                let users:any = client.users;
                this.office = client.offices;
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
      firstName: [this.user.firstName],
      lastName:[this.user.lastName],
      email: [this.user.email],
      documentNumber:[this.user.documentNumber],
      password: [this.user.password],
      termsDate: [this.user.termsDate],
      comodatoDate: [this.user.comodatoDate],
      cliente:[ typeof this.clients != 'undefined'? this.clients.name : this.user.client],
      sede: [this.user.office],
      transPrin: [this.user.mainTransportationMethod],
      transSec: [this.user.secondaryTransportationMethod],
      telCelular: [this.user.phone],
      conEmergencia: [this.user.emergencyContactName],
      telConEmergencia: [this.user.emergencyContactPhone],
      grupoSanguineo: [this.user.bloodType],
      eps: [typeof this.user.eps != 'undefined' ? this.user.eps.name : ''],
      sexo: [typeof this.user.gender != 'undefined' ? this.user.gender : '']
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
    this.actualizar = true;
    this.route.params.subscribe((param) => {
      if (param.userId) {
        let updateUser:User = {
          id: param.userId,
          firstName: this.UserGroup.controls['firstName'].value,
          lastName: this.UserGroup.controls['lastName'].value,
          email: this.UserGroup.controls['email'].value,
          password: this.UserGroup.controls['password'].value,
          documentNumber: this.UserGroup.controls['documentNumber'].value,
          phone: this.UserGroup.controls['telCelular'].value,
          client: this.UserGroup.controls['cliente'].value,
          office: this.UserGroup.controls['sede'].value,
          mainTransportationMethod: this.UserGroup.controls['transPrin'].value,
          secondaryTransportationMethod: this.UserGroup.controls['transSec'].value,
          termsDate: true,
          comodatoDate: true
        };
        this.store.dispatch(
          new UpdateUser(updateUser)
        );
      }else{
        let updateUser:User = {
          id: '',
          firstName: this.UserGroup.controls['firstName'].value,
          lastName: this.UserGroup.controls['lastName'].value,
          email: this.UserGroup.controls['email'].value,
          password: this.UserGroup.controls['password'].value,
          documentNumber: this.UserGroup.controls['documentNumber'].value,
          phone: this.UserGroup.controls['telCelular'].value,
          client: this.UserGroup.controls['cliente'].value,
          office: this.UserGroup.controls['sede'].value,
          mainTransportationMethod: this.UserGroup.controls['transPrin'].value,
          secondaryTransportationMethod: this.UserGroup.controls['transSec'].value,
          termsDate: true,
          comodatoDate: true
        };
        this.store.dispatch(
          new AddUser(updateUser)
        );
      }
      
    });
  }

}
