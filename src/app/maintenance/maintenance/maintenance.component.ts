import { Checkup } from './../../models/chekoups';
import { MaintenanceService } from './../../services/maintenance.service';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { InventoryService } from '@services/inventory.service';
import { ResourceFilters, RESOURCE_STATUS, PaginationResources } from './../../models/inventory';
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
        if (this.url[0] !== '/mantenimientos') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/mantenimientos') {
          this.title = 'Mantenimientos';
        }
      }
    });
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.client = params.client;
        this.filters.office = params.office;
        this.filters.status = this.resourceStatus.PendingMaintenance;
        this.filters.type = params.type;
        this.filters.page = undefined;
        this.filters.perPage = 99999999999999999999999999;
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
      columns.push(['', '', '', '', '', '', 'Documentos', '', '', '', '']);
      const columnsLabels = ['Tipo', 'Referencia', 'Clave del recurso', 'Cliente', 'Sede', 'Estado'];
      columns.push(columnsLabels);
      resources.forEach(resource => {
        const rows = new Array();
        rows.push(resource.type);
        rows.push(resource.reference);
        rows.push(resource.lockerPassword);
        rows.push(resource.client);
        rows.push(resource.office);
        rows.push(resource.status);
        const documentColumns = new Array();
        resource.documents.forEach((d, i) => {
          rows.push(d.type);
          rows.push(d.expeditionDate?.toLocaleString());
          rows.push(d.expirationDate?.toLocaleString());
          documentColumns.push(`Tipo de documento ${i + 1}`);
          documentColumns.push(`Fecha de expedición del documento ${i + 1}`);
          documentColumns.push(`Fecha de expiración del documento ${i + 1}`);
        });
        columns[1] = columnsLabels.concat(documentColumns);
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'inventario' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

  async onDownloadHistoryExcel(): Promise<void> {
    this.downloading = true;
    try {
      let paginationResources: PaginationResources = { } as PaginationResources;
      if (this.url[0] === '/mantenimientos') {
        paginationResources = await this.inventoryService.getResources(this.filters).toPromise();
      } else if (this.url[0] === '/mantenimientos/historial') {
      }
      const response = await this.maintenanceService.getHistoryMaintenance({
        page: this.filters.page,
        perPage: this.filters.perPage
      }).toPromise();
      const maintenances: Checkup[] = response.maintenances;

      const columns = new Array();
      columns.push(['', '', '', '', '', '', 'Documentos', '', '', '', '']);
      const columnsLabels = ['Tipo', 'Referencia', 'Clave del recurso', 'Cliente', 'Sede', 'Estado'];
      columns.push(columnsLabels);
      maintenances.forEach(resource => {
        const rows = new Array();
        rows.push(resource.resource?.type);
        rows.push(resource.resource?.reference);
        rows.push(resource.resource?.lockerPassword);
        rows.push(resource.resource?.client);
        rows.push(resource.resource?.office);
        rows.push(resource.resource?.status);
        const documentColumns = new Array();
        resource.resource?.documents.forEach((d, i) => {
          rows.push(d.type);
          rows.push(d.expeditionDate?.toLocaleString());
          rows.push(d.expirationDate?.toLocaleString());
          documentColumns.push(`Tipo de documento ${i + 1}`);
          documentColumns.push(`Fecha de expedición del documento ${i + 1}`);
          documentColumns.push(`Fecha de expiración del documento ${i + 1}`);
        });
        columns[1] = columnsLabels.concat(documentColumns);
        columns.push(rows);
      });
      downloadExcel({ data: columns, filename: 'inventario' });
    } catch (e) {
      console.log(e);
    }
    this.downloading = false;
  }

}
