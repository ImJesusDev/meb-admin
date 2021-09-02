import { Checkup } from '@models/chekoups';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { RepairService } from '@services/repair.service';
import { InventoryService } from '@services/inventory.service';
import { ResourceFilters, RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { calcDays } from 'src/app/utils/helpers/date.helper';

@Component({
  selector: 'app-repair',
  templateUrl: './repair.component.html',
  styleUrls: ['./repair.component.css']
})
export class RepairComponent implements OnInit {

  title = 'Reparaciones';
  showAddBtn = true;
  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private repairService: RepairService
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
        if (this.url[0] !== '/reparaciones' && this.url[0] !== '/reparaciones/historial') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/reparaciones') {
          this.title = 'Reparaciones';
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
      case '/reparaciones':
        this.onDownloadExcel();
        break;
      case '/reparaciones/historial':
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
        rows.push(new Date(resource.repairs[resource.repairs.length - 1].createdAt).toLocaleDateString());
        rows.push(calcDays(resource.repairs[resource.repairs.length - 1].createdAt));
        rows.push(resource.client);
        rows.push(resource.office);
        rows.push(resource.reference);
        rows.push(resource.status ? RESOURCE_STATUS_NAMES[resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Reparaciones' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.repairService.getHistoryRepairs({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to
      }).toPromise();
      const repairs: Checkup[] = response.repairs;

      const columns = new Array();
      columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
      repairs.forEach(repair => {
        const rows = new Array();
        rows.push(repair.createdAt);
        rows.push(calcDays(repair.createdAt));
        rows.push(repair.resource?.client);
        rows.push(repair.resource?.office);
        rows.push(repair.resource?.reference);
        rows.push(repair.resource && repair.resource.status ? RESOURCE_STATUS_NAMES[repair.resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Historial de reparaciones' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }
}
