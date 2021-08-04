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
  @Input() public resourceTypeId: string;

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
    this.resourceTypeId = '';

    this.component = {
      id: '',
      name: '',
      componentBrand: '',
      componentModel: '',
      regularCondition: {
        disables: false,
        ticket: false
      },
      badCondition: {
        disables: false,
        ticket: false
      }
    };
    this.componentForm = this._formBuilder.group({
      name: [this.component.name, [Validators.required]],
      componentBrand: [this.component.componentBrand, [Validators.required]],
      componentModel: [this.component.componentModel, [Validators.required]],
      regularUnable: [this.component.regularCondition.disables],
      regularSendTicket: [this.component.regularCondition.ticket],
      badSendTicket: [this.component.badCondition.ticket],
      badUnable: [this.component.badCondition.disables],
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
          regularCondition: {
            disables: this.componentForm.controls['regularUnable'].value,
            ticket: this.componentForm.controls['regularSendTicket'].value
          },
          badCondition: {
            disables: this.componentForm.controls['badUnable'].value,
            ticket: this.componentForm.controls['badSendTicket'].value
          },
          resourceTypeId: this.resourceTypeId,
          id: ''
        })
      );
    }
    this.close.emit();
  }
}
