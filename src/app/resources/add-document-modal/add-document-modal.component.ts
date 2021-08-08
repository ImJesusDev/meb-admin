import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
/* Models */
import { ApiError, DocumentType } from 'src/app/models';
/* NgRx */
import { Store } from '@ngrx/store';
/* State */
import { State } from '../state';
/* Selectors */
import { Router } from '@angular/router';
/* Actions */
import { AddComponent, AddDocument, AddResource } from '../state/resources/resources.actions';
/* Interface */
import { ResourceComponent } from '@models/index';

@Component({
  selector: 'app-add-document-modal',
  templateUrl: './add-document-modal.component.html',
  styleUrls: ['./add-document-modal.component.css']
})
export class AddDocumentModalComponent implements OnInit {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;
  @Input() public resourceTypeId: string;

  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* New Resource Type */
  document: DocumentType;
  /* Form Group */
  documentForm: FormGroup;

  @Output() public close = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private store: Store<State>, private router: Router) {

    this.showBackDrop = false;
    this.showModal = false;
    this.resourceTypeId = '';

    this.document = {
      id: '',
      name: '',
      disables: false,
      requiresPhoto: false,
      expires: false
    };
    this.documentForm = this._formBuilder.group({
      name: [this.document.name, [Validators.required]],
      disables: [this.document.disables, [Validators.required]],
      requiresPhoto: [this.document.requiresPhoto, [Validators.required]],
      expires: [this.document.expires, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onClose(save?: boolean): void {
    if (save) {
      this.store.dispatch(
        new AddDocument({
          name: this.documentForm.controls['name'].value,
          disables: this.documentForm.controls['disables'].value,
          requiresPhoto: this.documentForm.controls['requiresPhoto'].value,
          expires: this.documentForm.controls['expires'].value,
          resourceTypeId: this.resourceTypeId,
          id: ''
        })
      );
    }
    this.close.emit();
  }
}
