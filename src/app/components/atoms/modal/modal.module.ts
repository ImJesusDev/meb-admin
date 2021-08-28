import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';



@NgModule({
  declarations: [
    ModalComponent,
    ConfirmModalComponent
  ],
  exports: [ModalComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ]
})
export class ModalModule { }
