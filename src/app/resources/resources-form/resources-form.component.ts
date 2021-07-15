import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
/* Models */
import { ApiError, ResourceType } from 'src/app/models';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
/* Selectors */
import { getResourcesError } from '../state/resources/resources.selector';
@Component({
  selector: 'app-resources-form',
  templateUrl: './resources-form.component.html',
  styleUrls: ['./resources-form.component.css'],
})
export class ResourcesFormComponent implements OnInit, OnDestroy {
  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* New Resource Type */
  resourceType: ResourceType;
  /* Form Group */
  resourceForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private store: Store<State>) {
    // Initialize resourceModel
    this.resourceType = {
      id: '',
      type: '',
      checkupTime: 0,
      photo: '',
      measureIndicators: false,
      resourceTypeBrand: '',
      resourceTypeModel: '',
    };
    this.resourceForm = this._formBuilder.group({
      type: [this.resourceType.type, [Validators.required]],
      checkupTime: [this.resourceType.checkupTime, [Validators.required]],
      photo: [this.resourceType.photo, [Validators.required]],
      measureIndicators: [
        this.resourceType.measureIndicators,
        [Validators.required],
      ],
      resourceTypeBrand: [
        this.resourceType.resourceTypeBrand,
        [Validators.required],
      ],
      resourceTypeModel: [
        this.resourceType.resourceTypeModel,
        [Validators.required],
      ],
    });
  }

  ngOnInit(): void {
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getResourcesError));
  }
  ngOnDestroy(): void {}
}
