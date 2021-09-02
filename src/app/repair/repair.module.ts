import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
/* State */
import { reducers, effects } from './state';

/* Components */
import { ModalModule } from '@atoms/modal';
import { SharedModule } from '@shared/shared.module';
import { CheckUpModalModule } from '@molecules/check-up-modal/check-up-modal.module';
import { ComponentCommentaryModalModule } from '@molecules/component-commentary-modal/component-commentary-modal.module';

import { RepairRoutingModule } from './repair-routing.module';
import { RepairComponent } from './repair/repair.component';
import { RepairHistoryComponent } from './repair-history/repair-history.component';
import { RepairPendingComponent } from './repair-pending/repair-pending.component';


@NgModule({
  declarations: [
    RepairComponent,
    RepairHistoryComponent,
    RepairPendingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepairRoutingModule,
    ModalModule,
    SharedModule,
    CheckUpModalModule,
    StoreModule.forFeature('repair', reducers),
    EffectsModule.forFeature(effects),
    ComponentCommentaryModalModule
  ]
})
export class RepairModule { }
