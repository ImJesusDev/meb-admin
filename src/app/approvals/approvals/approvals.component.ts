import { Checkup } from '@models/chekoups';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { calcDays } from 'src/app/utils/helpers/date.helper';
import { MaintenanceService } from './../../services/maintenance.service';
import { RepairService } from '@services/repair.service';
import { InventoryService } from '@services/inventory.service';
import { ResourceFilters, RESOURCE_STATUS, RESOURCE_STATUS_NAMES } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  title = 'Aprobaciones';
  showAddBtn = true;
  url: string[] = [];

  filters: ResourceFilters;
  downloading: boolean;

  constructor(
    public route: Router,
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private repairService: RepairService,
    private maintenanceService: MaintenanceService,
  ) {
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        if (event.url !== '/aprobaciones') {
          this.showAddBtn = false;
        } else if (event.url === '/aprobaciones') {
          this.title = 'Aprobaciones';
        }
      }
    });

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
      }
    });
  }
  subscribeRouteParams(): void {
    this.activatedRoute.queryParams.subscribe(
      params => {
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
      case '/aprobaciones' || '/aprobaciones/maintenance':
        this.filters.status = RESOURCE_STATUS.WaitingApprovalMaintenance;
        this.onDownloadExcel();
        break;
      case '/aprobaciones/repair':
        this.filters.status = RESOURCE_STATUS.WaitingApprovalRepair;
        this.onDownloadExcel();
        break;
      case '/aprobaciones/historial':
        this.onDownloadMaintenancesHistoryExcel();
        break;
      case '/aprobaciones/historial-reparaciones':
        this.onDownloadRepairsHistoryExcel();
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
      downloadExcel({ data: columns, filename: 'Aprobaciones' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadRepairsHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.repairService.getHistoryRepairs({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to,
        status: 'approved'
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
      downloadExcel({ data: columns, filename: 'Historial de Aprobaciones de Reparaciones' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadMaintenancesHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      const response = await this.maintenanceService.getHistoryMaintenance({
        page: this.filters.page,
        perPage: this.filters.perPage,
        from: this.filters.from,
        to: this.filters.to,
        status: 'approved'
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
      downloadExcel({ data: columns, filename: 'Historial de Aprobaciones de Mantenimientos' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }
}
