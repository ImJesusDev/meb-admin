import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/* State */
// import { reducers, effects } from './state';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';
import { ComponentCommentaryModalModule } from '@molecules/component-commentary-modal/component-commentary-modal.module';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BackArrowModule } from '@components/atoms/back-arrow';
import { reducers, effects } from './state';


@NgModule({
  declarations: [
    BookingComponent,
    BookingListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BookingRoutingModule,
    ModalModule,
    BackArrowModule,
    SharedModule,
    CheckUpModalModule,
    StoreModule.forFeature('bookings', reducers),
    EffectsModule.forFeature(effects),
    ComponentCommentaryModalModule
  ]
})
export class BookingModule { }
