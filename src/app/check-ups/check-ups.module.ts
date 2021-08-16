import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckUpsRoutingModule } from './check-ups-routing.module';
import { CheckUpsComponent } from './check-ups/check-ups.component';


@NgModule({
  declarations: [
    CheckUpsComponent
  ],
  imports: [
    CommonModule,
    CheckUpsRoutingModule
  ]
})
export class CheckUpsModule { }
