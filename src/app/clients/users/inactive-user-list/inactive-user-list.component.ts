import { getClientById } from './../../state/clients/clients.selector'
import { State } from './../../../state/users/user.reducer'
import { Store, select } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription } from 'rxjs'
import { Client } from './../../../models/client'
import { Component, OnInit } from '@angular/core'
import { LoadTeam } from '../../../state/users/user.actions'
import { downloadExcel } from 'src/app/utils/helpers/excel.helper'
/* Alerts */
import Swal from 'sweetalert2'
import { ActiveStateUser } from '../../state/clients/clients.actions'
import { Checkup } from '@models/chekoups'
import { ResourceType } from '@models/resource-type'
import { StartLoader } from '@state/loader/loader.actions'

@Component({
  selector: 'app-inactive-user-list',
  templateUrl: './inactive-user-list.component.html',
  styleUrls: ['./inactive-user-list.component.css'],
})
export class InactiveUserListComponent implements OnInit {
  title = 'Usuarios Inactivos'
   /* Observable of clients from store */
   resources$: Observable<{ page: number, perPage: number, totalResults: number, repairs: Checkup[] }> = of({ } as {
    page: number, perPage: number, totalResults: number, repairs: Checkup[]
  });
  resourceId: string | undefined;
  resourceLength: number | undefined;

  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[]);

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  page: number = 0;
  perPage: number = 0;

  showAddBtn = true
  url: string[] = []
  downloading: boolean | undefined
  SedeFilter: any
  cedula: any
  /* Current client Object */
  client: Client
  /* Keep track of subscriptions */
  private subscriptions = new Subscription()

  office: string = ''
  users: any = []

  documentNumber: string = ''
  masterSelected: boolean = false
  UserCheckedList: any

  constructor(private store: Store<State>, private route: ActivatedRoute) {
    // Dispatch action to load clients
    this.store.dispatch(new LoadTeam())

    this.client = {} as Client

    this.route.params.subscribe((param) => {
      let allUsers: any
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client
                allUsers = client.users
                allUsers.forEach((user: any) => {
                  if (user.deletedAt != null) {
                    this.users.push({
                      ...user,
                      selected: false,
                    })
                  }
                })
              }
            }),
        )
      }
    })
  }

  ngOnInit(): void {}
  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return;
    }
    if (page > 0) {
      this.store.dispatch(new StartLoader());
      this.page = page;
      this.getHistory();
    }
  }
  getHistory() {
    throw new Error('Method not implemented.')
  }

  filterResources(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client
                this.users = client.users
                let userFilter: any = []
                this.users.forEach((element: any) => {
                  if (
                    element.deletedAt != null && 
                    this.office?.length > 0 &&
                    this.documentNumber?.length > 0 &&
                    element.office == this.office &&
                    element.documentNumber == this.documentNumber
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt != null && 
                    this.office?.length == 0 &&
                    this.documentNumber?.length > 0 &&
                    element.documentNumber == this.documentNumber
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt != null && 
                    this.office?.length > 0 &&
                    this.documentNumber?.length == 0 &&
                    element.office == this.office
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt != null && 
                    this.office?.length == 0 &&
                    this.documentNumber?.length == 0
                  ) {
                    userFilter.push(element)
                  }
                })
                this.users = userFilter
              }
            }),
        )
      }
    })
  }

  checkUncheckAll() {
    for (var i = 0; i < this.users.length; i++) {
      this.users[i].isSelected = this.masterSelected
    }
    this.getCheckedItemList()
  }

  isAllSelected() {
    this.masterSelected = this.users.every(function (item: any) {
      return item.isSelected == true
    })
    this.getCheckedItemList()
  }

  getCheckedItemList() {
    this.UserCheckedList = []
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].isSelected)
        this.UserCheckedList.push({ id: this.users[i].id })
    }
  }

  inactivarUsers() {
    if (this.UserCheckedList?.length > 0) {
      this.store.dispatch(new ActiveStateUser(this.UserCheckedList))
    } else {
      Swal.fire({
        title: '¡Error!',
        text: 'Seleccione usuarios',
        showCancelButton: false,
        showDenyButton: false,
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#50b848',
        icon: 'error',
      })
    }
  }

  /* Download Excel */
  async onDownloadExcel(): Promise<void> {
    this.downloading = true
    try {
      const columns = new Array()
      columns.push(['', '', '', '', '', '', 'Documentos', '', '', '', ''])
      const columnsLabels = [
        'Foto',
        'Nombres',
        'Apellidos',
        'Email',
        'Cliente',
        'Sede',
      ]
      columns.push(columnsLabels)
      this.users.forEach((user: any) => {
        const rows = new Array()
        rows.push(user.photo)
        rows.push(user.firstName)
        rows.push(user.lastName)
        rows.push(user.email)
        rows.push(user.client)
        rows.push(user.office)
        columns.push(rows)
      })
      downloadExcel({ data: columns, filename: 'Usuarios Inactivos' })
    } catch (e) {
      console.log(e)
    }
    this.downloading = false
  }
}
