import { Component, OnDestroy, OnInit } from '@angular/core';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* Models */
import { ResourceType } from '../../models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
/* Selectors */
import { getResources } from '../state/resources/resources.selector';
import { StartLoader } from '../../state/loader/loader.actions';
import { getLoader } from '../../state/loader/loader.selector';
/* Actions */
import {
  LoadResources,
} from '../state/resources/resources.actions';

/* Components */
import { Column } from '@molecules/table/table/table.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit, OnDestroy {

  /* Observable of resources from store */
  resources$: Observable<ResourceType[]> = of([] as ResourceType[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  columns: Column[];
  headers: string[] = ['', 'Marca', 'Modelo', 'Tipo', 'Días de chequeo', 'Indicadores de medida', 'Kilometros de mantenimiento', 'Versión', 'Componentes', 'Documentos'];

  /* Component modal */
  showCreateComponent: boolean;
  showBackDropCreateComponent: boolean;

  /* Document modal */
  showCreateDocument: boolean;
  showBackDropCreateDocument: boolean;


  resourceId: string;


  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load resources
    this.store.dispatch(new LoadResources());
    this.columns = [
      {
        name: 'photo',
        type: 'image'
      },
      {
        name: 'resourceTypeBrand',
        type: 'text'
      },
      {
        name: 'resourceTypeModel',
        type: 'text'
      },
      {
        name: 'type',
        type: 'text'
      },
      {
        name: 'checkupTime',
        type: 'text'
      },
      {
        name: 'measureIndicators',
        type: 'boolean'
      },
      {
        name: 'kmToMaintenance',
        type: 'text'
      },
      {
        name: 'version',
        type: 'text'
      },
      {
        name: 'components',
        type: 'extra',
        onClick: ((index: number) => this.goComponents(index)),
        onClickPlus: (index: number) => this.onShowCreateComponent(index)
      },
      {
        name: 'documentTypes',
        type: 'extra',
        onClick: ((index: number) => this.goDocuments(index)),
        onClickPlus: (index: number) => this.onShowCreateDocument(index)
      },
    ];
    this.showCreateComponent = false;
    this.showBackDropCreateComponent = false;
    this.showCreateDocument = false;
    this.showBackDropCreateDocument = false;
    this.resourceId = '';
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async onShowCreateComponent(index: number): Promise<void> {
    this.subscriptions.add(
      this.resources$.subscribe(data => this.resourceId = data[index]?.id)
    );
    this.showBackDropCreateComponent = true;
    setTimeout(() => {
      this.showCreateComponent = true;
    }, 100);
  }
  onCloseCreateComponentModal(): void {
    this.showBackDropCreateComponent = false;
    setTimeout(() => {
      this.showCreateComponent = false;
    }, 100);
  }

  async onShowCreateDocument(index: number): Promise<void> {
    this.subscriptions.add(
      this.resources$.subscribe(data => this.resourceId = data[index]?.id)
    );
    this.showBackDropCreateDocument = true;
    setTimeout(() => {
      this.showCreateDocument = true;
    }, 100);
  }
  onCloseCreateDocumentModal(): void {
    this.showBackDropCreateDocument = false;
    setTimeout(() => {
      this.showCreateDocument = false;
    }, 100);
  }

  goComponents(index: number): void {
    this.subscriptions.add(this.resources$.subscribe(data => this.resourceId = data[index]?.id));
    this.router.navigate(['recursos', this.resourceId, 'components']);
  }
  goDocuments(index: number): void {
    this.subscriptions.add(this.resources$.subscribe(data => this.resourceId = data[index]?.id));
    this.router.navigate(['recursos', this.resourceId, 'documents']);
  }
}
