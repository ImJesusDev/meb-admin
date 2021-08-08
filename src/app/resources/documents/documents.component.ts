import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* rxjs */
import { Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Document, ResourceType } from 'src/app/models';
/* State */
import { State } from '../state';
import { getResourceById } from '../state/resources/resources.selector';
import { LoadResources } from '../state/resources';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {

  /* Current client Object */
  resource: ResourceType;

  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  /* Create modal */
  showBackDropCreatedocument: boolean;
  showCreatedocument: boolean;

  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {

    this.resource = {
      checkupTime: 0,
      id: '',
      measureIndicators: false,
      photo: '',
      type: ''
    };

    this.route.params.subscribe((param) => {
      if (param.resourceTypeId) {
        this.subscriptions.add(
          this.store
            .pipe(select(getResourceById(param.resourceTypeId)))
            .subscribe((resource: ResourceType | undefined) => {
              if (resource) {
                this.resource = resource;
              }
            })
        );
      }
    });

    this.showBackDropCreatedocument = false;
    this.showCreatedocument = false;
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadResources());
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBack(): void {
    this.subscriptions.unsubscribe();
    this.router.navigate(['recursos']);
  }


  async onShowCreateDocument(): Promise<void> {
    this.showBackDropCreatedocument = true;
    setTimeout(() => {
      this.showCreatedocument = true;
    }, 100);
  }
  onCloseCreatedocumentModal(): void {
    this.showBackDropCreatedocument = false;
    setTimeout(() => {
      this.showCreatedocument = false;
    }, 100);
  }
}
