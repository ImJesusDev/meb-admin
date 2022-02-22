import { UpdateCheckup } from './../../inventory/state/inventory/inventory.actions';
import { Store } from '@ngrx/store';
import { State } from './../../state/users/user.reducer';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/* Models */
import { COMPONENT_STATUS } from './../../models/chekoups';
import { Checkup } from '@models/chekoups';

@Component({
  selector: 'app-update-check-up-modal',
  templateUrl: './check-up-modal.component.html',
  styleUrls: ['./check-up-modal.component.css']
})
export class CheckUpModalComponent implements OnInit {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;
  @Input() public checkup: Checkup;
  @Output() public close = new EventEmitter();

  componentStatus = COMPONENT_STATUS;

  checkUpForm = new FormArray([]);
  valCheck = false;

  constructor(private store: Store<State>) {
    this.showBackDrop = false;
    this.showModal = false;
    this.showModal = false;
    this.checkup = {
      components: [],
      createdAt: '',
      id: '',
      resourceRef: '',
      status: ''
    };
  }

  ngOnInit(): void {
    this.checkup.components.forEach(c => {
      this.checkUpForm.push(
        new FormGroup({
          componentId: new FormControl(c.componentId),
          componentName: new FormControl(c.componentName),
          status: new FormControl(),
          photo: new FormControl()
        })
      );
    });
  }

  onClose(save?: boolean): void {
    if (save) {
      const data = new Array();
      this.checkUpForm.controls.map(v => {
        data.push({
          componentId: v.get('componentId')?.value,
          componentName: v.get('componentName')?.value,
          status: v.get('status')?.value,
          photo: v.get('photo')?.value,
        });
      });
      let validacion = 0;
      let con = 0;
      data.forEach(function (value) {
        console.log(value);
        if(value.status){
          validacion = validacion + 1;
        }
        con = con + 1;
      });
      if(validacion == con){
        this.close.emit({
          checkupId: this.checkup.id,
          components: data
        }); 
      }else{
        this.valCheck = true;
      }
    } else {
      this.close.emit();
    }
  }


  openCamera(id: string): void {
    document.getElementById(id)?.click();
  }

  onFileSelected(event: any, index: number): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.checkUpForm.controls[index]?.get('photo')?.setValue(reader.result);
      reader.readAsDataURL(file);
    }
  }

}
