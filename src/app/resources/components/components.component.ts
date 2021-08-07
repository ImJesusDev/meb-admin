import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/* rxjs */
import { Observable, of, Subscription } from 'rxjs';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* Models */
import { Client, Email, ResourceComponent, ResourceType } from 'src/app/models';
/* State */
import { State } from '../state';
import { getResourceById } from '../state/resources/resources.selector';
import { LoadResources } from '../state/resources';
/* Components */
import { Column } from '@components/molecules/table/table/table.component';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit, OnDestroy {

  /* Current client Object */
  resource?: ResourceType;

  components: ResourceComponent[];

  /* Keep track of subscriptions */
  private subscriptions = new Subscription();

  /* Create modal */
  showBackDropCreateComponent: boolean;
  showCreateComponent: boolean;

  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router) {
    this.components = [];
    this.route.params.subscribe((param) => {
      if (param.resourceTypeId) {
        this.subscriptions.add(
          this.store
            .pipe(select(getResourceById(param.resourceTypeId)))
            .subscribe((resource: ResourceType | undefined) => {
              if (resource) {
                this.resource = resource;
                if (resource.components) {
                  this.components = resource.components;
                }
              }
            })
        );
      }
    });

    this.showBackDropCreateComponent = false;
    this.showCreateComponent = false;
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


  async onShowCreateComponent(): Promise<void> {
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

}
