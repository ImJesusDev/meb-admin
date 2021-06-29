import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Client } from 'src/app/models';
/* State */
import { State } from '../state';
import { getClientById } from '../state/clients/clients.selector';
import { LoadClients } from '../state/clients';
@Component({
  selector: 'app-offices-list',
  templateUrl: './offices-list.component.html',
  styleUrls: ['./offices-list.component.css'],
})
export class OfficesListComponent implements OnInit, OnDestroy {
  /* Current client Object */
  client: Client;
  /* Keep track of subscriptions */
  private subscriptions = new Subscription();
  constructor(private store: Store<State>, private route: ActivatedRoute) {
    this.client = {
      id: '',
      name: '',
      nit: '',
      logo: '',
      slug: '',
    };
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
    this.store.dispatch(new LoadClients());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
