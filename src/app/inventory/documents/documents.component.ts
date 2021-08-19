import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* rxjs */
import { Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Resource } from 'src/app/models';
/* State */
import { State } from '../state';
import { getResourceById } from '../state/inventory/inventory.selector';
import { LoadResources } from '../state/inventory';


@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  /* Current client Object */
  resource: Resource;

  /* Keep track of subscriptions */
  private subscriptions = new Subscription();


  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {

    this.resource = {
      id: '',
      type: '',
      reference: '',
      qrCode: '',
      lockerPassword: 0,
      client: '',
      office: '',
      loanTime: 0,
      documents: [],
      checkups: [],
      maintenances: [],
      repairs: [],
    };

    this.route.params.subscribe((param) => {
      if (param.resourceId) {
        this.subscriptions.add(
          this.store
            .pipe(select(getResourceById(param.resourceId)))
            .subscribe((resource: Resource | undefined) => {
              if (resource) {
                this.resource = resource;
              }
            })
        );
      }
    });

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadResources());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  onBack(): void {
    this.router.navigate(['inventario']);
  }
}
