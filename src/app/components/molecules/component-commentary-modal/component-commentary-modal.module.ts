import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentCommentaryModalComponent } from './component-commentary-modal/component-commentary-modal.component';


import { ModalModule } from '@atoms/modal'

@NgModule({
  declarations: [
    ComponentCommentaryModalComponent
  ],
  exports: [ComponentCommentaryModalComponent],
  imports: [
    CommonModule,
    ModalModule
  ]
})
export class ComponentCommentaryModalModule { }
