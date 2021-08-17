import { Checkup } from './../../models/chekoups';
import { RESOURCE_STATUS } from './../../models/inventory';
import { Component, OnInit } from '@angular/core';
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
  selector: 'app-check-ups-history',
  templateUrl: './check-ups-history.component.html',
  styleUrls: ['./check-ups-history.component.css']
})
export class CheckUpsHistoryComponent implements OnInit {

  /* Current client Object */
  resource: Resource;

  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  resourceStatus = RESOURCE_STATUS;

  showBackDrop = false;
  showModal = false;
  checkup: Checkup;

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
      checkups: []
    };
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
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


  async onShowModal(index: number): Promise<void> {
    if (this.resource.checkups) {
      this.checkup = this.resource.checkups[index];
    }
    this.showBackDrop = true;
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }
  onCloseModal(): void {
    this.showBackDrop = false;
    setTimeout(() => {
      this.showModal = false;
    }, 100);
  }

}
