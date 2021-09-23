import { getClientById } from './../state/clients/clients.selector';
import { getUsers } from './../../state/users/users.selector';
import { State } from './../../state/users/user.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { User } from '@models/user';
/* Actions */
import { LoadTeam, LoadClientAdmin, LoadUsers } from '../../state/users/user.actions';
import { LoadClients } from '../state/clients/clients.actions';
import { getLoader } from '@state/loader/loader.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  title = 'Usuarios';
  showAddBtn = true;
  url: string[] = [];
  downloading: boolean | undefined;

  users$: Observable<User[]> = of([] as User[]);
  loader$: Observable<boolean> = of(false);

  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  office: string;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    // Dispatch action to load clients
    this.store.dispatch(new LoadTeam());

    this.client = { } as Client;
    this.office = '';

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                console.log(client);
                this.client = client;
              }
            })
        );
      }
    });
  }

  ngOnInit(): void {
    // Use selector to get clients from state
    this.users$ = this.store.pipe(select(getUsers));

    this.users$.subscribe((data) => {
      console.log(data);
    });
    // Use selector to ger loader state
    // this.loader$ = this.store.pipe(select(getLoader));
  }

  
  setDownloadExcelType(): void {
    switch (this.url[0]) {
      case '/mantenimientos':
        // this.onDownloadExcel();
        break;
      case '/mantenimientos/historial':
        // this.onDownloadHistoryExcel();
        break;
      default:
        break;
    }
  }

}
