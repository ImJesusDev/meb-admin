import { calcDays } from 'src/app/utils/helpers/date.helper';
import { Checkup } from './../../models/chekoups';
import { MaintenanceService } from './../../services/maintenance.service';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { InventoryService } from '@services/inventory.service';
import { ResourceFilters, RESOURCE_STATUS, PaginationResources, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  title = 'Mantenimientos';
  showAddBtn = true;

  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  resourceStatus = RESOURCE_STATUS;

  constructor(
    public route: Router,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute,
    private maintenanceService: MaintenanceService
  ) {
    this.filters = { };
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        this.url = event.url.split('?');
        if (this.url[0] !== '/mantenimientos' && this.url[0] !== '/mantenimientos/historial') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/mantenimientos') {
          this.title = 'Mantenimientos';
        }
      }
    });
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.status = this.resourceStatus.PendingMaintenance;
        this.filters.page = undefined;
        this.filters.perPage = 99999999999999999999999999;
        this.filters.client = params.client;
        this.filters.office = params.office;
        this.filters.type = params.type;
        this.filters.from = params.from;
        this.filters.to = params.to;
        this.filters.reference = params.reference;
      });
    this.downloading = false;
  }

  ngOnInit(): void {
  }

  setDownloadExcelType(): void {
    switch (this.url[0]) {
      case '/mantenimientos':
        this.onDownloadExcel();
        break;
      case '/mantenimientos/historial':
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
        rows.push(new Date(resource.maintenances[resource.maintenances.length - 1].createdAt).toLocaleDateString());
        rows.push(calcDays(resource.maintenances[resource.maintenances.length - 1].createdAt));
        rows.push(resource.client);
        rows.push(resource.office);
        rows.push(resource.reference);
        rows.push(resource.status ? RESOURCE_STATUS_NAMES[resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Mantenimientos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.maintenanceService.getHistoryMaintenance({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to
      }).toPromise();
      const maintenances: Checkup[] = response.maintenances;
      const columns = new Array();
      columns.push(['Fecha', 'Días', 'Cliente', 'Sede', 'Referencia', 'Estado']);
      maintenances.forEach(maintenance => {
        const rows = new Array();
        rows.push(maintenance.createdAt);
        rows.push(calcDays(maintenance.createdAt));
        rows.push(maintenance.resource?.client);
        rows.push(maintenance.resource?.office);
        rows.push(maintenance.resource?.reference);
        rows.push(maintenance.resource && maintenance.resource.status ? RESOURCE_STATUS_NAMES[maintenance.resource.status] : '');
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'Historial de mantenimientos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

}
