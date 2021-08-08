import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* rxjs */
import { Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { ResourceType } from 'src/app/models';
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
  showBackDropCreateDocument: boolean;
  showCreateDocument: boolean;

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

    this.showBackDropCreateDocument = false;
    this.showCreateDocument = false;
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
}
