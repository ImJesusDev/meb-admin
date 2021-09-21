import { getClientById } from './../../state/clients/clients.selector';
import { State } from './../../../state/users/user.reducer';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from './../../../models/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-user-list',
  templateUrl: './inactive-user-list.component.html',
  styleUrls: ['./inactive-user-list.component.css']
})
export class InactiveUserListComponent implements OnInit {
  SedeFilter:any;
  cedula:any;
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  office: string;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute
  ) {
    this.client = { } as Client;
    this.office = '';

    this.route.params.subscribe((param) => {
      if (param.id) {
        this.subscriptions.add(
          this.store
            .pipe(select(getClientById(param.id)))
            .subscribe((client: Client | undefined) => {
              if (client) {
                this.client = client;
              }
            })
        );
      }
    });
  }

  ngOnInit(): void {
  }

  filterSedes(){}
  filterCedula(){}

}
