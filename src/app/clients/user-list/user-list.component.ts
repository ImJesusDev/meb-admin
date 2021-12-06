import { getClientById } from './../state/clients/clients.selector'
import { State } from './../../state/users/user.reducer'
import { Store, select } from '@ngrx/store'
import { ActivatedRoute } from '@angular/router'
import { Observable, of, Subscription } from 'rxjs'
import { Client } from './../../models/client'
import { Component, OnInit } from '@angular/core'
/* Actions */
import { LoadTeam } from '../../state/users/user.actions'
import { downloadExcel } from 'src/app/utils/helpers/excel.helper'
/* Alerts */
import Swal from 'sweetalert2';
import { ActiveStateUser, InactiveStateUser, LoadMassiveStateUser } from '../state/clients/clients.actions';
import {Router} from "@angular/router";

export class CSVRecord {  
  public email: any;  
  public password: any;  
  public firstName: any;  
  public lastName: any;  
  public client: any;  
  public office: any; 
  public mainTransportationMethod: any;
  public secondaryTransportationMethod: any;
  public termsDate: any;
  public comodatoDate: any;     
} 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  title = 'Usuarios'
  showAddBtn = true
  url: string[] = []
  downloading: boolean | undefined
  showDomainListBackDrop = false
  showDomainListModal = false
  loadMassiveUser:any;
  loader$: Observable<boolean> = of(false)

  /* Current client Object */
  client: Client
  /* Keep track of subscriptions */
  private subscriptions = new Subscription()

  office: string = ''
  users: any = []
  documentNumber: string = ''
  masterSelected: boolean = false
  UserCheckedList: any = []
  UserMassive: any = []
  records: any[] | undefined
  csvReader: any

   

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
                  if (user.deletedAt == null) {
                    this.users.push({
                      ...user,
                      selected: false,
                    })
                  }
                })
                console.log(this.users);
              }
            }),
        )
      }
    })
  }

  ngOnInit(): void {}

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

  inactivarUsers(){
    if(this.UserCheckedList?.length > 0){
      this.store.dispatch(
        new InactiveStateUser(this.UserCheckedList)
      );
      this.route.params.subscribe((param) => {
        if (param.id) {
          this.router.navigate(['clientes/'+param.id+'/usuarios/inactivos']);
        }
      });
      
    }else{
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
                    element.deletedAt == null &&
                    this.office?.length > 0 &&
                    this.documentNumber?.length > 0 &&
                    element.office == this.office &&
                    element.documentNumber == this.documentNumber
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt == null &&
                    this.office?.length == 0 &&
                    this.documentNumber?.length > 0 &&
                    element.documentNumber == this.documentNumber
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt == null &&
                    this.office?.length > 0 &&
                    this.documentNumber?.length == 0 &&
                    element.office == this.office
                  ) {
                    userFilter.push(element)
                  } else if (
                    element.deletedAt == null &&
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

  closeDomainListModal(): void {
    this.showDomainListBackDrop = false
    setTimeout(() => {
      this.showDomainListModal = false
    }, 100)
  }
  /* Open modal to show domains */
  openDomainListModal(): void {
    this.showDomainListBackDrop = true
    setTimeout(() => {
      this.showDomainListModal = true
    }, 100)
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
        'Documento',
        'Email',
        'Teléfono',
        'Cliente',
        'Sede',
        'EPS',
        'Nombre contacto',
        'número contacto',
      ]
      columns.push(columnsLabels)
      this.users.forEach((user: any) => {
        const rows = new Array()
        rows.push(user.photo)
        rows.push(user.firstName)
        rows.push(user.lastName)
        rows.push(user.documentNumber)
        rows.push(user.email)
        rows.push(user.phone)
        rows.push(user.client)
        rows.push(user.office)
        if (typeof user.eps != 'undefined') {
          rows.push(user.eps.name)
        } else {
          rows.push('')
        }
        rows.push(user.emergencyContactName)
        rows.push(user.emergencyContactPhone)
        columns.push(rows)
      })
      downloadExcel({ data: columns, filename: 'Usuarios Activos' })
    } catch (e) {
      console.log(e)
    }
    this.downloading = false
  }


  /**
   * Metodos para la carga masiva
   * @param $event 
   */

  loadExcelUsers($event: any){
    let text = [];  
    let files = $event.srcElement.files;  
  
    if (this.isValidCSVFile(files[0])) {  
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result; 
        
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        
        let headersRow = this.getHeaderArray(csvRecordsArray);  
  
        this.UserMassive = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };  
  
      reader.onerror = function () {  
        Swal.fire({
          title: '¡Error!',
          text: 'error is occured while reading file!',
          showCancelButton: false,
          showDenyButton: false,
          confirmButtonText: `Aceptar`,
          confirmButtonColor: '#50b848',
          icon: 'error',
        })
      };  
  
    } else {  
      Swal.fire({
        title: '¡Error!',
        text: 'Please import valid .csv file.!',
        showCancelButton: false,
        showDenyButton: false,
        confirmButtonText: `Aceptar`,
        confirmButtonColor: '#50b848',
        icon: 'error',
      })
      this.fileReset();  
    } 

  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    
    for (let i = 1; i < csvRecordsArray.length; i++) {  
     
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length == headerLength) {  
        let csvRecord: CSVRecord = new CSVRecord();  
        csvRecord.email = curruntRecord[0].trim();  
        csvRecord.password = curruntRecord[1].trim();  
        csvRecord.firstName = curruntRecord[2].trim();  
        csvRecord.lastName = curruntRecord[3].trim();  
        csvRecord.client = curruntRecord[4].trim();  
        csvRecord.office = curruntRecord[5].trim();  
        csvRecord.mainTransportationMethod = curruntRecord[6].trim(); 
        csvRecord.secondaryTransportationMethod = curruntRecord[7].trim(); 
        csvRecord.termsDate = curruntRecord[8].trim(); 
        csvRecord.comodatoDate = curruntRecord[9].trim(); 
        csvArr.push(csvRecord);  
      }  
    } 
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  } 


  /**
   * Carga masiva de usuarios
   */
  LoadMassive(){
      this.store.dispatch(
        new LoadMassiveStateUser(this.UserMassive)
      );
      // this.route.params.subscribe((param) => {
      //   if (param.id) {
      //     window.location.reload();
      //   }
      // });
  }



}
