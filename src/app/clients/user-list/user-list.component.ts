import { getClientById } from './../state/clients/clients.selector';
import { State } from './../../state/users/user.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
/* Actions */
import { LoadTeam } from '../../state/users/user.actions';

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

  loader$: Observable<boolean> = of(false);

  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  office: string = "";
  users:any;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    // Dispatch action to load clients
    this.store.dispatch(new LoadTeam());

    this.client = { } as Client;

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client;
                this.users = client.users;
              }
            })
        );
      }
    });
  }

  ngOnInit(): void {
  }

  filterResources(): void {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client) => {
              if (client) {
                this.client = client;
                
                this.users = client.users;
                let userFilter:any = [];
                this.users.forEach((element: any) => {
                  if(element.office == this.office){
                    userFilter.push(element); 
                  }
                });
                this.users = userFilter;
              }
            })
        );
      }
    });
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
