import { Navigation } from '../../utils/helpers/navigation.helper'
import { Client } from '../../models/client'
import { Checkup } from '../../models/chekoups'
import { ResourceType } from 'src/app/models'
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
/* rxjs */
import { Observable, of } from 'rxjs'
/* Models */
import { Resource } from '../../models'
import { RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from '../../models/inventory'
/* NgRx */
import { Store, select } from '@ngrx/store'
/* State */
import { State } from '../../inventory/state'
import { StartLoader } from '@state/loader/loader.actions'
import { getLoader } from '@state/loader/loader.selector'
/* Selectors */
import { getResources } from '../../inventory/state/inventory/inventory.selector'
import { getBookings } from '../../booking/state/booking/booking.selector'
/* Actions */
import { LoadResources } from '../../inventory/state/inventory/inventory.actions'
// import { Startbooking, Updatebooking } from '../state/booking';
import { LoadClients } from 'src/app/clients/state/clients'
import { getClients } from 'src/app/clients/state/clients/clients.selector'
import { downloadExcel } from 'src/app/utils/helpers/excel.helper'
import { LoadBooking } from '../state/booking'

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  /* Observable of clients from store */
  resources$: Observable<Resource[]> = of([] as Resource[])
  resourceId: string
  resourceLength: number
  downloading: boolean | undefined;
  textTravel:string = "";
  commentTravel:string = "";
  loadingDOM:boolean = false;
  travelsModal:any = []


  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[])
  bookings$: Observable<any[]> = of([] as any[])
  /* Observable of clients from store */
  clients$: Observable<Client[]> = of([] as Client[])

  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false)

  resourceStatus = RESOURCE_STATUS
  resourceStatusNames = RESOURCE_STATUS_NAMES
  title = 'Reservas';
  page: number
  perPage: number

  client: string
  clientSelected: Client
  office: string
  state: string
  from: string
  to: string
  reference: string
  document:string = ""
  calificacion:string = ""
  tiempoEntrega:string = ""
  booking:any = []

  /* Modals */

  showBackDrop = false
  showModal = false

  showBackDropF = false
  showModalF = false
  showDomainListModal = false

  showModalIndicador = false
  showModalCalificacion = false
  showModalViajes = false
  showModalL = false

  checkup: Checkup

  constructor(
    private store: Store<State>,
    private router: Router,
    private navigation: Navigation,
    private route: ActivatedRoute,
  ) {
    this.page = 1
    this.perPage = 10
    this.resourceId = ''

    this.client = ''
    this.clientSelected = {} as Client
    this.office = ''
    this.state = ''
    this.from = ''
    this.to = ''
    this.reference = ''


    this.resourceLength = 0
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: '',
    }

    this.setQueryParams()
    this.loadResources()
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients())
    this.store.dispatch(new LoadBooking())
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.bookings$ = this.store.pipe(select(getBookings))
    

    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients))
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader))


    this.bookings$.subscribe((data:any) => {
      this.booking = data[0];
      this.loadingDOM = true;
    })

   //  console.log(this.booking);
  }

  setQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.client = params.client
      this.office = params.office
      this.state = params.status
      this.from = params.from
      this.to = params.to
      this.reference = params.reference
    })
  }

  loadResources(): void {
    this.store.dispatch(new StartLoader())
    // Hacer filtro
  }

  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return
    }
    if (page > 0) {
      this.page = page
      this.loadResources()
    }
  }

  cleanFilter(): void {}

  filterResources(): void {
    //Filtro
  }

  calcDays(date: string): number {
    const checkUpDate = new Date(date)
    const currentDate = new Date()

    const sub = currentDate.getTime() - checkUpDate.getTime()
    const results = Math.round(sub / (1000 * 60 * 60 * 24))
    return results
  }

  /*
  MODALS
  */

  openIndicadores(checkup: any, resourceId: any): void {
    this.showModalIndicador = true
    setTimeout(() => {
      this.showDomainListModal = true
    }, 100)
  }

  openCalificacion(rating: any, comment: any): void {
    this.showModalCalificacion = true;
    this.textTravel = rating;
    this.commentTravel = comment;
    setTimeout(() => {
      this.showDomainListModal = true
    }, 200)
  }

  openViajes(travels: any): void {
    this.travelsModal = travels
    this.showModalViajes = true
    setTimeout(() => {
      this.showDomainListModal = true
    }, 100)
  }

  onCloseLastModal(): void {
    this.showModalIndicador = false
    this.showModalCalificacion = false
    this.showModalViajes = false
    setTimeout(() => {
      this.showDomainListModal = false
    }, 100)
  }

  /* Download Excel */
  async onDownloadExcel(): Promise<void> {
    this.downloading = true;
    try {
      const columns = new Array();
      columns.push(['', '', '', '', '', '', '', '', '', '', '']);
      const columnsLabels = ['Fecha', 'Cédula', 'Cliente', 'Sede Inicio', 'Sede entrega', 'Referencia Recurso', 'Tiempo en reserva', 'Tiempo en demora', 'Viajes', 'Calificación servicio', 'Indicadores'];
      columns.push(columnsLabels);
      this.booking.forEach((booking:any) => {
        const rows = new Array();
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        rows.push(booking.client);
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Reservas' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

}
