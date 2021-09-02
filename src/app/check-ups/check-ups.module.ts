import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';

import { CheckUpsRoutingModule } from './check-ups-routing.module';
import { CheckUpsComponent } from './check-ups/check-ups.component';
import { CheckUpsHistoryComponent } from './check-ups-history/check-ups-history.component';
import { CheckUpsPendingComponent } from './check-ups-pending/check-ups-pending.component';
import { CheckUpModalComponent } from './check-up-modal/check-up-modal.component';


@NgModule({
  declarations: [
    CheckUpsComponent,
    CheckUpsHistoryComponent,
    CheckUpsPendingComponent,
    CheckUpModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckUpsRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule
  ]
})
export class CheckUpsModule { }
