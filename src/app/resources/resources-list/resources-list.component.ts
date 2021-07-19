import { Component, OnInit } from '@angular/core';
/* rxjs */
import { Observable, of } from 'rxjs';
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

/* Alerts */
import Swal from 'sweetalert2';
import { Domain } from '../../models';

/* Components */
import { Column } from '@molecules/table/table/table.component';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {

  /* Observable of clients from store */
  resources$: Observable<ResourceType[]> = of([] as ResourceType[]);
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  columns: Column[];
  headers: string[] = ['', 'Marca', 'Modelo', 'Tipo', 'Tiempo de chequeo', 'Indicadores de medida', 'Versión'];

  constructor(private store: Store<State>) {
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
    ];
  }

  ngOnInit(): void {
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    // Use selector to ger loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }

}
