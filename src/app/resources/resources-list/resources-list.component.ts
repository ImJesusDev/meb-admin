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
// Components
import { ModalComponent } from '@atoms/modal';
import { AddComponentModalComponent } from '../add-component-modal/add-component-modal.component';

/* Alerts */
import Swal from 'sweetalert2';
import { Domain } from '../../models';

/* Components */
import { Column } from '@molecules/table/table/table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit, OnDestroy {

  /* Observable of clients from store */
  resources$: Observable<ResourceType[]> = of([] as ResourceType[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  columns: Column[];
  headers: string[] = ['', 'Marca', 'Modelo', 'Tipo', 'Días de chequeo', 'Indicadores de medida', 'Versión', 'Componentes', 'Documentos'];

  showCreateComponent: boolean;
  showBackDropCreateComponent: boolean;
  resourceId: string;


  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  constructor(private store: Store<State>, private router: Router) {
    this.store.dispatch(new StartLoader());
    // Dispatch action to load clients
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
        type: 'extra'
      },
    ];
    this.showCreateComponent = false;
    this.showBackDropCreateComponent = false;
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

  async goComponents(index: number): Promise<void> {
    this.subscriptions.add(this.resources$.subscribe(data => this.resourceId = data[index]?.id));
    this.router.navigate(['recursos', this.resourceId, 'components']);
  }
}
