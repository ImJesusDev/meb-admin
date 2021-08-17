import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckUpModalComponent } from './check-up-modal/check-up-modal.component';

import { ModalModule } from '@atoms/modal'



@NgModule({
  declarations: [
    CheckUpModalComponent
  ],
  entryComponents: [
    CheckUpModalComponent
  ],
  exports: [
    CheckUpModalComponent
  ],
  imports: [
    CommonModule,
    ModalModule
  ]
})
export class CheckUpModalModule { }
