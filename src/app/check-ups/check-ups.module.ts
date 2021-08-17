import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckUpsRoutingModule } from './check-ups-routing.module';
import { CheckUpsComponent } from './check-ups/check-ups.component';
import { CheckUpsHistoryComponent } from './check-ups-history/check-ups-history.component';
import { CheckUpsPendingComponent } from './check-ups-pending/check-ups-pending.component';


@NgModule({
  declarations: [
    CheckUpsComponent,
    CheckUpsHistoryComponent,
    CheckUpsPendingComponent
  ],
  imports: [
    CommonModule,
    CheckUpsRoutingModule
  ]
})
export class CheckUpsModule { }
