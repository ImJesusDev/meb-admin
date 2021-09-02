import { Checkup } from '@models/chekoups';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { calcDays } from 'src/app/utils/helpers/date.helper';
import { InventoryService } from '@services/inventory.service';
import { ResourceFilters, RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-ups',
  templateUrl: './check-ups.component.html',
  styleUrls: ['./check-ups.component.css']
})
export class CheckUpsComponent implements OnInit {

  title = 'Chequeos';
  showAddBtn = true;
  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
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
        if (this.url[0] !== '/check-ups' && this.url[0] !== '/check-ups/historial') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/check-ups') {
          this.title = 'Chequeos';
        }
      }
    });
  }
  subscribeRouteParams(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.status = RESOURCE_STATUS.PendingCheckup;
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
      case '/check-ups':
        this.onDownloadExcel();
        break;
      case '/check-ups/historial':
        this.onDownloadHistoryExcel();
        break;
      default:
        break;
    }
  }

  async onDownloadExcel(): Promise<void> {
    this.downloading = true;
    try {
      const { resources } = await this.inventoryService.getResources(this.filters).toPromise();
      const columns = new Array();
      columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
      resources.forEach(resource => {
        const rows = new Array();
        rows.push(new Date(resource.checkups[resource.checkups.length - 1].createdAt).toLocaleDateString());
        rows.push(calcDays(resource.checkups[resource.checkups.length - 1].createdAt));
        rows.push(resource.client);
        rows.push(resource.office);
        rows.push(resource.reference);
        rows.push(resource.status ? RESOURCE_STATUS_NAMES[resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Chequeos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.inventoryService.getCheckupHistory({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to
      }).toPromise();
      const checkups: Checkup[] = response.checkups;

      const columns = new Array();
      columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
      checkups.forEach(checkup => {
        const rows = new Array();
        rows.push(checkup.createdAt);
        rows.push(calcDays(checkup.createdAt));
        rows.push(checkup.resource?.client);
        rows.push(checkup.resource?.office);
        rows.push(checkup.resource?.reference);
        rows.push(checkup.resource && checkup.resource.status ? RESOURCE_STATUS_NAMES[checkup.resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Historial de chequeos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }
}
