import { Checkup } from '@models/chekoups';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { BookingService } from '@services/booking.service';
import { ResourceFilters, RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  title = 'Reservas';
  showAddBtn = true;
  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService
  ) {
    this.filters = { };
    this.downloading = false;
    this.subscribeRouteEvents();
    this.subscribeRouteParams();
  }

  ngOnInit(): void {
  }

  subscribeRouteEvents(): void {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        this.url = event.url.split('?');
        if (this.url[0] !== '/reservas' && this.url[0] !== '/reservas/historial') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/reservas') {
          this.title = 'Reservas';
        }
      }
    });
  }
  subscribeRouteParams(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.status = RESOURCE_STATUS.PendingRepair;
        this.filters.page = undefined;
        this.filters.perPage = 99999999999999999999999999;
        this.filters.client = params.client;
        this.filters.office = params.office;
        this.filters.type = params.type;
        this.filters.from = params.from;
        this.filters.to = params.to;
        this.filters.reference = params.reference;
      });
  }


  setDownloadExcelType(): void {
    switch (this.url[0]) {
      case '/reservas':
        this.onDownloadExcel();
        break;
      case '/reservas/historial':
        this.onDownloadHistoryExcel();
        break;
      default:
        break;
    }
  }

  async onDownloadExcel(): Promise<void> {
    // this.downloading = true;
    // try {
    //   const { resources } = await this.inventoryService.getResources(this.filters).toPromise();
    //   const columns = new Array();
    //   columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
    //   resources.forEach(resource => {
    //     const rows = new Array();
    //     rows.push(new Date(resource.repairs[resource.repairs.length - 1].createdAt).toLocaleDateString());
    //     rows.push(calcDays(resource.repairs[resource.repairs.length - 1].createdAt));
    //     rows.push(resource.client);
    //     rows.push(resource.office);
    //     rows.push(resource.reference);
    //     rows.push(resource.status ? RESOURCE_STATUS_NAMES[resource.status] : '');
    //     columns.push(rows);
    //   });
    //   downloadExcel({ data: columns, filename: 'Reservas' });
    // } catch (e) {
    //   console.log(e);
    // }
    // this.downloading = false;
  }

  async onDownloadHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.bookingService.getHistoryRepairs({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to
      }).toPromise();
      const repairs: Checkup[] = response.repairs;

      const columns = new Array();
      columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
      // repairs.forEach(repair => {
      //   const rows = new Array();
      //   rows.push(booking.createdAt);
      //   rows.push(calcDays(booking.createdAt));
      //   rows.push(booking.resource?.client);
      //   rows.push(booking.resource?.office);
      //   rows.push(booking.resource?.reference);
      //   rows.push(booking.resource && booking.resource.status ? RESOURCE_STATUS_NAMES[booking.resource.status] : '');
      //   columns.push(rows);
      // });
      downloadExcel({ data: columns, filename: 'Historial de reservas' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }
}
