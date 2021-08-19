import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
/* Models */
import { ApiError, Resource, ResourceType, DocumentType, Document } from '@models/index';
/* NgRx */
import { Store, select } from '@ngrx/store';
/* State */
import { State } from '../state';
/* Selectors */
import { getResourcesError } from '../state/inventory/inventory.selector';
import { getResources } from '../../resources/state/resources/resources.selector';
/* Actions */
import { AddResource } from '../state/inventory/inventory.actions';
import { StartLoader } from '../../state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
import {
  LoadResources,
} from '../../resources/state/resources/resources.actions';
import { generateRandomNumber } from 'src/app/utils/helpers/number.helper';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {

  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* New Resource Type */
  resource: Resource;
  /* Form Group */
  resourceForm: FormGroup;
  /* base64 logo */
  base64Image = '';
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);


  /* Observable of clients from store */
  resources$: Observable<ResourceType[]> = of([] as ResourceType[]);

  documentTypes: DocumentType[] = [];

  constructor(private _formBuilder: FormBuilder, private store: Store<State>, private router: Router) {
    // Initialize resourceModel
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
      repairs: []
    };
    this.resourceForm = this._formBuilder.group({
      type: [{} as ResourceType, [Validators.required]],
      reference: [this.resource.reference, [Validators.required]],
      client: [this.resource.client, [Validators.required]],
      office: [this.resource.office, [Validators.required]],
      loanTime: [this.resource.loanTime, [Validators.required]],
      documents: this._formBuilder.array([]),
    });
    this.store.dispatch(new StartLoader());
    // Dispatch action to load resources
    this.store.dispatch(new LoadResources());
  }

  ngOnInit(): void {
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getResourcesError));
    // Use selector to get resources from state
    this.resources$ = this.store.pipe(select(getResources));
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }


  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to add new client
    const canvas = document.getElementsByTagName('canvas');
    let qrCode = '';
    if (canvas.length > 0) {
      qrCode = canvas[0].toDataURL('image/jpeg').split(';base64,')[1];
    }
    this.store.dispatch(
      new AddResource({
        type: this.resourceForm.controls['type'].value.type,
        client: this.resourceForm.controls['client'].value,
        loanTime: this.resourceForm.controls['loanTime'].value,
        lockerPassword: generateRandomNumber({ length: 6 }),
        office: this.resourceForm.controls['office'].value,
        qrCode,
        reference: this.resourceForm.controls['reference'].value,
        documents: this.resourceForm.controls['documents'].value.map((value: Document) => {
          return {
            type: value.type,
            resourceReference: this.resourceForm.controls['reference'].value,
            documentNumber: value.documentNumber,
            expeditionDate: new Date(value.expeditionDate),
            expirationDate: value.expirationDate ? new Date(value.expirationDate) : '',
          }
        }),
        id: '',
        checkups: [],
        maintenances: [],
        repairs: []
      })
    );
  }



  onBack(): void {
    this.router.navigate(['inventario']);
  }



  /* Documents */

  get documentsForm(): FormArray {
    return this.resourceForm.controls["documents"] as FormArray;
  }

  changeType(): void {
    // const canvas = document.getElementsByTagName('canvas');
    // console.log(canvas[0].toDataURL('image/jpeg').split(';base64,')[1])
    // const base64Canvas = canvas.toDataURL("image/jpeg").split(';base64,')[1];
    this.documentTypes = this.resourceForm.get('type')?.value.documentTypes;
    this.documentsForm.clear();
    this.resourceForm.get('type')?.value.documentTypes.forEach((document: DocumentType) => {
      this.documentsForm.push(new FormGroup({
        type: new FormControl(document.name),
        documentNumber: new FormControl(''),
        expeditionDate: new FormControl(''),
        expirationDate: new FormControl({ value: '', disabled: !document.expires }),
      }));
    });
  }

}
