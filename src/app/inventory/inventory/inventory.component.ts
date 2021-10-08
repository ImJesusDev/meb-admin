import { CreateCheckups, ChangeLockerPass } from './../state/inventory/inventory.actions';
import { Resource } from 'src/app/models';
import { Observable, of } from 'rxjs';
/* State */
import { State } from '../state';
import { select, Store } from '@ngrx/store';
import { ResourceFilters, RESOURCE_STATUS } from './../../models/inventory';
import { InventoryService } from './../../services/inventory.service';
import { downloadExcel } from './../../utils/helpers/excel.helper';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { getResources } from '../state/inventory/inventory.selector';
import { InventoryListComponent } from '../inventory-list/inventory-list.component';
/* Libs */
import Swal from 'sweetalert2';
import { CreateMaintenances } from 'src/app/maintenance/state/maintenance';
import { finalize } from 'rxjs/operators';
/* rxjs */
import { Subscription } from 'rxjs';
import { generateRandomNumber } from 'src/app/utils/helpers/number.helper';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {

  title = 'Inventario';
  showAddBtn = true;
  url: string[] = [];
  filters: ResourceFilters;
  downloading: boolean;
  activeAndCheckedResources: Resource[];
  checkedResources: Resource[];
  resources: { id: string }[];

  showBackDrop = false;
  showModal = false;

  /* Observable of clients from store */
  resources$: Observable<Resource[]> = of([] as Resource[]);

  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  constructor(
    private store: Store<State>,
    private route: Router,
    private inventoryService: InventoryService,
    private activatedRoute: ActivatedRoute
  ) {
    if(localStorage.getItem('role') == 'admin'){
      this.showAddBtn = false;
    }
    // Workaround to show button to add clients
    // only in the clients list screen
    this.filters = { };
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
    this.activeAndCheckedResources = [];
    this.resources = [];
    this.checkedResources = [];
  }

  ngOnInit(): void {
    this.resources$ = this.store.pipe(select(getResources));
    this.subscriptions.add(
      this.resources$.subscribe(data => {
        this.activeAndCheckedResources = data.filter(r => r.checked && r.status === RESOURCE_STATUS.Available);
      })
    );
    this.subscriptions.add(
      this.resources$.subscribe(data => {
        this.checkedResources = data.filter(r => r.checked && r.status);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /* Create checkups */
  createCheckup(): void {
    if (this.activeAndCheckedResources.length > 0) {
      this.confirmCreateCheckup();
    }
  }

  confirmCreateCheckup(): void {
    Swal.fire({
      title: '¿Estás seguro que desea mandar los recursos a chequeo?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#50b848',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new CreateCheckups({ resources: this.activeAndCheckedResources }));
      }
    });
  }

  /* Create maintenances*/
  createMaintenance(): void {
    this.activeAndCheckedResources.forEach(r => {
      if (r.checked && r.status === RESOURCE_STATUS.Available) {
        this.resources.push({ id: r.id });
      }
    });
    if (this.resources.length > 0) {
      this.confirmCreateMaintenance(this.resources);
    }
  }

  confirmCreateMaintenance(resources: { id: string }[]): void {
    Swal.fire({
      title: '¿Estás seguro que desea mandar los recursos a mantenimiento?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#50b848',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new CreateMaintenances({ resources }));
      }
    });
  }

  /* Change locker pass */
  changeLockerPass(): void {
    if (this.checkedResources.length > 0) {
      this.confirmChangeLockerPass();
    }
  }

  confirmChangeLockerPass(): void {
    const resources: { reference: string, lockerPassword: number }[] = [];
    this.checkedResources.forEach(r => {
      resources.push({ reference: r.reference, lockerPassword: generateRandomNumber({ length: 4 }) });
    });
    Swal.fire({
      title: '¿Estás seguro que desea cambiar la clave del candado?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      denyButtonText: `Cancelar`,
      confirmButtonColor: '#50b848',
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.dispatch(new ChangeLockerPass({ resources }));
      }
    });
  }

  /* Download Excel */
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
