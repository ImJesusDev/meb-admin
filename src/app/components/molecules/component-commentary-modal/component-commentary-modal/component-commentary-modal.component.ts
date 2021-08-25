import { Store } from '@ngrx/store';
import { State } from '@state/users/user.reducer';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

/* Models */
import { Checkup, COMPONENT_STATUS } from '@models/chekoups';

@Component({
  selector: 'app-component-commentary-modal',
  templateUrl: './component-commentary-modal.component.html',
  styleUrls: ['./component-commentary-modal.component.css']
})
export class ComponentCommentaryModalComponent implements OnInit {

  @Input() public showBackDrop: boolean;
  @Input() public showModal: boolean;
  @Input() public header: string;
  @Input() public checkup: Checkup;
  @Output() public close = new EventEmitter();

  componentStatus = COMPONENT_STATUS;

  checkUpForm = new FormArray([]);

  constructor(private store: Store<State>) {
    this.showBackDrop = false;
    this.showModal = false;
    this.header = 'Finalizar';
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
          status: new FormControl(c.status),
          comment: new FormControl()
        })
      );
    });
  }

  onClose(save?: boolean): void {
    if (save) {
      const data = new Array();
      this.checkUpForm.controls.map(v =>
        data.push({
          componentId: v.get('componentId')?.value,
          componentName: v.get('componentName')?.value,
          status: v.get('status')?.value,
          comment: v.get('comment')?.value,
        })
      );
      console.log(data);
      this.close.emit({
        checkupId: this.checkup.id,
        components: data
      });
    } else {
      this.close.emit();
    }
  }

  changeCommentary($event: Event, index: number): void {
    this.checkUpForm.controls[index]?.get('comment')?.setValue(($event.target as HTMLInputElement).value);
  }

}
