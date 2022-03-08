import { Navigation } from '../../utils/helpers/navigation.helper'
import { Client } from '../../models/client'
import { Booking, Travels } from '../../models/booking'
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
import { StartLoader, StopLoader } from '@state/loader/loader.actions'
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
import { BookingService } from '@services/booking.service'

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  /* Observable of clients from store */
  // bookings$: Observable<any[]> = of([] as any[])
  bookings$: Observable<{ page: number, perPage: number, totalResults: number, reservations: Booking[] }> = of({ } as {
    page: number, perPage: number, totalResults: number, reservations: Booking[], travelsContent: Travels[]
  });

  downExcel$: Observable<{ page: number, perPage: number, totalResults: number, reservations: Booking[] }> = of({ } as {
    page: number, perPage: number, totalResults: number, reservations: Booking[], travelsContent: Travels[]
  });
  resourceId: string
  resourceLength: number
  downloading: boolean | undefined;
  textTravel:string = "";
  commentTravel:string = "";
  loadingDOM:boolean = false;
  travelsModal:any = []
  travelsContent:any = [];

  /* Observable of resource types from store */
  resourcesTypes$: Observable<ResourceType[]> = of([] as ResourceType[])
  
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
  bookingData:any = []

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

  constructor(
    private store: Store<State>,
    private router: Router,
    private navigation: Navigation,
    private route: ActivatedRoute,
    private bookingService: BookingService,
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

    this.setQueryParams()
    this.loadResources()
    // Dispatch action to load clients
    this.store.dispatch(new LoadClients())
    this.store.dispatch(new LoadBooking())
  }

  ngOnInit(): void {    
    // Use selector to get clients from state
    this.clients$ = this.store.pipe(select(getClients))
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader))

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

  /**
   * HOra demora
   */
  calcularDiferenciaHoras(fecha1: any, fecha2: any): any{
    let fecha = new Date(fecha1); 
    let fechados = new Date(fecha2); 
    if (!(fecha instanceof Date) || !(fechados instanceof Date)) {
        throw TypeError('Ambos argumentos deben ser objetos de tipo fecha (Date).');
    }
    let diferencia:number = (fechados.getTime() - fecha.getTime()) / 1000;
    diferencia /= (60 * 60);
    let horas = Math.abs(Math.round(diferencia));
    if(horas < 24){
      return "N/A";
    }else{
      return horas - 24;
    }
  }

   /**
   * Tiempo reservas
   */
    calcularTimeReservas(fecha1: any, fecha2: any): number{
      let fecha = new Date(fecha1); 
      let fechados = new Date(fecha2); 
      if (!(fecha instanceof Date) || !(fechados instanceof Date)) {
          throw TypeError('Ambos argumentos deben ser objetos de tipo fecha (Date).');
      }
      let diferencia:number = (fechados.getTime() - fecha.getTime()) / 1000;
      diferencia /= (60 * 60);
      return  Math.abs(Math.round(diferencia));
    }

   /**
   * CalcDays - Calcular días
   * @param date 
   * @returns 
   */
    calcDays(date: string): number {
      const checkUpDate = new Date(date)
      const currentDate = new Date()
  
      const sub = currentDate.getTime() - checkUpDate.getTime()
      const results = Math.round(sub / (1000 * 60 * 60 * 24))
      return results
    }
  

  /**
   * Cargar contendio
   */
  loadResources(): void {
    this.store.dispatch(new StartLoader())
    this.bookings$ = this.bookingService.getBookings({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: this.perPage,
      reference: this.reference,
      client: this.client,
      office: this.office,
    });
    this.downExcel$ = this.bookingService.getBookings({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: 1000,
      reference: this.reference,
      client: this.client,
      office: this.office,
    });
    this.bookings$.subscribe(data => {
      this.resourceLength = data.reservations?.length;
      this.bookingData = data;
      this.store.dispatch(new StopLoader());
    });
    
  }

  /**
   * Cambiar de pagina en el paginador
   * @param page 
   * @param operation 
   * @returns 
   */
  changePage(page: number, operation: 'previous' | 'following'): void {
    if (this.resourceLength === 0 && operation === 'following') {
      return
    }
    if (page > 0) {
      this.page = page
      this.loadResources()
    }
  }

  /**
   * Limpiar los filtros y la carga de las tablas
   */
  cleanFilter(): void {}

  /**
   * Filtar contenido
   */
  filterResources(): void {
    this.store.dispatch(new StartLoader());
    this.store.dispatch(new LoadBooking({
      from: this.from,
      to: this.to,
      page: this.page,
      perPage: this.perPage,
      reference: this.reference,
      client: this.client,
      office: this.office,
    }));
    this.loader$ = this.store.pipe(select(getLoader));
    this.navigation.setQueryParams({
      client: this.client ? this.client : null,
      office: this.office && this.client ? this.office : null,
      from: this.from ? this.from : null,
      to: this.to ? this.to : null,
      page: this.page ? this.page : null,
      perPage: this.perPage  ? this.perPage : null,
      reference: this.reference  ? this.reference : null
    });
  }

 
  /*
  MODALS
  */
 existIndicators(travels:Travels[]){  
   for (let index = 0; index < travels.length; index++) {
     if(typeof travels[index].indicators != 'undefined'){ 
        return true;
     }
     
   }
   return false;
 }

  openIndicadores(cnt: any): void {
    this.showModalIndicador = true
    this.travelsContent = [];
    for (let index = 0; index < cnt.length; index++) {
        this.travelsContent.push(cnt[index].indicators);
    }
    // console.log(this.travelsContent);
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
      this.downExcel$.subscribe(data => {
        data.reservations.forEach((booking:any) => {
          console.log(booking);
          let con = booking.travels;
          const columnsLabels = new Array();
          columnsLabels.push('Fecha', 'Cliente', 'Correo', 'Referencia Recurso', 'Tiempo en reserva', 'Tiempo en demora', 'Calificación servicio');
          for (let index = 1; index <= con.length; index++) {
            columnsLabels.push('viaje '+index+' desde', 'viaje '+index+' hasta', 'calorias viaje '+index,  'Huella económica viaje '+index,  'Huella enerética viaje '+index,  'Huella de carbono viaje '+index,  'Kilometros viaje '+index)
          }
          columns.push(columnsLabels);
          const rows = new Array();
          rows.push(booking.createdAt);
          rows.push(booking.user.client);
          rows.push(booking.user.email);
          rows.push(booking.resourceRef);
          rows.push(this.calcularTimeReservas(booking.createdAt, booking.returnedAt));
          rows.push(this.calcularDiferenciaHoras(booking.createdAt, booking.returnedAt));
          rows.push(booking.rating);
          booking.travels.forEach((travel:any) => {
            rows.push(travel.origin);
            rows.push(travel.destination);
            if(travel.indicators){
                rows.push(travel.indicators.calories);
                rows.push(travel.indicators.economicFootprint);
                rows.push(travel.indicators.energyFootprint+" galones de gasolina");
                rows.push(travel.indicators.environmentalFootprint+"gr CO2");
                rows.push(travel.indicators.km);
            }
          });
          columns.push(rows);
        });
        this.store.dispatch(new StopLoader());
        downloadExcel({ data: columns, filename: 'Reservas' });
      });
     
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

}
