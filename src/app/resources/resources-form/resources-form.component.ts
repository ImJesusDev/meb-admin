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
import { Router } from '@angular/router';
/* Actions */
import { AddResource } from '../state/resources/resources.actions';
import { StartLoader } from '../../state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';

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
  /* base64 logo */
  base64Image = '';
  /* Observable of loader from store */
  loader$: Observable<boolean> = of(false);

  constructor(private _formBuilder: FormBuilder, private store: Store<State>, private router: Router) {
    // Initialize resourceModel
    this.resourceType = {
      id: '',
      type: '',
      checkupTime: 0,
      photo: '',
      measureIndicators: false,
      resourceTypeBrand: '',
      resourceTypeModel: ''
    };
    this.resourceForm = this._formBuilder.group({
      type: [this.resourceType.type, [Validators.required]],
      checkupTime: [this.resourceType.checkupTime, [Validators.required]],
      photo: [this.resourceType.photo, [Validators.required]],
      measureIndicators: [this.resourceType.measureIndicators],
      resourceTypeBrand: [this.resourceType.resourceTypeBrand, [Validators.required],],
      resourceTypeModel: [this.resourceType.resourceTypeModel, [Validators.required],],
      kmToMaintenance: [, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Use selector to get errors from state
    this.errors$ = this.store.pipe(select(getResourcesError));
    // Use selector to get loader state
    this.loader$ = this.store.pipe(select(getLoader));
  }
  ngOnDestroy(): void { }

  submitForm(): void {
    // Dispatch action to start loader
    this.store.dispatch(new StartLoader());
    // Dispatch action to add new client
    this.store.dispatch(
      new AddResource({
        photo: this.base64Image,
        type: this.resourceForm.controls['type'].value,
        measureIndicators: this.resourceForm.controls['measureIndicators'].value,
        brand: this.resourceForm.controls['resourceTypeBrand'].value,
        model: this.resourceForm.controls['resourceTypeModel'].value,
        checkupTime: this.resourceForm.controls['checkupTime'].value,
        kmToMaintenance: this.resourceForm.controls['kmToMaintenance'].value,
        id: ''
      })
    );
  }


  /* Handle file change */
  fileChanged(event: any): void {
    // Instance of reader
    const reader = new FileReader();
    // Check if any file is selected
    if (event.target && event.target.files.length) {
      // Get file name
      const filename = event.target.files[0].name;
      // Initialize the base64 string with data type
      this.base64Image = `data:${event.target.files[0].type};base64,`;
      // Bind function to execute on file load
      reader.onload = this.convertImageFileToBase64.bind(this);
      // Read selected file
      reader.readAsBinaryString(event.target.files[0]);
      // Set as value of the form the name of the file
      this.resourceForm.patchValue({
        photo: filename,
      });
    }
  }

  /**
   * Function to convert image file to
   * base 64 string
   */
  convertImageFileToBase64(readerEvt: ProgressEvent<FileReader>): void {
    // Get binary string from FileReader
    const binaryString = readerEvt?.target?.result;
    // Convert binary to base64
    const base64String = btoa(binaryString as string);
    // Set the final base64 string
    this.base64Image = `${this.base64Image}${base64String}`;
  }

  onBack(): void {
    this.router.navigate(['recursos']);
  }
}
