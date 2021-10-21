import { getClientById } from './../state/clients/clients.selector';
import { State } from './../../state/users/user.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
/* Actions */
import { LoadTeam } from '../../state/users/user.actions';
import { downloadExcel } from 'src/app/utils/helpers/excel.helper';
/* Alerts */
import Swal from 'sweetalert2';
import { ActiveStateUser } from '../state/clients/clients.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title = 'Usuarios';
  showAddBtn = true;
  url: string[] = [];
  downloading: boolean | undefined;

  loader$: Observable<boolean> = of(false);

  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  office: string = "";
  users:any = [];
  documentNumber:string = "";
  masterSelected:boolean = false;
  UserCheckedList:any = [];

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    // Dispatch action to load clients
    this.store.dispatch(new LoadTeam());

    this.client = { } as Client;

    this.route.params.subscribe((param) => {
      let allUsers:any;
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client;
                allUsers = client.users;
                allUsers.forEach((user:any) => {
                  if(user.deletedAt == null){
                    this.users.push({
                      ...user,
                      selected: false       
                  });
                  }
                });
                
              }
            })
        );
      }
    });
  }

  ngOnInit(): void {
  }

  
  checkUncheckAll() {
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.users.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.UserCheckedList = [];
    for (var i = 0; i < this.users.length; i++) {
      if(this.users[i].isSelected)
      this.UserCheckedList.push({id: this.users[i].id});
    }
  }

  inactivarUsers(){
    if(this.UserCheckedList?.length > 0){
      this.store.dispatch(
        new ActiveStateUser(this.UserCheckedList)
      );
    }else{
      Swal.fire({
        title: '¡Error!',
        text: "Seleccione usuarios",
        showCancelButton: false,
        showDenyButton: false,
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#50b848',
        icon: 'error',
      });
    }    
  }

  filterResources(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client;
                this.users = client.users;
                let userFilter:any = [];
                this.users.forEach((element: any) => {
                  if(element.deletedAt == null && this.office?.length > 0 && this.documentNumber?.length > 0 && element.office == this.office && element.documentNumber == this.documentNumber){
                    userFilter.push(element); 
                  }else if(element.deletedAt == null && this.office?.length == 0 && this.documentNumber?.length > 0  && element.documentNumber == this.documentNumber){
                    userFilter.push(element); 
                  }else if(element.deletedAt == null && this.office?.length > 0 && this.documentNumber?.length == 0 && element.office == this.office){
                    userFilter.push(element); 
                  }else if(element.deletedAt == null && this.office?.length == 0 && this.documentNumber?.length == 0){
                    userFilter.push(element);  
                  }
                });
                this.users = userFilter;
              }
            })
        );
      }
    });
  }

  
  /* Download Excel */
  async onDownloadExcel(): Promise<void> {
    this.downloading = true;
    try {
      const columns = new Array();
      columns.push(['', '', '', '', '', '', 'Documentos', '', '', '', '']);
      const columnsLabels = ['Foto', 'Nombres', 'Apellidos', 'Documento', 'Email', 'Teléfono', 'Cliente', 'Sede', 'EPS', 'Nombre contacto','número contacto'];
      columns.push(columnsLabels);
      this.users.forEach((user:any) => {
        const rows = new Array();
        rows.push(user.photo);
        rows.push(user.firstName);
        rows.push(user.lastName);
        rows.push(user.documentNumber);
        rows.push(user.email);
        rows.push(user.phone);
        rows.push(user.client);
        rows.push(user.office);
        if(typeof user.eps != 'undefined'){
          rows.push(user.eps.name);
        }else{
          rows.push("");
        }        
        rows.push(user.emergencyContactName);
        rows.push(user.emergencyContactPhone);
        columns.push(rows);
      });
     downloadExcel({ data: columns, filename: 'Usuarios Activos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }
}
