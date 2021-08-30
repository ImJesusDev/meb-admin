import { ResourceFilters } from './../../models/inventory';
import { InventoryService } from './../../services/inventory.service';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  title = 'Inventario';
  showAddBtn = true;
  url: string[] = [];
  filters: ResourceFilters;
  downloading: boolean;

  constructor(private route: Router, private inventoryService: InventoryService, private activatedRoute: ActivatedRoute) {
    // Workaround to show button to add clients
    // only in the clients list screen
    this.filters = { };
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showAddBtn = true;
        this.url = event.url.split('?');
        if (this.url[0] !== '/inventario') {
          this.showAddBtn = false;
        } else if (this.url[0] === '/inventario') {
          this.title = 'Inventario';
        }
      }
    });
    this.activatedRoute.queryParams.subscribe(
      params => {
        this.filters.client = params.client;
        this.filters.office = params.office;
        this.filters.status = params.status;
        this.filters.type = params.type;
        this.filters.page = undefined;
        this.filters.perPage = 99999999999999999999999999;
      });
    this.downloading = false;
  }

  ngOnInit(): void {
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
}
