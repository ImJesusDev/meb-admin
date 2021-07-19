import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackArrowComponent } from './back-arrow/back-arrow.component';



@NgModule({
  declarations: [
    BackArrowComponent
  ],
  exports: [BackArrowComponent],
  imports: [
    CommonModule
  ]
})
export class BackArrowModule { }
