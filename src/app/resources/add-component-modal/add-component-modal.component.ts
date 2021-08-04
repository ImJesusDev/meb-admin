import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { AddComponent, AddResource } from '../state/resources/resources.actions';
import { StartLoader } from '../../state/loader/loader.actions';
import { getLoader } from '@state/loader/loader.selector';
/* Interface */
import { ResourceComponent } from '@models/index'

@Component({
  selector: 'app-add-component-modal',
  templateUrl: './add-component-modal.component.html',
  styleUrls: ['./add-component-modal.component.css']
})
export class AddComponentModalComponent implements OnInit {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;

  /* Observable of errors from store */
  errors$: Observable<ApiError[]> = of([] as ApiError[]);
  /* New Resource Type */
  component: ResourceComponent;
  /* Form Group */
  componentForm: FormGroup;

  @Output() public close = new EventEmitter();

  constructor(private _formBuilder: FormBuilder, private store: Store<State>, private router: Router) {

    this.showBackDrop = false;
    this.showModal = false;

    this.component = {
      id: '',
      name: '',
      componentBrand: '',
      componentModel: '',
      area: '',
      regularSendTicket: false,
      regularUnable: false,
      badSendTicket: false,
      badUnable: false
    };
    this.componentForm = this._formBuilder.group({
      name: [this.component.name, [Validators.required]],
      componentBrand: [this.component.componentBrand, [Validators.required]],
      componentModel: [this.component.componentModel, [Validators.required]],
      area: [this.component.area, [Validators.required]],
      regularUnable: [this.component.regularUnable],
      regularSendTicket: [this.component.regularSendTicket],
      badSendTicket: [this.component.badSendTicket],
      badUnable: [this.component.badUnable],
    });
  }

  ngOnInit(): void {
  }

  onClose(save?: boolean): void {
    if (save) {
      this.store.dispatch(
        new AddComponent({
          name: this.componentForm.controls['name'].value,
          componentBrand: this.componentForm.controls['componentBrand'].value,
          componentModel: this.componentForm.controls['componentModel'].value,
          area: this.componentForm.controls['area'].value,
          regularUnable: this.componentForm.controls['regularUnable'].value,
          regularSendTicket: this.componentForm.controls['regularSendTicket'].value,
          badUnable: this.componentForm.controls['badUnable'].value,
          badSendTicket: this.componentForm.controls['badSendTicket'].value,
          id: ''
        })
      );
    }
    this.close.emit();
  }
}
